const fs = require('fs');
const path = require('path');

let productosJSON = fs.readFileSync(path.join(__dirname,'../data/products.json'),'utf-8');
let products = JSON.parse(productosJSON);


const controlador = {

    /*-------------------------metodo listar productos para administrador-------------------------*/

    list: function (req, res) {
        res.render('products/product-listing',{productos:products});
    },

    /*----------------------------metodo llamar formulario par editar producto-------------------------------*/

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



    /*----------------------------metodo editar producto y redireccionar a lista-------------------------------*/


    update: function (req, res) {
        let dato = req.body;
        let id = req.params.id;
        for(i of products) {
            if(i.id == id) {
                i.id = id;
                i.nombre = dato.nombre;
                i.marca = dato.marca;
                i.categoria = dato.categoria;
                i.cantidadAsientos = dato.cantidadAsientos;
                i.combustible = dato.combustible;
                i.cajaDeCambio = dato.cajaDeCambio;
                break;
            }
        }
        
        fs.writeFileSync(path.join(__dirname,'../data/products.json'),JSON.stringify(products,null,' '));
        res.redirect('/');
                
    },

    /*---------------------------- metodo filtrar autos ------------------------------------------*/


    filter: function (req, res) {
        res.render('products/product-filter');
    },


    create: function (req, res) {
        res.render('products/product-create');
    },

}

module.exports = controlador;