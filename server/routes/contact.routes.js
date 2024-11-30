// routes/contact.routes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/common/contact.controller');

router.post('/submit', contactController.submitContactForm);

module.exports = router;
