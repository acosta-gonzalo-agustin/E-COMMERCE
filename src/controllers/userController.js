const controlador = {
    register: function(req,res) {
        res.render('users/register')
    },

    profile: function(req,res) {
        res.render('users/profile')
    }
}

module.exports = controlador;