const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const db = require('../database/models');

/* CLOUDINARY CONFIG */

const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});




const controlador = {



    /*---------------------------- funcion cargar filtro categoria en formulario --------------------------*/

    categories: function (req, res) {

        let category = req.params.id_category;

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
                where: {
                    id_category: req.params.id_category,
                }
            }

        );

        Promise.all([categories, cities, vehicles])
            .then(function ([categories, cities, vehicles]) {
                res.render('products/products-filter', { categories, category, cities, vehicles, pickup_minDate })
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

        let pickup_date = Date.parse(pickup_minDate) + 86400000;
        let dropoff_date = Date.parse(pickup_minDate) + 518400000;

        dropoff_date = new Date(dropoff_date);
        pickup_date = new Date(pickup_date);


        let year_drop = dropoff_date.getFullYear();
        let day_drop = dropoff_date.getDate();
        let month_drop = dropoff_date.getMonth() + 1;
        let year_pick = pickup_date.getFullYear();
        let day_pick = pickup_date.getDate();
        let month_pick = pickup_date.getMonth() + 1;

        if (day_drop < 10) {
            day_drop = '0' + day_drop;
        }
        if (month_drop < 10) {
            month_drop = '0' + month_drop;
        }

        if (day_pick < 10) {
            day_pick = '0' + day_pick;
        }
        if (month_pick < 10) {
            month_pick = '0' + month_pick;
        }

        dropoff_date = year_drop + '-' + month_drop + '-' + day_drop;
        pickup_date = year_pick + '-' + month_pick + '-' + day_pick;

        let dato = {
            pickup_city: req.params.id_city,
            dropoff_city: req.params.id_city,
            pickup_date: pickup_minDate,
            dropoff_date: dropoff_date,
            pickup_time: '10:00',
            dropoff_time: '10:00',
        }


        let categories = db.categories.findAll();
        let cities = db.cities.findAll();
        let bookings = db.bookings.findAll();
        let vehicles = db.vehicles.findAll({
            include: [
                { association: 'category' },
                { association: 'brand' },
                { association: 'city' },
                { association: 'fuel' },
                { association: 'features' },
            ]
        })

        Promise.all([categories, cities, bookings, vehicles])
            .then(function ([categories, cities, bookings, vehicles]) {



                /*----------------------------COMPROBANDO DISPONIBILIDAD POR FECHA------------*/
                let reservados = [];

                for (i of vehicles) {

                    if (i.state) {

                        reservados.push(i.id);
                    } else {

                        let pickup = Date.parse(dato.pickup_date);
                        let dropoff = Date.parse(dato.dropoff_date);
                        let distancia = 31536000000;
                        var real_date_pickup = '';
                        var real_city_pickup = '';
                        var real_date_dropoff = '';
                        var real_city_dropoff = '';
                        var index = 0;
                        var check_first_booking = 0;



                        for (j of bookings) {


                            if (j.id_vehicle == i.id) {


                                check_first_booking++;

                                let booking_pickup = Date.parse(j.pickup_date);

                                if (dropoff < booking_pickup && check_first_booking == 1) {

                                    if (!(dato.dropoff_city == j.pickup_city || dropoff <= booking_pickup - 172800000)) {
                                        reservados.push(i.id);
                                    }
                                    break;

                                } else {


                                    let booking_dropoff = Date.parse(j.dropoff_date);
                                    if ((Math.abs(pickup - booking_dropoff)) < distancia) {
                                        distancia = Math.abs(pickup - booking_dropoff);
                                        real_date_pickup = Date.parse(j.dropoff_date);
                                        real_city_pickup = j.dropoff_city;
                                        index = bookings.indexOf(j);

                                    }
                                }
                            }
                        }

                        if (real_date_pickup != '') {



                            for (let k = index + 1; k < bookings.length; k++) {

                                if (bookings[k].id_vehicle == i.id) {
                                    real_date_dropoff = Date.parse(bookings[k].pickup_date);
                                    real_city_dropoff = bookings[k].pickup_city;
                                    break;
                                }
                            }
                            if (real_city_dropoff != '' && real_date_dropoff != '') {


                                if (!(((dato.pickup_city == real_city_pickup && pickup >= real_date_pickup + 86400000) || (pickup >= real_date_pickup + 172800000)) && ((dato.dropoff_city == real_city_dropoff && dropoff <= real_date_dropoff - 86400000) || (dropoff <= real_date_dropoff - 172800000)))) {
                                    reservados.push(i.id);
                                }

                            } else if (!((dato.pickup_city == real_city_pickup && pickup >= real_date_pickup + 86400000) || (pickup >= real_date_pickup + 172800000))) {

                                reservados.push(i.id);

                            }


                        } else {

                            let now = new Date();

                            let year = now.getFullYear();
                            let day = now.getDate();
                            let month = now.getMonth() + 1;

                            if (day < 10) {
                                day = '0' + day;
                            }
                            if (month < 10) {
                                month = '0' + month;
                            }

                            let mili_now = Date.parse(year + '-' + month + '-' + day);



                            if (!(dato.pickup_city == i.id_city || pickup >= mili_now + 172800000)) {

                                reservados.push(i.id);
                            }

                        }

                    }




                }



                res.render('products/products-filter', { dato, categories, cities, vehicles, pickup_minDate, reservados })

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


                for (i of vehicles_total) {
                    if (typeof req.params.id != 'undefined') {
                        if (req.params.id == i.id) {
                            vehicles.push(i);
                        }
                    } else if (dato.id_category == 'Categoría') {
                        vehicles.push(i);
                    } else if (i.id_category == dato.id_category) {
                        vehicles.push(i);
                    }

                }


                /*----------------------------COMPROBANDO DISPONIBILIDAD POR FECHA------------*/
                let reservados = [];

                for (i of vehicles) {

                    if (i.state) {
                        reservados.push(i.id);
                    } else {


                        let pickup = Date.parse(dato.pickup_date);
                        let dropoff = Date.parse(dato.dropoff_date);
                        let distancia = 31536000000;
                        var real_date_pickup = '';
                        var real_city_pickup = '';
                        var real_date_dropoff = '';
                        var real_city_dropoff = '';
                        var index = 0;
                        var check_first_booking = 0;


                        for (j of bookings) {

                            if (j.id_vehicle == i.id) {

                                check_first_booking++;

                                let booking_pickup = Date.parse(j.pickup_date);

                                if (dropoff < booking_pickup && check_first_booking == 1) {

                                    if (!(dato.dropoff_city == j.pickup_city || dropoff <= booking_pickup - 172800000)) {
                                        reservados.push(i.id);
                                    }
                                    break;

                                } else {

                                    let booking_dropoff = Date.parse(j.dropoff_date);
                                    if ((Math.abs(pickup - booking_dropoff)) < distancia) {
                                        distancia = Math.abs(pickup - booking_dropoff);
                                        real_date_pickup = Date.parse(j.dropoff_date);
                                        real_city_pickup = j.dropoff_city;
                                        index = bookings.indexOf(j);

                                    }
                                }

                            }
                        }

                        if (real_date_pickup != '') {

                            for (let k = index + 1; k < bookings.length; k++) {

                                if (bookings[k].id_vehicle == i.id) {
                                    real_date_dropoff = Date.parse(bookings[k].pickup_date);
                                    real_city_dropoff = bookings[k].pickup_city;
                                    break;
                                }
                            }
                            if (real_city_dropoff != '' && real_date_dropoff != '') {

                                if (!(((dato.pickup_city == real_city_pickup && pickup >= real_date_pickup + 86400000) || (pickup >= real_date_pickup + 172800000)) && ((dato.dropoff_city == real_city_dropoff && dropoff <= real_date_dropoff - 86400000) || (dropoff <= real_date_dropoff - 172800000)))) {

                                    reservados.push(i.id);
                                }

                            } else if (!((dato.pickup_city == real_city_pickup && pickup >= real_date_pickup + 86400000) || ((pickup >= real_date_pickup + 172800000) && (pickup >= Date.parse(pickup_minDate) + 172800000)))) {


                                reservados.push(i.id);

                            }


                        } else if (!(dato.pickup_city == i.id_city || pickup >= Date.parse(pickup_minDate) + 172800000)) {
                            reservados.push(i.id);
                        }

                    }



                }





                res.render('products/products-filter', { dato, categories, cities, vehicles, pickup_minDate, reservados })

            })

    },

    /*---------------------------- funcion detalle de producto --------------------------*/

    detail: function (req, res) {

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
                res.render('products/product-detail', { vehicle, cities, pickup_minDate })
            })

    },

    /*---------------------------- funcion cargar shopping-cart --------------------------*/

    reserva: function (req, res) {

        let dias = (Date.parse(req.params.dropoff_date) - Date.parse(req.params.pickup_date)) / 86400000;

        req.session.booking.dias = dias;

        dato = req.session.booking;


        let additionals = db.additionals.findAll();
        let insurances = db.insurances.findAll();
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

        Promise.all([categories, vehicle, insurances, additionals])
            .then(function ([categories, vehicle, insurances, additionals]) {
                let precioTotal = dias * vehicle.pricexday;
                dato.precioTotal = precioTotal;


                res.render('products/booking', { categories, vehicle, insurances, additionals, dato });
            })


    },

    /*--------------------------------CONFIRMAR-RESERVA-------------------------------------*/

    reservaConfirm: function (req, res) {


        db.vehicles.update(
            {
                state: 1
            },
            {
                where: {
                    id: req.session.booking.id
                }
            }
        )
            .then(function () {

                db.bookings.create({
                    id_insurance: req.body.seguro,
                    pickup_date: req.session.booking.pickup_date,
                    dropoff_date: req.session.booking.dropoff_date,
                    total: req.body.precioTotal,
                    id_vehicle: req.session.booking.id,
                    id_user: req.session.user.id,
                    pickup_city: req.session.booking.pickup_city,
                    dropoff_city: req.session.booking.dropoff_city,
                    pickup_time: req.session.booking.pickup_time,
                    dropoff_time: req.session.booking.dropoff_time,
                })
                    .then(function () {
                        if (req.body.additionals != undefined) {

                            db.bookings.findOne({ order: [['id', 'DESC']] })
                                .then(function (booking) {

                                    for (i of req.body.additionals) {

                                        db.additionals_bookings.create({
                                            id_additional: i,
                                            id_booking: booking.id,
                                        })

                                    }
                                })
                        }


                    })
                    .then(function () {

                        db.vehicles.update({
                            state: 0,
                        },
                            {
                                where: { id: req.session.booking.id }
                            })

                    })
                    .then(function () {
                        delete req.session.booking;
                        res.redirect('/');
                    })
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


                // Upload
                
                if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
                    file.mv(ruta, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        } else {


                            // const cloudy_data = cloudinary.uploader.upload(file, {public_id: nombre})

                            // cloudy_data.then((data) => {
                            //     console.log(data);
                            //     console.log(data.secure_url);
                            //   }).catch((err) => {
                            //     console.log(err);
                            //   });
                              
                              
                            //   // Generate 
                            //   const url = cloudinary.url(nombre, {
                            //     width: 100,
                            //     height: 150,
                            //     Crop: 'fill'
                            //   });



                            db.vehicles.create({
                                name: dato.name.trim(),
                                plate_number: dato.plate_number.trim(),
                                seat_number: dato.seat_number,
                                transmission: dato.transmission,
                                mileage: '0',
                                pricexday: dato.pricexday,
                                picture: nombre,
                                description: dato.description.trim(),
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

                    let brands = db.brands.findAll();
                    let additionals = db.additionals.findAll();
                    let categories = db.categories.findAll();
                    let cities = db.cities.findAll();
                    let features = db.features.findAll();
                    let fuels = db.fuels.findAll();

                    Promise.all([brands, additionals, categories, cities, features, fuels])
                        .then(function ([brands, additionals, categories, cities, features, fuels]) {
                            let error_tipo = 'El archivo debe tener formato jpg, jpeg,png';
                            res.render('products/product-create', { errors: errors.array(), old: req.body, error: error_tipo, brands, additionals, categories, cities, features, fuels });
                        })

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
                        let error_tipo = 'Debe seleccionar una imagen';
                        res.render('products/product-create', { errors: errors.array(), old: req.body, error: error_tipo, brands, additionals, categories, cities, features, fuels });
                    })


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


                            db.vehicles.findByPk(req.params.id)
                            .then(function (resultado) {
                                cloudinary.uploader.destroy(resultado.name)
                            })

                            const cloudy_data = cloudinary.uploader.upload(file, {use_filename : true, folder : "Fast-Wheel/img-autos"})

                            cloudy_data.then((data) => {
                                console.log(data);
                                console.log(data.secure_url);
                              }).catch((err) => {
                                console.log(err);
                              });
                              
                              
                              // Generate 
                              const url = cloudinary.url(nombre, {
                                width: 100,
                                height: 150,
                                Crop: 'fill'
                              });

                            db.vehicles.update(
                                {
                                    name: dato.name,
                                    plate_number: dato.plate_number,
                                    seat_number: dato.seat_number,
                                    transmission: dato.transmission,
                                    mileage: '0',
                                    pricexday: dato.pricexday,
                                    picture: url,
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



        db.bookings.findOne({
            where: { 
                id_vehicle: req.params.id,
                

            }
        })
            .then(function (vehicle) {





                
                if (vehicle == null) {



                    /*------------------------BORRANDO IMAGEN-----------------*/

                    db.vehicles.findByPk(req.params.id)
                        .then(function (resultado) {
                            fs.unlinkSync(path.join(__dirname, '../../public/img/img-autos/' + resultado.picture));

                        })

                    db.vehicles.findByPk(req.params.id)
                        .then(function (resultado) {
                            cloudinary.uploader.destroy(resultado.name)
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
                } else {

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
                            res.render('products/product-listing', { categories, vehicles, mensaje: 'reservado'});
                        })
                }






            })




    },

    /*---------------------------------METODOS API-----------------------------------------------------*/

    listing: function (req, res) {

        let categories = db.categories.findAll();
        let vehicles = db.vehicles.findAll(
            {

                include: [
                    { association: 'brand' },
                    { association: 'category' },
                    { association: 'city' },
                    { association: 'features' },
                    { association: 'fuel' }
                ]
            }
        );

        Promise.all([categories, vehicles])
            .then(function ([categories, vehicles]) {
                countByCategory = [];
                for (i of categories) {
                    let category = 0;
                    for (j of vehicles) {
                        if (j.id_category == i.id) {
                            category++;
                        }
                    }

                    countByCategory.push([i.name, category]);
                }
                return res.status(200).json({
                    total: vehicles.length,
                    countByCategory: countByCategory,
                    data: vehicles,
                    status: 200,
                })
            })


    },

    categories_api: function (req, res) {

        db.categories.findAll()
            .then(function (categories) {
                return res.status(200).json({
                    total: categories.length,
                    data: categories,
                    status: 200,

                })
            })
    },


    vehicle: function (req, res) {

        id = req.params.id;

        db.vehicles.findOne({
            include: [
                { association: 'category' },
                { association: 'brand' },
                { association: 'city' },
                { association: 'fuel' },
                { association: 'features' },
            ],
            where: { id: id }
        })
            .then(function (vehicle) {
                return res.status(200).json({
                    data: {
                        name: vehicle.name,
                        plate_number: vehicle.plate_number,
                        mileage: vehicle.mileage,
                        pricexday: vehicle.pricexday,
                        city: vehicle.city.name,
                        brand: vehicle.brand.name,
                        category: vehicle.category.name,
                        transmission: vehicle.transmission,
                        seat_number: vehicle.seat_number,
                        fuel: vehicle.fuel.name,
                        picture: vehicle.picture,
                        description: vehicle.description
                    }
                })
            })
            .catch(function (error) {
                return res.send(error);
            })
    },

    main_booking: function (req, res) {


        db.bookings.findAll()
            .then(function (data) {
                let cuenta = [];
                for (i of data) {
                    if (cuenta.length == 0) {
                        cuenta.push([i.id_vehicle, 1])
                    } else {

                        let condicion = true;

                        for (j of cuenta) {
                            if (i.id_vehicle == j[0]) {
                                j[1]++
                                condicion = false;
                                break;
                            }
                        }
                        if (condicion == true) {
                            cuenta.push([i.id_vehicle, 1]);
                        }
                    }
                }
                let num = 0;
                let maximo = [];
                for (i of cuenta) {
                    if (i[1] > num) {
                        maximo = i[0];
                        num = i[1];
                    }
                }

                db.vehicles.findOne(
                    {
                        include: [
                            { association: 'category' },
                            { association: 'brand' },
                            { association: 'city' },
                            { association: 'fuel' },
                            { association: 'features' },
                        ],
                        where: { id: maximo}
                    }

                )
                .then(function (data) {

                    return res.status(200).json({
                            vehicle: data,
                    })
                })
                .catch(function (error) {
                    return res.send(error);
                })

            })

    }



}

module.exports = controlador;