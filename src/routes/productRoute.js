const productController = require('../controllers/productController');
const express = require('express');
const path = require('path');
const router = express.Router();

const { body } = require('express-validator');

const validation = [
    body('nombre').notEmpty().withMessage('Debe asignar un nombre al articulo'),
    body('marca').notEmpty().withMessage('Debe asignar una marca al articulo'),
    body('precioDia').notEmpty().withMessage('Debe asignar un valor al articulo'),
    body('precioSemana').notEmpty().withMessage('Debe asignar un valor al articulo'),
    body('precioMes').notEmpty().withMessage('Debe asignar un valor al articulo'),
];



/*-------------------------RUTAS PARCIALES-------------------------------*/


router.get('/listing',productController.list);

/*-------------RUTAS PARA EDITAR-------------------------------*/

router.get('/edit/:id',productController.edit);
router.put('/edit/:id',productController.update);

/*---------------RUTAS PARA CREAR -----------------------------*/


router.get('/create/',productController.create);
router.post('/create/',validation,productController.save);

/*-----------------RUTA PARA ELIMINAR PRODUCTO-------------------------*/

router.get('/delete/:id',productController.delete);


router.get('/filter/',productController.filter);


module.exports = router;