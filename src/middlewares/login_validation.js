const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');


function verificacion(req, res, next) {
    let condicion = 0;

    db.users.findOne({
        include:
            [
                { association: 'role' },
                { association: 'bookings' }
            ],
        where: { email: req.body.email },

    })
        .then(function (user) {
            if (user != null) {


                if (req.body.email == user.email) {
                    condicion = 1;
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        if (req.body.mantener_sesion != undefined) {
                            res.cookie('user', user.id, {
                                maxAge: 1000 * 3600
                            });

                        }

                        req.session.user = {
                            'id': user.id,
                            'name': user.name,
                            'last_name': user.last_name,
                            'email': user.email,
                            'profile_picture': user.profile_picture,
                            'phone_number': user.phone_number,
                            'promo_code': user.promo_code,
                            'driver_licence': user.driver_licence,
                            'id_role': user.id_role
                        };
                        condicion = 2;
                    }
                }

            }

            if (condicion == 0) {
                let categories = db.categories.findAll();
                let cities = db.cities.findAll();
                let vehicles = db.vehicles.findAll({ include: [{ association: 'category' }] });

                Promise.all([categories, cities, vehicles])
                    .then(function ([categories, cities, vehicles]) {

                        res.render('index', { categories, cities, vehicles, mensaje: 'El correo electrónico que ingresaste no está conectado a una cuenta. Encuentra tu cuenta e inicia sesión'})
                    });

            } else if (condicion == 1) {
                let categories = db.categories.findAll();
                let cities = db.cities.findAll();
                let vehicles = db.vehicles.findAll({ include: [{ association: 'category' }] });

                Promise.all([categories, cities, vehicles])
                    .then(function ([categories, cities, vehicles]) {

                        res.render('index', { categories, cities, vehicles, mensaje: 'La contraseña que ingresaste es incorrecta'})
                    });

            } else {
                next();
            }



        })



}

module.exports = verificacion;