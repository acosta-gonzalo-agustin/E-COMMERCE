const productController = require('../controllers/productController');
const express = require('express');
const router = express.Router();

router.get('/create',productController.create);
router.get('/edit/:id',productController.edit);
//router.PUT('/edit/:id',productController.edit);
router.get('/listing',productController.list);
router.get('/filter',productController.filter);


module.exports = router;