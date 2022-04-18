const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const db = require('../database/models');





const controlador = {

    /*-------------------------metodo listar productos para administrador-------------------------*/

    list: function (req, res) {

        db.vehicles.findAll({
            include: [
                { association: 'brand' },
                { association: 'category' },
                { association: 'city' },
                { association: 'features' },
                { association: 'fuel' }
            ]
        })
            .then(function (vehicles) {
                res.render('products/product-listing', { vehicles });
            })


    },

    /*----------------------------metodo llamar formulario par editar producto-------------------------------*/

    edit: function (req, res) {
        let id = req.params.id;
        let producto = null;
        for (i of products) {
            if (i.id == id) {
                producto = i;
                break;


            }

        }

        res.render('products/product-edit', { producto, producto });
    },



    /*----------------------------metodo editar producto y redireccionar a lista-------------------------------*/


    update: function (req, res) {
        let dato = req.body;
        let id = req.params.id;
        for (i of products) {
            if (i.id == id) {
                i.nombre = dato.nombre;
                i.marca = dato.marca;
                if (dato.categoria != 'Categoria de vehiculo') {
                    i.categoria = dato.categoria;
                };
                if (dato.cantidadAsientos != 'Cantidad de asientos') {
                    i.cantidadAsientos = dato.cantidadAsientos;
                };
                if (dato.combustible != 'Tipo de combustible') {
                    i.combustible = dato.combustible;
                }
                i.cajaDeCambio = dato.cajaDeCambio;
                i.airbag = dato.airbag;
                if (dato.ciudad != 'Ciudad') {
                    i.ciudad = dato.ciudad;
                };
                i.adicionales = dato.adicionales;
                i.seguro = dato.seguro;
                i.precioDia = dato.precioDia;
                i.precioSemana = dato.precioSemana;
                i.precioMes = dato.precioMes;
                i.adicionales = dato.adicionales;

                /*--------------------------CARGANDO FOTO--------------------------------------------*/

                if (req.files) {
                    const file = req.files.imagen;
                    const nombre = Date.now() + file.name
                    const ruta = path.join(__dirname, '../../public/img/img-autos/' + nombre)
                    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
                        file.mv(ruta, (err) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.send({ status: "success", path: ruta });
                        });
                        if (typeof i.imagen != 'undefined') {
                            fs.unlinkSync(path.join(__dirname, '../../public/img/img-autos/' + i.imagen));
                        }
                        i.imagen = nombre;
                    } else {
                        let error_tipo = 'El archivo debe tener formato jpg, jpeg,png';
                        res.render('products/product-edit', { error: error_tipo, producto: i });
                    }

                }
                break;
            }
        }


       
        res.redirect('/');

    },

    /*---------------------------- metodo filtrar autos ------------------------------------------*/


    filter: function (req, res) {
        res.render('products/product-filter', { productos: products });
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

    /*----------------------------METODO PARA ENVIAR NUEVO PRODUCTO-----------------------*/


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
                                                console.log(resultado.id);

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

    delete: function (req, res) {

        let id = req.params.id;

        /*------------------------BORRANDO IMAGEN-----------------*/

        for (i of products) {
            if (i.id == id && i.imagen) {
                fs.unlinkSync(path.join(__dirname, '../../public/img/img-autos/' + i.imagen));
                break;
            }
        }

        /*----------------------------  ELIMINANDO PRODUCTO --------------------------*/

        db.vehicles_features.destroy({
            where: {
                id_vehicle: req.params.id
            }
        })
        .then(function() {
            db.vehicles.destroy({
                where: {
                    id: req.params.id
                }
            })
        })

        res.redirect('/');

    },

    reserva: function (req, res) {
        res.render('products/shopping-cart')
    }

}

module.exports = controlador;