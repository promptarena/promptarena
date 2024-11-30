const notificationModel = require('../../models/notification.model');
const Prompt = require('../../models/prompt.model'); // Assuming your model is here
const userModel = require('../../models/user.model');
const {
  uploadImage,
  uploadVideo,
  deleteMedia,
  uploadPDF,
} = require('../../services/mediaService');
const {
  handleError,
  sendSuccessResponse,
} = require('../../utils/responseUtils');

module.exports = {
  // Create a new prompt
  createPrompt: async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        promptType,
        prompt,
        category,
        tags,
        model,
        exampleResponse,
      } = req.body;

      console.log('Request Body:', req.body); // Log the request body
      console.log('Request Files:', req.files); // Log the received files

      // Input Validation: Check if required fields are provided
      if (
        !title ||
        !description ||
        !price ||
        !promptType ||
        !prompt ||
        !category ||
        !tags
      ) {
        return handleError(res, 'All fields are required', 400);
      }

      const media = { images: [], videos: [], pdfs: [] };
      console.log('media: ', media);

      // Handle Media Uploads (Image, Video, PDF)
      if (req.files) {
        if (req.files.images) {
          console.log('req.files.images: ', req.files.images);
          const imageUploadPromises = req.files.images.map((file) =>
            uploadImage(file.buffer)
          );
          const uploadedImages = await Promise.all(imageUploadPromises);
          media.images = uploadedImages.map((image) => image.secure_url);
        }

        if (req.files.videos) {
          const videoUploadPromises = req.files.videos.map((file) =>
            uploadVideo(file.buffer)
          );
          const uploadedVideos = await Promise.all(videoUploadPromises);
          media.videos = uploadedVideos.map((video) => video.secure_url);
        }

        if (req.files.pdfs) {
          const pdfUploadPromises = req.files.pdfs.map((file) =>
            uploadPDF(file.buffer)
          );
          const uploadedPDFs = await Promise.all(pdfUploadPromises);
          media.pdfs = uploadedPDFs.map((pdf) => pdf.secure_url);
        }
      }

      const newPrompt = await Prompt.create({
        title,
        description,
        price,
        promptType,
        prompt,
        category,
        tags: tags.split(',').map((tag) => tag.trim()),
        model,
        exampleResponse: exampleResponse || 'Example response not provided',
        seller: req.userID, // Assuming you have middleware to set req.userID
        media,
        popularity: { views: 0, sales: 0 },
        updatedAt: new Date(),
      });

      console.log('New Prompt:', newPrompt);

      const seller = await userModel.findById(req.userID); // Get the seller
      const followers = seller.followers; // Get the seller's followers

      for (const followerId of followers) {
        await notificationModel.create({
          user: followerId,
          message: `${seller.username} posted a new prompt: "${newPrompt.title}"`,
          read: false,
        });
      }

      return sendSuccessResponse(
        res,
        'Prompt created successfully',
        newPrompt,
        201
      );
    } catch (error) {
      console.error('Error in createPrompt:', error);
      return handleError(res, 'Server Error in Prompt Creation', 500);
    }
  },

  // Update an existing prompt
  updatePrompt: async (req, res) => {
    try {
      const promptId = req.params.promptId;
      const promptRecord = await Prompt.findById(promptId);

      if (!promptRecord) {
        return handleError(res, 'Prompt not found', 404);
      }

      // Check if the current user is the seller
      if (String(promptRecord.seller) !== String(req.userID)) {
        return handleError(res, 'Unauthorized', 403);
      }

      const {
        title,
        description,
        price,
        promptType,
        prompt,
        category,
        tags,
        model,
        exampleResponse,
      } = req.body;

      const media = {
        images: promptRecord.media.images, // Keep existing if no new uploads
        videos: promptRecord.media.videos,
        pdfs: promptRecord.media.pdfs,
      };

      // Handle Media Uploads (similar to createPrompt)
      if (req.files) {
        if (req.files.images) {
          const imageUploadPromises = req.files.images.map((file) =>
            uploadImage(file.buffer)
          );
          const uploadedImages = await Promise.all(imageUploadPromises);
          media.images = uploadedImages.map((image) => image.secure_url);
        }

        if (req.files.videos) {
          const videoUploadPromises = req.files.videos.map((file) =>
            uploadVideo(file.buffer)
          );
          const uploadedVideos = await Promise.all(videoUploadPromises);
          media.videos = uploadedVideos.map((video) => video.secure_url);
        }

        if (req.files.pdfs) {
          const pdfUploadPromises = req.files.pdfs.map((file) =>
            uploadPDF(file.buffer)
          );
          const uploadedPDFs = await Promise.all(pdfUploadPromises);
          media.pdfs = uploadedPDFs.map((pdf) => pdf.secure_url);
        }
      }

      // Update prompt fields (only if provided in the request body)
      promptRecord.title = title !== undefined ? title : promptRecord.title;
      promptRecord.description =
        description !== undefined ? description : promptRecord.description;
      promptRecord.price = price !== undefined ? price : promptRecord.price;
      promptRecord.promptType =
        promptType !== undefined ? promptType : promptRecord.promptType;
      promptRecord.prompt = prompt !== undefined ? prompt : promptRecord.prompt;
      promptRecord.category =
        category !== undefined ? category : promptRecord.category;
      promptRecord.tags =
        tags !== undefined
          ? tags.split(',').map((tag) => tag.trim())
          : promptRecord.tags;
      promptRecord.model = model !== undefined ? model : promptRecord.model;
      promptRecord.exampleResponse =
        exampleResponse !== undefined
          ? exampleResponse
          : promptRecord.exampleResponse;
      promptRecord.media = media; // Update media
      promptRecord.updatedAt = new Date();

      await promptRecord.save();
      return sendSuccessResponse(
        res,
        'Prompt updated successfully',
        promptRecord
      );
    } catch (error) {
      console.error('Error in updatePrompt:', error);
      return handleError(res, 'Server Error in Prompt Update', 500);
    }
  },
  // Delete a prompt
  deletePrompt: async (req, res) => {
    try {
      const promptId = req.params.promptId;
      const prompt = await Prompt.findById(promptId);

      if (!prompt) {
        return handleError(res, 'Prompt not found', 404);
      }

      // Check if the current user is the seller
      if (String(prompt.seller) !== String(req.userID)) {
        return handleError(res, 'Unauthorized', 403);
      }

      // Delete media files from Cloudinary (if applicable)
      // Handle errors from deleteMedia and log them
      const deleteMediaPromises = [];
      if (prompt.media.images.length > 0) {
        prompt.media.images.forEach((imageUrl) => {
          const publicId = imageUrl.split('/').pop().split('.')[0];
          deleteMediaPromises.push(
            deleteMedia(publicId, 'image').catch((error) => {
              console.error(`Error deleting image ${publicId}:`, error);
              // You might want to add more robust error handling here,
              // e.g., store failed deletions in a log or database for retrying later
            })
          );
        });
      }

      if (prompt.media.videos.length > 0) {
        prompt.media.videos.forEach((videoUrl) => {
          const publicId = videoUrl.split('/').pop().split('.')[0];
          deleteMediaPromises.push(
            deleteMedia(publicId, 'video').catch((error) => {
              console.error(`Error deleting video ${publicId}:`, error);
            })
          );
        });
      }

      if (prompt.media.pdfs.length > 0) {
        prompt.media.pdfs.forEach((pdfUrl) => {
          const publicId = pdfUrl.split('/').pop().split('.')[0];
          deleteMediaPromises.push(
            deleteMedia(publicId, 'pdf').catch((error) => {
              console.error(`Error deleting PDF ${publicId}:`, error);
            })
          );
        });
      }

      await Promise.all(deleteMediaPromises); // Wait for all deleteMedia calls

      // Delete the prompt from the database
      await Prompt.findByIdAndDelete(promptId);
      return sendSuccessResponse(
        res,
        'Prompt and associated media deleted successfully',
        {}
      );
    } catch (error) {
      console.error('Error in deletePrompt:', error.message);
      return handleError(res, 'Server Error in Prompt Deletion', 500);
    }
  },

  // UNCOMMAND WHEN NEED PAGINATON AND LIMIT LOGICS
  // getAllPrompts: async (req, res) => {
  //     try {
  //         const {
  //             seller,
  //             minPrice,
  //             maxPrice,
  //             tags,
  //             category,
  //             popularity = 'views', // Default to sorting by views
  //             features,
  //             model,
  //             updatedAfter,
  //             updatedBefore,
  //             search,
  //         } = req.query;

  //         const query = { isActive: true };

  //         // Filtering
  //         if (seller) {
  //             query.seller = seller;
  //         }
  //         if (minPrice) {
  //             query.price = { ...query.price, $gte: Number(minPrice) };
  //         }
  //         if (maxPrice) {
  //             query.price = { ...query.price, $lte: Number(maxPrice) };
  //         }
  //         if (category) {
  //             query.category = category;
  //         }
  //         if (tags && tags.length > 0) {
  //             query.tags = { $in: tags }; // Use $in to match any of the tags
  //         }
  //         if (model) {
  //             query.model = model;
  //         }
  //         if (updatedAfter) {
  //             query.updatedAt = { ...query.updatedAt, $gte: new Date(updatedAfter) };
  //         }
  //         if (updatedBefore) {
  //             query.updatedAt = { ...query.updatedAt, $lte: new Date(updatedBefore) };
  //         }

  //         // Features Filtering
  //         if (features) {
  //             const featureFilters = features.split(',').reduce((acc, feature) => {
  //                 if (feature === 'exampleResponse') acc.exampleResponse = { $exists: true };
  //                 if (feature === 'model') acc.model = { $exists: true };
  //                 return acc;
  //             }, {});
  //             Object.assign(query, featureFilters);
  //         }

  //         // Search
  //         if (search) {
  //             const regex = new RegExp(search, 'i'); // 'i' flag for case-insensitive
  //             query.$or = [
  //                 { title: { $regex: regex } },
  //                 { description: { $regex: regex } },
  //             ];
  //         }

  //         // Sorting
  //         const sortOptions = {};
  //         if (popularity === 'views') {
  //             sortOptions['popularity.views'] = -1;
  //         } else if (popularity === 'sales') {
  //             sortOptions['popularity.sales'] = -1;
  //         }

  //         // Fetching prompts without pagination
  //         const prompts = await Prompt.find(query)
  //             .sort(sortOptions)
  //             .populate('seller', 'name email')
  //             .populate({
  //                 path: 'reviews',
  //                 populate: { path: 'user', select: 'username' },
  //             });

  //         return sendSuccessResponse(res, 'Prompts fetched successfully', {
  //             prompts,
  //             totalCount: prompts.length, // You can return the total count as the length of the fetched prompts
  //         });
  //     } catch (error) {
  //         console.error('Error in getAllPrompts:', error);
  //         return handleError(res, 'Server Error in Fetching Prompts', 500);
  //     }
  // },

  // Fetch all prompts with filtering
  // Assuming this is inside your controller file

  getAllPrompts: async (req, res) => {
    try {
      const {
        seller,
        minPrice,
        maxPrice,
        tags,
        category,
        popularity = 'views', // Default to sorting by views
        features,
        model,
        updatedAfter,
        updatedBefore,
        search,
      } = req.query;

      const query = { isActive: true };

      // Filtering
      if (seller) {
        query.seller = seller;
      }
      if (minPrice) {
        query.price = { ...query.price, $gte: Number(minPrice) };
      }
      if (maxPrice) {
        query.price = { ...query.price, $lte: Number(maxPrice) };
      }
      if (category) {
        query.category = category;
      }

      // Handling tags
      if (tags) {
        if (Array.isArray(tags)) {
          // Assuming tags are passed as objects with label and value
          query.tags = { $in: tags.map((tag) => tag.value) };
        } else if (typeof tags === 'string') {
          // Handle comma-separated tags
          query.tags = { $in: tags.split(',') };
        }
      }

      if (model) {
        query.model = model;
      }
      if (updatedAfter) {
        query.updatedAt = { ...query.updatedAt, $gte: new Date(updatedAfter) };
      }
      if (updatedBefore) {
        query.updatedAt = { ...query.updatedAt, $lte: new Date(updatedBefore) };
      }

      // Features Filtering
      if (features) {
        const featureFilters = features.split(',').reduce((acc, feature) => {
          if (feature === 'exampleResponse')
            acc.exampleResponse = { $exists: true };
          if (feature === 'model') acc.model = { $exists: true };
          return acc;
        }, {});
        Object.assign(query, featureFilters);
      }

      // Search
      if (search) {
        const regex = new RegExp(search, 'i'); // 'i' flag for case-insensitive
        query.$or = [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
        ];
      }

      // Sorting
      const sortOptions = {};
      if (popularity === 'views') {
        sortOptions['popularity.views'] = -1;
      } else if (popularity === 'sales') {
        sortOptions['popularity.sales'] = -1;
      }

      // Fetching prompts without pagination
      const prompts = await Prompt.find(query)
        .sort(sortOptions)
        .populate('seller', 'name email username')
        .populate({
          path: 'reviews',
          populate: { path: 'user', select: 'username' },
        });

      return sendSuccessResponse(res, 'Prompts fetched successfully', {
        prompts,
        totalCount: prompts.length, // You can return the total count as the length of the fetched prompts
      });
    } catch (error) {
      console.error('Error in getAllPrompts:', error);
      return handleError(res, 'Server Error in Fetching Prompts', 500);
    }
  },

  getFeaturedPrompts: async (req, res) => {
    try {
      const featuredPrompts = await Prompt.find({ isActive: true })
        .sort({ 'popularity.views': -1, updatedAt: -1 }) // Sort by views, then by update date
        .limit(10)
        .populate('seller', 'name email username')
        .populate({
          path: 'reviews',
          populate: { path: 'user', select: 'username' },
        });

      return sendSuccessResponse(
        res,
        'Featured prompts fetched successfully',
        featuredPrompts
      );
    } catch (error) {
      console.error('Error in getFeaturedPrompts:', error);
      return handleError(res, 'Server Error in Fetching Featured Prompts', 500);
    }
  },

  // Popular Prompts: sorted by sales count
  getPopularPrompts: async (req, res) => {
    try {
      const popularPrompts = await Prompt.find({ isActive: true })
        .sort({ 'popularity.sales': -1 }) // Sort by highest sales
        .limit(10)
        .populate('seller', 'name email username')
        .populate({
          path: 'reviews',
          populate: { path: 'user', select: 'username' },
        });

      return sendSuccessResponse(
        res,
        'Popular prompts fetched successfully',
        popularPrompts
      );
    } catch (error) {
      console.error('Error in getPopularPrompts:', error);
      return handleError(res, 'Server Error in Fetching Popular Prompts', 500);
    }
  },

  // Newest Prompts: sorted by creation date
  getNewestPrompts: async (req, res) => {
    try {
      const newestPrompts = await Prompt.find({ isActive: true })
        .sort({ createdAt: -1 }) // Sort by newest creation date
        .limit(10)
        .populate('seller', 'name email username')
        .populate({
          path: 'reviews',
          populate: { path: 'user', select: 'username' },
        });

      return sendSuccessResponse(
        res,
        'Newest prompts fetched successfully',
        newestPrompts
      );
    } catch (error) {
      console.error('Error in getNewestPrompts:', error);
      return handleError(res, 'Server Error in Fetching Newest Prompts', 500);
    }
  },

  // Get distinct tags
  getTags: async (req, res) => {
    try {
      const tags = await Prompt.distinct('tags');
      return sendSuccessResponse(res, 'Tags fetched successfully', tags);
    } catch (error) {
      console.error('Error in getTags:', error);
      return handleError(res, 'Failed to fetch tags', 500);
    }
  },

  // Get distinct categories
  getCategories: async (req, res) => {
    try {
      const categories = await Prompt.distinct('category');
      return sendSuccessResponse(
        res,
        'Categories fetched successfully',
        categories
      );
    } catch (error) {
      console.error('Error in getCategories:', error);
      return handleError(res, 'Failed to fetch categories', 500);
    }
  },

  // Get a single prompt by ID and increment views
  getPromptById: async (req, res) => {
    try {
      const promptId = req.params.promptId;
      console.log('promptId: ', promptId);
      const prompt = await Prompt.findById(promptId)
        .populate('seller', 'name email username')
        .populate({
          path: 'reviews',
          populate: { path: 'user', select: 'username' },
        });

      if (!prompt) {
        return handleError(res, 'Prompt not found', 404);
      }

      // Increment views count (if you need this feature)
      prompt.popularity.views += 1;
      await prompt.save();

      return sendSuccessResponse(res, 'Prompt fetched successfully', prompt);
    } catch (error) {
      console.error('Error in getPromptById:', error);
      return handleError(res, 'Server Error in Fetching Prompt', 500);
    }
  },
};
