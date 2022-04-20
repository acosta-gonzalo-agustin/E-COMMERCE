const db = require('../database/models');

const controlador = {
    Us: function(req,res) {

        db.categories.findAll()
        .then(function(categories) {
            res.render('about-us',{categories})
        })

    }
}

module.exports = controlador;