const productController = require('../controllers/productController');
const express = require('express');
const router = express.Router();

router.get('/create',productController.create);
router.get('/edit',productController.edit);
router.get('/listing',productController.list);
router.get('/filter',productController.filter);


module.exports = router;