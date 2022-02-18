const fs = require('fs');
const path = require('path');

let productosJSON = fs.readFileSync(path.join(__dirname,'../data/products.json'),'utf-8');
let products = JSON.parse(productosJSON);


const controlador = {

    list: function (req, res) {
        res.render('products/product-listing',{productos:products});
    },

    edit: function (req, res) {
        let id = req.params.id;
        let producto = null;
        for(i of products) {
            if(i.id == id) {
                producto = i;
                break;
                
            }
        }
        res.render('products/product-edit',{producto,producto});
    },


    filter: function (req, res) {
        res.render('products/product-filter');
    },


    create: function (req, res) {
        res.render('products/product-create');
    },

}

module.exports = controlador;