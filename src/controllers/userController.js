const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
let users = JSON.parse(usersJSON);






const controlador = {

    /*-----------------------METODO CARGAR FORMULARIO DE REGISTRO--------------------------------*/


    register: function(req,res) {
        res.render('users/register')
    },


    /*-----------------------METODO GUARDAR NUEVO USUARIO---------------------*/


    save: function (req, res) {
        let dato = req.body;
        let errors = validationResult(req);

        if(errors.isEmpty()) {

            let usuario = {


                id: users.length + 1,
                nombre: dato.nombre,
                apellido: dato.apellido,
                contraseña: bcrypt.hashSync(dato.password,10),
                email: dato.email,     
            }

            console.log('usuario');
    
        //     /*--------------------------CARGANDO FOTO--------------------------------------------*/
    
        //     if (req.files) {
        //         const file = req.files.imagen;
        //         const nombre = Date.now() + file.name
        //         const ruta = path.join(__dirname, '../../public/img/img-autos/' + nombre)
        //         if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
        //             file.mv(ruta, (err) => {
        //                 if (err) {
        //                     return res.status(500).send(err);
        //                 }
        //                 res.send({ status: "success", path: ruta });
        //             });
        //             articulo.imagen = nombre;
                    users.push(usuario);
                    fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, ' '));
                    res.redirect('/');
        //         } else {
        //             let error_tipo = 'El archivo debe tener formato jpg, jpeg,png';
        //             res.render('products/product-create', {errors: errors.array(),old:req.body ,error: error_tipo});
        //         }
    
        //     } else {

        //         let error_tipo = 'Debe seleccionar una imagen';
        //         res.render('products/product-create', {errors: errors.array(),old:req.body ,error: error_tipo});
        //     }
        
        } else {
            res.render('users/register', { errors: errors.array(), old: req.body });
        }    
                  
    },





    profile: function(req,res) {
        res.render('users/profile')
    }
}

module.exports = controlador;