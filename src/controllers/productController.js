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
                if(dato.categoria != 'Categoria de vehiculo') {
                    i.categoria = dato.categoria;
                };
                if(dato.cantidadAsientos != 'Cantidad de asientos') {
                    i.cantidadAsientos = dato.cantidadAsientos;
                };
                if(dato.combustible != 'Tipo de combustible') {
                    i.combustible = dato.combustible;
                }
                i.cajaDeCambio = dato.cajaDeCambio;
                i.airbag = dato.airbag;
                if(dato.ciudad != 'Ciudad') {
                    i.ciudad = dato.ciudad;
                };
                i.adicionales = dato.adicionales;
                i.precioDia = dato.precioDia;
                i.precioSemana = dato.precioSemana;
                i.precioMes = dato.precioMes;
                i.adicionales = dato.adicionales;

                /*--------------------------CARGANDO FOTO--------------------------------------------*/

                if(req.files) {
                    const file = req.files.imagen;
                    console.log(file);
                    const nombre = Date.now() + file.name
                    const ruta = path.join(__dirname, '../../public/img/img-autos/' + nombre)
                    if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
                        file.mv(ruta, (err) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.send({ status: "success", path: ruta });
                            });
                            fs.unlinkSync(path.join(__dirname,'../../public/img/img-autos/' + i.imagen));
                            i.imagen = nombre;
                    } else {
                        let error_tipo = 'El archivo debe tener formato jpg, jpeg,png';
                        console.log(i);
                        res.render('products/product-edit',{error:error_tipo,producto:i});
                    }
                    
                }
                break;    
            }
        }
        
        
        fs.writeFileSync(path.join(__dirname,'../data/products.json'),JSON.stringify(products,null,' '));
        res.redirect('/');
                
    },

    /*---------------------------- metodo filtrar autos ------------------------------------------*/


    filter: function (req, res) {
        res.render('products/product-filter',{productos:products});
    },


    create: function (req, res) {
        res.render('products/product-create');
    },

}

module.exports = controlador;