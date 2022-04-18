const productController = require('../controllers/productController');
const express = require('express');
const router = express.Router();

const { body } = require('express-validator');


const validation = [
    body('name').notEmpty().withMessage('Debe asignar un nombre al articulo').isLength({max:19}).withMessage('El numero de placa tiene como maximo 19 caracteres'),
    body('plate_number').notEmpty().withMessage('Debe asignar un nombre al articulo').bail().isLength({max:19}).withMessage('El numero de placa tiene como maximo 19 caracteres'),
    body('brands').notEmpty().withMessage('Debe asignar una marca al articulo'),
    body('fuel').notEmpty().withMessage('Debe asignar una combustible al articulo'),
    body('seat_number').notEmpty().withMessage('Debe asignar cantidad de asientos al articulo'),
    body('transmission').notEmpty().withMessage('Debe seleccionar caja de cambio'),
    body('pricexday').notEmpty().withMessage('Debe asignar un valor al precioxDia'),
];



/*-------------------------RUTA PARA LISTAR PRODUCTOS-------------------------------*/

router.get('/listing',productController.list);

/*-------------RUTAS PARA EDITAR-------------------------------*/

router.get('/edit/:id',productController.edit);
router.put('/edit/:id',productController.update);

/*---------------RUTAS PARA CREAR -----------------------------*/


router.get('/create',productController.create);
router.post('/create',validation,productController.save);

/*-----------------RUTA PARA ELIMINAR PRODUCTO-------------------------*/

router.delete('/delete/:id',productController.delete);


router.get('/filter/',productController.filter);

/*---------------------RUTA PARA RESERVAR PRODUCTO------------------------*/


router.get('/shopping-cart',productController.reserva);


module.exports = router;