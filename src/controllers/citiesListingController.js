const tempFileHandler = require('express-fileupload/lib/tempFileHandler');
const db = require('../database/models');

const controlador = {
    cities: function(req,res) {
        let categories = db.categories.findAll();
        let cities = db.cities.findAll();

        Promise.all([cities,categories])
        .then( function([cities,categories]) {
            res.render('cities-listing',{cities,categories})
        });
    }
}

module.exports = controlador;