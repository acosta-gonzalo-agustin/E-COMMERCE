const productController = require('../controllers/productController');
const express = require('express');
const path = require('path');
const router = express.Router();








/*-------------------------RUTAS PARCIALES-------------------------------*/

router.get('/listing',productController.list);

router.get('/edit/:id',productController.edit);
router.put('/listing/:id',productController.update);


router.get('/create',productController.create);
router.get('/filter/',productController.filter);


module.exports = router;