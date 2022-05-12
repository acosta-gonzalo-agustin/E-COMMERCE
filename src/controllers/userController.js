const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models')



const controlador = {

    /*-----------------------METODO CARGAR FORMULARIO DE REGISTRO--------------------------------*/


    register: function (req, res) {

        db.categories.findAll()
        .then(function(categories) {
            res.render('users/register',{categories})
        })
    },


    /*-----------------------METODO GUARDAR NUEVO USUARIO---------------------*/


    save: function (req, res) {

        let dato = req.body;
        let errors = validationResult(req);
        


        if (errors.isEmpty()) {

            /*--------------------------CARGANDO FOTO--------------------------------------------*/

            if (req.files) {

                const file = req.files.imagen;
               

                const nombre = Date.now() + file.name
                
                const ruta = path.join(__dirname, '../../public/img/img-users/' + nombre)

                if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
                    file.mv(ruta, (err) => {
                        if (err) {

                            return res.status(500).send(err);
                        } else {

                            db.users.create({
                                name: dato.name.trim(),
                                last_name: dato.last_name.trim(),
                                email: dato.email.trim(),
                                password: bcrypt.hashSync(dato.password, 10),
                                promo_code: 'AAA555',
                                id_role: 2,
                                profile_picture: nombre,
                            })

                            res.redirect('/');
                        }

                    });

                } else {

                    let error_tipo = 'El archivo debe tener formato jpg, jpeg,png';
                    res.render('users/register', { errors: errors.array(), old: req.body, error: error_tipo });
                }

            } else {

                let error_tipo = 'Debe seleccionar una imagen de perfil';
                res.render('users/register', { errors: errors.array(), old: req.body, error: error_tipo });
            }

        } else {

            let arreglo = errors.array();
            let mensajes = [];
            for (i of arreglo) {
                mensajes.push(i.msg)
            }
            res.render('users/register', { errors: mensajes, old: req.body });
        }

    },

    loginForm: function (req, res) {
        res.render('users/login');
    },

    login: function (req, res) {
        res.redirect('/');
    },

    profile: function (req, res) {
        db.categories.findAll()
        .then(function(categories) {

            if(typeof req.session.booking!= 'undefined') {
                console.log(req.session.booking);
            }
            res.render('users/profile',{categories})
        })
    },

    logout: function (req, res) {
        res.clearCookie('user');
        req.session.destroy();
        res.redirect('/');
    },


    /*-----------------------actualizar usuario-----------------------------------*/

    edit: function (req, res) {
        res.render('users/editProfile');
    },

    /*----------------------------metodo editar usuario y redireccionar a index-------------------------------*/


    update: function (req, res) {

        let dato = req.body;

        let errors = validationResult(req);
        if (errors.isEmpty()) {


            /*--------------------------CARGANDO FOTO--------------------------------------------*/

            if (req.files) {
                const file = req.files.imagen;
                const nombre = Date.now() + file.name
                const ruta = path.join(__dirname, '../../public/img/img-users/' + nombre)

                if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
                    file.mv(ruta, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        } else {

                            db.users.update(
                                {
                                    name: dato.name,
                                    last_name: dato.last_name,
                                    email: dato.email,
                                    phone_number: dato.phone_number,
                                    driver_licence: dato.driver_licence,
                                    profile_picture: nombre,
                                },
                                { where: { id: req.session.user.id } }
                            )

                            db.users.findByPk(req.session.user.id)
                                .then(function (resultado) {
                                    fs.unlinkSync(path.join(__dirname, '../../public/img/img-users/' + resultado.profile_picture));


                                })

                            res.clearCookie('user');
                            req.session.destroy();
                            res.redirect('/');
                        }

                    });

                } else {
                    let error_tipo = 'El archivo debe tener formato jpg, jpeg,png';
                    res.render('users/editProfile', { errors: errors.array(), old: req.body, error: error_tipo });
                }

            } else {

                db.users.update(
                    {
                        name: dato.name,
                        last_name: dato.last_name,
                        email: dato.email,
                        phone_number: dato.phone_number,
                        driver_licence: dato.driver_licence,
                    },
                    { where: { id: req.session.user.id } }
                )

                res.clearCookie('user');
                req.session.destroy();

                res.redirect('/');
            }

        } else {
            let arreglo = errors.array();
            let mensajes = [];
            for (i of arreglo) {
                mensajes.push(i.msg)
            }
            

            res.render('users/editProfile', { errors: mensajes, old: req.body });

        }

    },

    delete: function (req, res) {
        fs.unlinkSync(path.join(__dirname, '../../public/img/img-users/' + req.session.user.profile_picture));
        res.clearCookie('user');
        req.session.destroy();
        db.users.destroy({
            where: { id: req.params.id }
        });


        res.redirect('/');

    },

    bookings: function(req,res) {

        db.bookings.findAll({
            where: {id_user:req.session.user.id}
        })
        .then(function(bookings) {
            res.send(bookings)
        })

    },


    /*---------------------------------------RUTAS API USUARIO----------------------------------*/

    listing: function(req,res) {

        db.users.findAll()
        .then(function(users) {
            return res.status(200).json({
                total:users.length,
                data:users,
                status:200
            });
        })
        
    },

    user: function(req,res) {
        let id = req.params.id

        db.users.findByPk(id)
        .then(function(user) {
            return res.status(200).json({
                data:{
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    phone_number: user.phone_number,
                    driver_licence :user.driver_licence,
                    promo_code:user.promo_code,
                    id_role:user.id_role
                },
                status:200
            });
        })
        .catch(function(error) {
            return res.json(error);
        })
    }

}

module.exports = controlador;