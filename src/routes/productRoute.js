const productController = require('../controllers/productController');
const express = require('express');
const router = express.Router();
const loggued_booking = require('../middlewares/loggued_booking');
const booking_session = require('../middlewares/booking_session');
const permission_validation = require('../middlewares/permission_validation');

const { body } = require('express-validator');


const validation = [
    body('name').notEmpty().withMessage('Debe asignar un nombre al articulo').isLength({max:19}).withMessage('El numero de placa tiene como maximo 19 caracteres'),
    body('plate_number').notEmpty().withMessage('Debe asignar numero de placa').bail().isLength({max:19}).withMessage('El numero de placa tiene como maximo 19 caracteres'),
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


/*-------------RUTA BOOKING --------------*/

router.get('/booking/:id/:pickup_date/:dropoff_date/:pickup_city/:dropoff_city/:pickup_time/:dropoff_time',,loggued_booking,,booking_session,productController.reserva);
router.post('/booking',loggued_booking,productController.reservaConfirm);



/*-------------------------------------------RUTAS ADMINISTRADOR------------------------------------------------*/

/*---------------RUTAS PARA CREAR -----------------------------*/


router.get('/create',permission_validation,productController.create);
router.post('/create',permission_validation,validation,productController.save);



/*-------------RUTAS PARA EDITAR-------------------------------*/

router.get('/edit/:id',permission_validation,productController.edit);
router.put('/edit/:id',permission_validation,validation,productController.update);


/*---------RUTA PARA LISTAR PRODUCTOS-----------*/

router.get('/listing',permission_validation,productController.list);


/*----------RUTA PARA ELIMINAR PRODUCTO---------*/

router.delete('/delete/:id',permission_validation,productController.delete);



/*----------------------------RUTAS API--------------------------------------------------------*/

router.get('/list',productController.listing);


router.get('/categories',productController.categories_api);

router.get('/:id(\\d{12})',productController.vehicle);

router.get('/main_booking',productController.main_booking);











module.exports = router;