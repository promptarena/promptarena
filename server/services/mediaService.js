const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Function to handle image uploads
const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "blog/prompt_images" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Function to handle video uploads
const uploadVideo = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "blog/prompt_videos", resource_type: "video" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Function to handle PDF uploads
const uploadPDF = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "prompt/prompt_pdfs", resource_type: "raw" },  // PDF is treated as raw
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Function to delete media (images, videos, PDFs)
const deleteMedia = (publicId, resourceType = "image") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};

module.exports = {
  uploadImage,
  uploadVideo,
  uploadPDF,  // Added for PDF uploads
  deleteMedia,
};