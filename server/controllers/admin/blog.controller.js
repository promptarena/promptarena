const blogModel = require('../../models/blog.model');
const {
  uploadImage,
  uploadVideo,
  deleteMedia,
} = require('../../services/mediaService');
const {
  handleError,
  sendSuccessResponse,
} = require('../../utils/responseUtils');

module.exports = {
  // Create a new blog post
  createBlogPost: async (req, res, next) => {
    const { title, content } = req.body;
    const media = { images: [], videos: [] };

    console.log('Request Body:', req.body);
    console.log('Request Files:', req.files);
    console.log('title and content', title, content);

    if (!title || !content) {
      return handleError(next, 'Title and content are required', 400);
    }

    try {
      // Handle image uploads if any
      if (req.files && req.files.images) {
        const imageUploadPromises = req.files.images.map(
          (file) => uploadImage(file.buffer) // Use buffer directly to upload via stream
        );
        const uploadedImages = await Promise.all(imageUploadPromises);
        media.images = uploadedImages.map((image) => image.secure_url);
      }

      // Handle video uploads if any
      if (req.files && req.files.videos) {
        const videoUploadPromises = req.files.videos.map(
          (file) => uploadVideo(file.buffer) // Use buffer directly to upload via stream
        );
        const uploadedVideos = await Promise.all(videoUploadPromises);
        media.videos = uploadedVideos.map((video) => video.secure_url);
      }

      // Create a new blog post
      const newBlogPost = await blogModel.create({
        title,
        content,
        media,
        author: req.userID, // Admin as author
      });

      console.log('New Blog Post:', newBlogPost);

      return sendSuccessResponse(
        res,
        'Blog post created successfully',
        newBlogPost,
        201
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error in Blog Post Creation',
        500
      );
    }
  },

  // Update an existing blog post
  updateBlogPost: async (req, res, next) => {
    const { title, content } = req.body;
    const media = { images: [], videos: [] };

    try {
      const blogPost = await blogModel.findById(req.params.blogId);
      if (!blogPost) {
        return handleError(next, 'Blog post not found', 404);
      }

      // Handle image uploads if any
      if (req.files && req.files.images) {
        const imageUploadPromises = req.files.images.map((file) =>
          uploadImage(file.buffer)
        );
        const uploadedImages = await Promise.all(imageUploadPromises);
        media.images = uploadedImages.map((image) => image.secure_url);
      }

      // Handle video uploads if any
      if (req.files && req.files.videos) {
        const videoUploadPromises = req.files.videos.map((file) =>
          uploadVideo(file.buffer)
        );
        const uploadedVideos = await Promise.all(videoUploadPromises);
        media.videos = uploadedVideos.map((video) => video.secure_url);
      }

      // Update blog post details
      blogPost.title = title || blogPost.title;
      blogPost.content = content || blogPost.content;
      blogPost.media =
        media.images.length > 0 || media.videos.length > 0
          ? media
          : blogPost.media;

      await blogPost.save();
      return sendSuccessResponse(
        res,
        'Blog post updated successfully',
        blogPost
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error in Blog Post Update',
        500
      );
    }
  },

  // Get all blog posts (for admin dashboard)
  getAllBlogPosts: async (req, res, next) => {
    try {
      const blogPosts = await blogModel
        .find({})
        .populate('author', 'username email');
      return sendSuccessResponse(
        res,
        'All blog posts fetched successfully',
        blogPosts
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error in Fetching Blog Posts',
        500
      );
    }
  },

  // Get a single blog post
  getBlogPost: async (req, res, next) => {
    console.log('req.params.blogId', req.params.blogId);

    try {
      const blogPost = await blogModel
        .findById(req.params.blogId)
        .populate('author', 'username email name profileImage following followers bio');
      if (!blogPost) {
        return handleError(next, 'Blog post not found', 404);
      }
      return sendSuccessResponse(
        res,
        'Blog post fetched successfully',
        blogPost
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error in Fetching Blog Post',
        500
      );
    }
  },

  // Delete a blog post
  deleteBlogPost: async (req, res, next) => {
    try {
      const blogPost = await blogModel.findById(req.params.blogId);

      if (!blogPost) {
        return handleError(next, 'Blog post not found', 404);
      }

      // Delete associated images from Cloudinary
      if (blogPost.media.images && blogPost.media.images.length > 0) {
        const deleteImagePromises = blogPost.media.images.map((imageUrl) => {
          const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract publicId from URL
          return deleteMedia(publicId, 'image');
        });
        await Promise.all(deleteImagePromises);
      }

      // Delete associated videos from Cloudinary
      if (blogPost.media.videos && blogPost.media.videos.length > 0) {
        const deleteVideoPromises = blogPost.media.videos.map((videoUrl) => {
          const publicId = videoUrl.split('/').pop().split('.')[0]; // Extract publicId from URL
          return deleteMedia(publicId, 'video');
        });
        await Promise.all(deleteVideoPromises);
      }

      // Finally, delete the blog post from the database
      await blogModel.findByIdAndDelete(req.params.blogId);

      return sendSuccessResponse(
        res,
        'Blog post and associated media deleted successfully',
        {}
      );
    } catch (error) {
      return handleError(
        next,
        error.message || 'Server Error in Blog Post Deletion',
        500
      );
    }
  },
};
