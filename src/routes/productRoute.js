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


/*----------------------------------------------RUTAS CLIENTE--------------------------------------------------*/



/*--------FILTRADO POR CATEGORIA-----------*/

router.get('/filter/:id_category',productController.categories);

/*----------FILTRADO POR CIUDAD----------------*/

router.get('/cities/:id_city',productController.cities);

/*----------FILTRADO POR CIUDAD/CATEGORIA/FECHAS-------------*/

router.get('/formFilter/:id?',productController.formFilter);

/*----------RUTA DETALLE DE PRODUCTO----------------*/

router.get('/detail/:id',productController.detail);


/*-------------RUTA SHOPPING-CART --------------*/

router.get('/shopping-cart/:id',productController.reserva);



/*-------------------------------------------RUTAS ADMINISTRADOR------------------------------------------------*/

/*---------------RUTAS PARA CREAR -----------------------------*/


router.get('/create',productController.create);
router.post('/create',validation,productController.save);



/*-------------RUTAS PARA EDITAR-------------------------------*/

router.get('/edit/:id',productController.edit);
router.put('/edit/:id',validation,productController.update);


/*---------RUTA PARA LISTAR PRODUCTOS-----------*/

router.get('/listing',productController.list);


/*----------RUTA PARA ELIMINAR PRODUCTO---------*/

router.delete('/delete/:id',productController.delete);




module.exports = router;