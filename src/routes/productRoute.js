const productController = require('../controllers/productController');
const express = require('express');
const router = express.Router();

router.get('/create',productController.create);
router.get('/edit',productController.edit);
router.get('/product-listing',productController.list);
router.get('/product-filter',productController.filter);


module.exports = router;