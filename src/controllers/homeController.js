const { promiseCallback } = require('express-fileupload/lib/utilities');
const res = require('express/lib/response');
const db = require('../database/models');
const sequelize = require('../database/models').sequelize;


const controlador = {
    index: function(req,res) {

        let categories = db.categories.findAll();
        let cities = db.cities.findAll();
        let vehicles = db.vehicles.findAll();
        let vehicles_user = db.vehicles.findAll({
            order: sequelize.random(),
            limit:4,
        })



        Promise.all([categories,cities,vehicles,vehicles_user])
        .then(function([categories,cities,vehicles,vehicles_user]) {
            for(i of vehicles_user) {
                console.log(i.name);
            }
            res.render('index',{categories,cities,vehicles,vehicles_user})
        });
        
    },
}

module.exports = controlador;