const homeController = require('../controllers/citiesListingController');
const express = require('express');
const router = express.Router();

router.get('/',homeController.cities);

module.exports = router;