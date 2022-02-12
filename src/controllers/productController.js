const controlador = {
    create: function(req,res) {
        res.render('products/product-create');
    },
    edit: function(req,res) {
        res.render('products/product-edit');
    }

}

module.exports = controlador;