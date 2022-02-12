const productController = require('../controllers/productController');
const express = require('express');
const router = express.Router();

router.get('/create',productController.create);
router.get('/edit',productController.edit);

module.exports = router;