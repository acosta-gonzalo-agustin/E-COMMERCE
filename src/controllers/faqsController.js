const db = require('../database/models');

const controlador = {
    Questions: function(req,res) {
        db.categories.findAll()
        .then(function(categories) {
            res.render('FAQs',{categories})
        })
        
    }
}

module.exports = controlador;