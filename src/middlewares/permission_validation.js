function permission(req, res, next) {

    if (req.session && req.session.user) {
        if (req.session.user.email == 'admin1@gmail.com') {
            console.log('es el administrador');
            next();
        } else {
            res.send('pagina no encontrada');
        }
    } else {
        res.send('pagina no encontrada');
    }
}

module.exports = permission;