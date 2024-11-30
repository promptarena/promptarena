// const express = require('express');
// const router = express.Router();
// const promptController = require('../controllers/common/prompt.controller');
// const authMiddleware = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/multerMiddleware');

// // Base route: /api/prompts (You can adjust the base path if needed)

// // Route to check if the prompt routes are working
// router.get('/', (req, res) => {
//   res.send('Prompt Routes Are Working!'); // Simple response for testing
// });

// // Create a new prompt
// router.post(
//   '/create',
//   authMiddleware,
//   upload.fields([
//     { name: 'images', maxCount: 5 },
//     { name: 'videos', maxCount: 2 },
//     { name: 'pdfs', maxCount: 2 },
//   ]),
//   promptController.createPrompt
// );

// // Update an existing prompt
// router.put(
//   '/update/:promptId',
//   authMiddleware, // Assuming you have authentication middleware
//   upload.fields([
//     { name: 'images', maxCount: 5 },
//     { name: 'videos', maxCount: 2 },
//     { name: 'pdfs', maxCount: 2 },
//   ]),
//   promptController.updatePrompt
// );

// // Delete a prompt
// router.delete(
//   '/delete/:promptId',
//   authMiddleware,
//   promptController.deletePrompt
// );

// // Get all prompts
// router.get('/all', promptController.getAllPrompts);

// // Get distinct categories
// router.get('/categories', promptController.getCategories);
// // Get a single prompt by ID
// router.get('/:promptId', promptController.getPromptById);


// module.exports = router;

const express = require('express');
const router = express.Router();
const promptController = require('../controllers/common/prompt.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerMiddleware');

// Base route: /api/prompts (You can adjust the base path if needed)

// Route to check if the prompt routes are working
router.get('/', (req, res) => {
  res.send('Prompt Routes Are Working!'); // Simple response for testing
});

// Create a new prompt
router.post(
  '/create',
  authMiddleware,
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 2 },
    { name: 'pdfs', maxCount: 2 },
  ]),
  promptController.createPrompt
);

// Update an existing prompt
router.put(
  '/update/:promptId',
  authMiddleware,
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 2 },
    { name: 'pdfs', maxCount: 2 },
  ]),
  promptController.updatePrompt
);

// Delete a prompt
router.delete(
  '/delete/:promptId',
  authMiddleware,
  promptController.deletePrompt
);

// Get all prompts with optional filtering, sorting, and search
router.get('/all', promptController.getAllPrompts);

// Get featured prompts
router.get('/featured', promptController.getFeaturedPrompts);

// Get popular prompts
router.get('/popular', promptController.getPopularPrompts);

// Get newest prompts
router.get('/newest', promptController.getNewestPrompts);

// Get distinct categories
router.get('/categories', promptController.getCategories);

// Get distinct tags
router.get('/tags', promptController.getTags);

// Get a single prompt by ID and increment views
router.get('/:promptId', promptController.getPromptById);

module.exports = router;
