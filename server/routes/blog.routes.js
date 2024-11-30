const express = require('express');
const router = express.Router();
const {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
  getBlogPost,
} = require('../controllers/admin/blog.controller');
const { isAdmin: adminMiddleware } = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/multerMiddleware'); // Use multer for file uploads

//check blog routes
router.get('/', (req, res) => {
  res.send('Blog Routes');
});

router.post(
  '/create',
  adminMiddleware,
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 2 },
  ]),
  createBlogPost
);

// Update an existing blog post
router.put(
  '/update/:blogId',
  adminMiddleware,
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 2 },
  ]),
  updateBlogPost
);

// Delete a blog post
router.delete('/delete/:blogId', adminMiddleware, deleteBlogPost);

// Get all blog posts
router.get('/all', getAllBlogPosts);

// Get blog posts by blog id
router.get('/:blogId', getBlogPost);

module.exports = router;