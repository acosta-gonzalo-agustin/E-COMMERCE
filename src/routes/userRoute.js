const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const verificacion_usuario = require('../middlewares/verificacion_usuario')
const verificacion_cuenta = require('../middlewares/login_validation')

const { body } = require('express-validator');


const validation = [
    body('nombre').notEmpty().withMessage('Debe completar el campo nombre'),
    body('apellido').notEmpty().withMessage('Debe completar el campo apellido'),
    body('email').notEmpty().withMessage('debe proveer un email').bail().isEmail().withMessage('el campo debe tener formato de email, por ejemplo nombre@gmail.com'),
    body('password').notEmpty().withMessage('debe elegir una clave para el usuario').bail().isLength({min:8}).withMessage('La clave debe contener al menos ocho caracteres').bail().isStrongPassword({
    minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('La clave debe contener al menos una letra minuscula, una letra mayuscula,un numero y un caracter especial'),
    body('repeatpassword').custom(async (confirmPassword, {req}) => {
        const password = req.body.password
        if(password !== confirmPassword){
          throw new Error('Las contraseñas no coinciden')
        }    
    })
];

/*------------------------RUTAS PARA REGISTRAR UN USARIO-------------------------*/

router.get('/register',userController.register);
router.post('/register',verificacion_usuario,validation,userController.save);



/*---------------------RUTAS PARA LOGUEAR UN USUARIO---------------------------*/

router.post('/login',verificacion_cuenta,userController.login);

/*---------------------RUTAS PARA VER PERFIL---------------------------*/

router.get('/profile',userController.profile);

/*---------------------RUTAS PARA DESLOGUEAR UN USARIO---------------------------*/

router.get('/logout',userController.logout);

module.exports = router;