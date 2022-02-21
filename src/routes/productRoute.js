const productController = require('../controllers/productController');
const express = require('express');
const router = express.Router();



router.get('/listing',productController.list);

router.get('/edit/:id',productController.edit);
router.post('/listing/:id',productController.update);


router.get('/create',productController.create);
router.get('/filter',productController.filter);


module.exports = router;