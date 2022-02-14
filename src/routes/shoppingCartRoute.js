const homeController = require('../controllers/shoppingCartController');
const express = require('express');
const router = express.Router();

router.get('/',homeController.shopping);

module.exports = router;