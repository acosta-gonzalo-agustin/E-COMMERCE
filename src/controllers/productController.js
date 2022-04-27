const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const db = require('../database/models');
const res = require('express/lib/response');
const { kill } = require('process');
const { type } = require('express/lib/response');





const controlador = {




    /*---------------------------- funcion cargar filtro categoria en formulario --------------------------*/

    categories: function (req, res) {

        /*----------------------------DELIMITANDO FECHA DE RECOGIDA DEL COCHE ------*/
        var date = new Date();

        let year = date.getFullYear();
        let day = date.getDate();
        let month = date.getMonth() + 1;

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        let pickup_minDate = year + '-' + month + '-' + day;


        let categories = db.categories.findAll();
        let cities = db.cities.findAll();
        let vehicles = db.vehicles.findAll(
            {
                include: [
                    { association: 'category' },
                    { association: 'brand' },
                    { association: 'city' },
                    { association: 'fuel' },
                    { association: 'features' },
                ],
                where: { id_category: req.params.id_category }
            }

        );

        Promise.all([categories, cities, vehicles])
            .then(function ([categories, cities, vehicles]) {
                res.render('products/product-filter', { categories, id_category: req.params.id_category, cities, vehicles, pickup_minDate })
            })

    },


    /*---------------------------- funcion cargar filtro ciudades en formulario --------------------------*/

    cities: function (req, res) {

        /*----------------------------DELIMITANDO FECHA DE RECOGIDA DEL COCHE ------*/
        var date = new Date();

        let year = date.getFullYear();
        let day = date.getDate();
        let month = date.getMonth() + 1;

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        let pickup_minDate = year + '-' + month + '-' + day;


        let categories = db.categories.findAll();
        let cities = db.cities.findAll();

        let vehicles = db.vehicles.findAll(
            {
                include: [
                    { association: 'brand' },
                    { association: 'city' },
                    { association: 'fuel' },
                    { association: 'category' },
                    { association: 'features' },
                ],
                where: { id_city: req.params.id_city }
            }

        );

        Promise.all([categories, cities, vehicles])
            .then(function ([categories, cities, vehicles]) {

                res.render('products/product-filter', { categories, id_city: req.params.id_city, cities, vehicles, pickup_minDate })
            })

    },

    /*---------------------------- funcion enviar formulario con filtros--------------------------*/

    formFilter: function (req, res) {

        let dato = req.query;

        


        /*----------------------------DELIMITANDO FECHA DE RECOGIDA DEL COCHE ------*/
        var date = new Date();

        let year = date.getFullYear();
        let day = date.getDate();
        let month = date.getMonth() + 1;

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        let pickup_minDate = year + '-' + month + '-' + day;


        let categories = db.categories.findAll();
        let cities = db.cities.findAll();
        let bookings = db.bookings.findAll();
        let vehicles_total = db.vehicles.findAll({
                include: [
                    { association: 'category' },
                    { association: 'brand' },
                    { association: 'city' },
                    { association: 'fuel' },
                    { association: 'features' },
                ]
            })

        Promise.all([categories, cities, bookings, vehicles_total])
            .then(function ([categories, cities, bookings, vehicles_total]) {

                let vehicles = [];


                for(i of vehicles_total) {
                    if(dato.id_category == 'Categoría') {
                        vehicles.push(i);
                    } else if(i.id_category == dato.id_category) {
                        vehicles.push(i);
                    }
                    
                    }
                


                

                /*----------------------------COMPROBANDO DISPONIBILIDAD POR FECHA------------*/
                let reservados = [];

                for (i of vehicles) {
                    let condicion = true;
                    let pickup = Date.parse(dato.pickup_date);
                    let dropoff = Date.parse(dato.dropoff_date);
                    let distancia = 31536000000;
                    var real_date_pickup = '';
                    var real_city_pickup = '';
                    var real_date_dropoff = '';
                    var real_city_dropoff = '';
                    var index = ''

                    for (j of bookings) {
                        
                        var contador = 0;
                        if (j.id_vehicle == i.id) {

                            let booking_dropoff = Date.parse(j.dropoff_date);
                            if ((Math.abs(pickup - booking_dropoff)) < distancia) {
                                distancia = Math.abs(pickup - booking_dropoff);
                                real_date_pickup = j.dropoff_date;
                                real_city_pickup = j.dropoff_city;
                                index = bookings.indexOf(j);
                                
                            }
                        }
                    }

                    if (real_date_pickup != '') {


                        for (let k = index + 1; k < bookings.length; k++) {
                            if (bookings[k].id_vehicle == i.id) {
                                real_date_dropoff = bookings[k].pickup_date;
                                real_city_dropoff = bookings[k].pickup_city;
                                break;
                            }
                        }
                        if (real_city_dropoff != '' && real_date_dropoff != '') {
                            if (dato.pickup_city != real_city_pickup || dato.dropoff_city != real_city_dropoff || !(dato.pickup_date > real_date_pickup && dato.dropoff_date < real_date_dropoff)) {
                                reservados.push(i.id);
                            }

                        } else if (dato.pickup_city != real_city_pickup || !(dato.pickup_date > real_date_pickup)) {
                            reservados.push(i.id);


                        }
                    }
                }

                


                res.render('products/product-filter', { categories, cities, vehicles, pickup_minDate, reservados })

            })

    },

    /*---------------------------- funcion detalle de producto --------------------------*/

    detail: function (req, res) {
        let cities = db.cities.findAll();
        let vehicle = db.vehicles.findOne(
            {
                include: [
                    { association: 'category' },
                    { association: 'brand' },
                    { association: 'city' },
                    { association: 'fuel' },
                    { association: 'features' },
                ],
                where: { id: req.params.id }
            }

        );

        Promise.all([vehicle, cities])
            .then(function ([vehicle, cities]) {
                res.render('products/product-detail', { vehicle, cities })
            })

    },

    /*---------------------------- funcion cargar shopping-cart --------------------------*/

    reserva: function (req, res) {
        let categories = db.categories.findAll();
        let vehicle = db.vehicles.findOne({
            include: [
                { association: 'brand' },
                { association: 'category' },
                { association: 'city' },
                { association: 'fuel' },
                { association: 'features' }
            ],
            where: { id: req.params.id }
        })

        Promise.all([categories, vehicle])
            .then(function ([categories, vehicle]) {
                res.render('products/shopping-cart', { categories, vehicle });
            })


    },


    /*----------------------------METODO PARA CARGAR FORMULARIO DE CREACION-----------------------*/


    create: function (req, res) {

        let brands = db.brands.findAll();
        let additionals = db.additionals.findAll();
        let categories = db.categories.findAll();
        let cities = db.cities.findAll();
        let features = db.features.findAll();
        let fuels = db.fuels.findAll();

        Promise.all([brands, additionals, categories, cities, features, fuels])
            .then(function ([brands, additionals, categories, cities, features, fuels]) {
                res.render('products/product-create', { brands, additionals, categories, cities, features, fuels });
            })

    },

    /*----------------------------METODO PARA GUARDAR PRODUCTO EN BASE DE DATOS -----------------------*/


    save: function (req, res) {

        let dato = req.body;

        let errors = validationResult(req);
        if (errors.isEmpty()) {


            /*--------------------------CARGANDO FOTO--------------------------------------------*/

            if (req.files) {
                const file = req.files.imagen;
                const nombre = Date.now() + file.name
                const ruta = path.join(__dirname, '../../public/img/img-autos/' + nombre)

                if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
                    file.mv(ruta, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        } else {



                            db.vehicles.create({
                                name: dato.name,
                                plate_number: dato.plate_number,
                                seat_number: dato.seat_number,
                                transmission: dato.transmission,
                                mileage: '0',
                                pricexday: dato.pricexday,
                                picture: nombre,
                                description: dato.description,
                                id_category: dato.category,
                                id_fuel: dato.fuel,
                                id_brand: dato.brands,
                                id_city: dato.city,
                            })
                                .then(function () {
                                    if (dato.features != undefined) {

                                        db.vehicles.findOne({ order: [['id', 'DESC']] })
                                            .then(function (resultado) {


                                                for (i of dato.features) {

                                                    db.vehicles_features.create({
                                                        id_feature: i,
                                                        id_vehicle: resultado.id,
                                                    })

                                                }
                                            })
                                    }

                                })
                            res.redirect('/');
                        }

                    });

                } else {
                    let error_tipo = 'El archivo debe tener formato jpg, jpeg,png';
                    res.render('products/product-create', { errors: errors.array(), old: req.body, error: error_tipo });
                }

            } else {

                let error_tipo = 'Debe seleccionar una imagen';
                res.render('products/product-create', { errors: errors.array(), old: req.body, error: error_tipo });
            }

        } else {

            let brands = db.brands.findAll();
            let additionals = db.additionals.findAll();
            let categories = db.categories.findAll();
            let cities = db.cities.findAll();
            let features = db.features.findAll();
            let fuels = db.fuels.findAll();

            Promise.all([brands, additionals, categories, cities, features, fuels])
                .then(function ([brands, additionals, categories, cities, features, fuels]) {
                    res.render('products/product-create', { errors: errors.array(), old: req.body, brands, additionals, categories, cities, features, fuels });
                })

        }

    },


    /*----------------------------metodo llamar formulario par editar producto-------------------------------*/

    edit: function (req, res) {
        let id = req.params.id;

        let brands = db.brands.findAll();
        let additionals = db.additionals.findAll();
        let categories = db.categories.findAll();
        let cities = db.cities.findAll();
        let features = db.features.findAll();
        let fuels = db.fuels.findAll();
        let vehicle_feature = db.vehicles_features.findAll();

        let vehicle = db.vehicles.findOne({
            include: [
                { association: 'brand' },
                { association: 'category' },
                { association: 'city' },
                { association: 'fuel' },
                { association: 'features' }
            ],
            where: { id: req.params.id }
        })


        Promise.all([brands, additionals, categories, cities, features, fuels, vehicle, vehicle_feature])
            .then(function ([brands, additionals, categories, cities, features, fuels, vehicle, vehicle_feature]) {
                res.render('products/product-edit', { brands, additionals, categories, cities, features, fuels, vehicle, vehicle_feature });
            })

    },



    /*----------------------------METODO EDITAR PRODUCTO EN BASE DE DATO-------------------------------*/


    update: function (req, res) {

        let dato = req.body;

        let errors = validationResult(req);
        if (errors.isEmpty()) {


            /*--------------------------CARGANDO FOTO--------------------------------------------*/

            if (req.files) {
                const file = req.files.imagen;
                const nombre = Date.now() + file.name
                const ruta = path.join(__dirname, '../../public/img/img-autos/' + nombre)

                if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
                    file.mv(ruta, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        } else {

                            db.vehicles.update(
                                {
                                    name: dato.name,
                                    plate_number: dato.plate_number,
                                    seat_number: dato.seat_number,
                                    transmission: dato.transmission,
                                    mileage: '0',
                                    pricexday: dato.pricexday,
                                    picture: nombre,
                                    description: dato.description,
                                    id_category: dato.category,
                                    id_fuel: dato.fuel,
                                    id_brand: dato.brands,
                                    id_city: dato.city,
                                },
                                { where: { id: req.params.id } }
                            )
                            // .then(function () {
                            //     if (dato.features != undefined) {

                            //         db.vehicles.findOne({ order: [['id', 'DESC']] })
                            //             .then(function (resultado) {
                            //                 console.log(resultado.id);

                            //                 for (i of dato.features) {

                            //                     db.vehicles_features.create({
                            //                         id_feature: i,
                            //                         id_vehicle: resultado.id,
                            //                     })

                            //                 }
                            //             })
                            //     }

                            // })

                            db.vehicles.findByPk(req.params.id)
                                .then(function (resultado) {
                                    fs.unlinkSync(path.join(__dirname, '../../public/img/img-autos/' + resultado.picture));

                                })

                            res.redirect('/');
                        }

                    });

                } else {
                    let error_tipo = 'El archivo debe tener formato jpg, jpeg,png';
                    res.render('products/product-edit', { errors: errors.array(), old: req.body, error: error_tipo });
                }

            } else {

                db.vehicles.update(
                    {
                        name: dato.name,
                        plate_number: dato.plate_number,
                        seat_number: dato.seat_number,
                        transmission: dato.transmission,
                        mileage: '0',
                        pricexday: dato.pricexday,
                        description: dato.description,
                        id_category: dato.category,
                        id_fuel: dato.fuel,
                        id_brand: dato.brands,
                        id_city: dato.city,
                    },
                    { where: { id: req.params.id } }
                )


                res.redirect('/');
            }

        } else {

            let brands = db.brands.findAll();
            let additionals = db.additionals.findAll();
            let categories = db.categories.findAll();
            let cities = db.cities.findAll();
            let features = db.features.findAll();
            let fuels = db.fuels.findAll();
            let vehicle = db.vehicles.findOne(
                {
                    include:
                        [

                            { association: 'brand' },
                            { association: 'category' },
                            { association: 'city' },
                            { association: 'fuel' },
                            { association: 'features' }
                        ],
                    where: { id: req.params.id }
                })

            Promise.all([brands, additionals, categories, cities, features, fuels, vehicle])
                .then(function ([brands, additionals, categories, cities, features, fuels, vehicle]) {
                    res.render('products/product-edit', { errors: errors.array(), old: req.body, brands, additionals, categories, cities, features, fuels, vehicle });
                })

        }

    },

    /*-------------------------metodo listar productos para administrador-------------------------*/

    list: function (req, res) {

        let categories = db.categories.findAll();


        let vehicles = db.vehicles.findAll({

            include: [
                { association: 'brand' },
                { association: 'category' },
                { association: 'city' },
                { association: 'features' },
                { association: 'fuel' }
            ]
        })

        Promise.all([categories, vehicles])
            .then(function ([categories, vehicles]) {
                res.render('products/product-listing', { categories, vehicles });
            })


    },


    /*-----------------------METODO PARA ELIMINACION DE PRODUCTO EN BASE DE DATOS ------------*/


    delete: function (req, res) {


        /*------------------------BORRANDO IMAGEN-----------------*/

        db.vehicles.findByPk(req.params.id)
            .then(function (resultado) {
                fs.unlinkSync(path.join(__dirname, '../../public/img/img-autos/' + resultado.picture));

            })

        /*----------------------------  ELIMINANDO PRODUCTO --------------------------*/

        db.vehicles_features.destroy({
            where: {
                id_vehicle: req.params.id
            }
        })
            .then(function () {
                db.vehicles.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            })

        res.redirect('/');

    },

}

module.exports = controlador;