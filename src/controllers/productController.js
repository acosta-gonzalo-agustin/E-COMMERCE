const controlador = {
    create: function(req,res) {
        res.render('products/product-create');
    },
    edit: function(req,res) {
        res.render('products/product-edit');
    },

    filter: function(req,res) {
        res.render('products/product-filter');
    },
    list: function(req,res) {
        res.render('products/product-listing');
    }

}

module.exports = controlador;