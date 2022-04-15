const tempFileHandler = require('express-fileupload/lib/tempFileHandler');
const db = require('../database/models');

const controlador = {
    cities: function(req,res) {
        db.cities.findAll()
        .then( function(cities) {
            res.render('cities-listing',{cities})
        });
    }
}

module.exports = controlador;