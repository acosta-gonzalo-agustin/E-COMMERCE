const { promiseCallback } = require('express-fileupload/lib/utilities');
const res = require('express/lib/response');
const db = require('../database/models');
const sequelize = require('../database/models').sequelize;


const controlador = {
    index: function (req, res) {

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
        let vehicles = db.vehicles.findAll({ include: [{ association: 'category' }] });

        Promise.all([categories, cities, vehicles])
            .then(function ([categories, cities, vehicles]) {

                res.render('index', { categories, cities,vehicles,pickup_minDate})
            });

    },
}

module.exports = controlador;