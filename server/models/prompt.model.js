const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Prompt title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Prompt description is required'],
  },
  promptType: {
    type: String,
    required: [true, 'Prompt type is required'],
    enum: ['text', 'code', 'image', 'video', 'pdf', 'audio'],
    default: 'text',
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  media: {
    images: {
      type: [String],
      default: [
        'https://assets.promptbase.com/DALLE_IMAGES%2FT84jz89oG2fA4pZOzO3mYL7F52x2%2Fresized%2F1672990331989_800x800.webp?alt=media&token=8f4e2684-f705-4f70-b7fb-c5e3e6d47c5c',
        'https://assets.promptbase.com/DALLE_IMAGES%2FT84jz89oG2fA4pZOzO3mYL7F52x2%2Fresized%2F1672990307188_800x800.webp?alt=media&token=b13f8f34-5837-4d4b-805f-c96dc1ba3315',
        'https://assets.promptbase.com/DALLE_IMAGES%2FT84jz89oG2fA4pZOzO3mYL7F52x2%2Fresized%2F1672990350964_800x800.webp?alt=media&token=813ef869-9c72-4dd8-8c56-80ea16639576',
        'https://assets.promptbase.com/DALLE_IMAGES%2FT84jz89oG2fA4pZOzO3mYL7F52x2%2Fresized%2F1672990351016_800x800.webp?alt=media&token=34b4c273-3c2f-4a83-b91f-d9c62438f0ce',
      ],
    }, // Array of image URLs
    videos: [String], // Array of video URLs
    pdfs: [String], // Array of PDF URLs
  },
  model: {
    type: String, // Model associated with the prompt (e.g., GPT-3)
    default: 'GPT-3',
  },
  prompt: {
    type: String,
    required: true,
  },
  exampleResponse: {
    type: String, // Example response for the prompt (optional)
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  // Popularity fields
  popularity: {
    views: {
      type: Number,
      default: 0, // Track the number of views
    },
    sales: {
      type: Number,
      default: 0, // Track the number of sales
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true, // Whether the prompt is active (soft delete)
  },
});

module.exports = mongoose.model('Prompt', promptSchema);
