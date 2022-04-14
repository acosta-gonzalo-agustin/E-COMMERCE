const { promiseCallback } = require('express-fileupload/lib/utilities');
const res = require('express/lib/response');
const db = require('../database/models');
const sequelize = require('../database/models').sequelize;


const controlador = {
    index: function(req,res) {

        let categories = db.categories.findAll();
        let cities = db.cities.findAll();
        let vehicles = db.vehicles.findAll({include:[{association:'category'}]});
        
        Promise.all([categories,cities,vehicles])
        .then(function([categories,cities,vehicles]) {
            console.log(categories[2].name);
            res.render('index',{categories,cities,vehicles})
        });
        
    },
}

module.exports = controlador;