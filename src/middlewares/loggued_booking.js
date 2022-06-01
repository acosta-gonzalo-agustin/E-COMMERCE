function permission(req, res, next) {

    if (req.session && req.session.user) {
        if (req.session.user.id_role == 2) {
            next();
        } else {
            res.send('el administrador no puede hacer reservas. Ingresa con un cliente');
        }
    } 
}

module.exports = permission;
