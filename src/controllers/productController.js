const fs = require('fs');
const path = require('path');

let productosJSON = fs.readFileSync(path.join(__dirname,'../data/products.json'),'utf-8');
let products = JSON.parse(productosJSON);


const controlador = {

    list: function (req, res) {
        res.render('products/product-listing',{productos:products});
    },


    filter: function (req, res) {
        res.render('products/product-filter');
    },


    create: function (req, res) {
        res.render('products/product-create');
    },

    edit: function (req, res) {
        res.render('products/product-edit');
    },

    

}

module.exports = controlador;