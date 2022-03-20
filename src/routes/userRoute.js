const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

const { body } = require('express-validator');


const validation = [
    body('nombre').notEmpty().withMessage('Debe completar el campo nombre'),
    body('apellido').notEmpty().withMessage('Debe completar el campo apellido'),
    body('email').notEmpty().withMessage('debe proveer un email').bail().isEmail().withMessage('el campo debe tener formato de email, por ejemplo nombre@gmail.com'),
    body('password').notEmpty().withMessage('debe elegir una clave para el usuario').bail().isLength({min:8}).withMessage('La clave debe contener al menos ocho caracteres').bail().matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,).withMessage('La clave debe contener mayusculas, minuscula,letras y numeros y al menos un caracter especial'),
];


/*------------------------RUTAS PARA REGISTRAR UN USARIO-------------------------*/

router.get('/register',userController.register);
router.post('/register',validation,userController.save);

/*---------------------RUTAS PARA LOGUEAR UN USARIO---------------------------*/

router.get('/profile',userController.profile);

module.exports = router;