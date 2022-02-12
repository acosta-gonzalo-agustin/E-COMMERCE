const homeController = require('../controllers/aboutUsController');
const express = require('express');
const router = express.Router();

router.get('/',homeController.Us);

module.exports = router;