const homeController = require('../controllers/faqsController');
const express = require('express');
const router = express.Router();

router.get('/',homeController.Questions);

module.exports = router;