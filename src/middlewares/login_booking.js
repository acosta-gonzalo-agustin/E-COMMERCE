function loggued(req,res,next) {
    
    
    res.locals.loggued = false;
    if(req.session && req.session.user) {
        next();
        
    } else {
        let mensaje = 'Para reservar un vehiculo debes iniciar sesión'
        res.render('users/login',{mensaje});
    }

}

module.exports = loggued;