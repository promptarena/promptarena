// routes/newsletter.routes.js
const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/common/newsletter.controller');

router.post('/subscribe', newsletterController.subscribeToNewsletter);
router.post('/unsubscribe', newsletterController.unsubscribeFromNewsletter);

module.exports = router;
