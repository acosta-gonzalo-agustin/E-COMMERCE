function loggued(req,res,next) {

    
    
    res.locals.loggued = false;
    if(req.session && req.session.user) {

        if (req.session.booking) {
            delete req.session.booking;
        }
    
        req.session.booking = {
            'id': req.params.id,
            'pickup_date': req.params.pickup_date,
            'pickup_time': req.params.pickup_time,
            'pickup_city': req.params.pickup_city,
            'dropoff_date': req.params.dropoff_date,
            'dropoff_time': req.params.dropoff_time,
            'dropoff_city': req.params.dropoff_city,
        };
        
        next();
        
    } else {
        let mensaje = 'Para reservar un vehiculo debes iniciar sesión'
        res.render('users/login',{mensaje});
    }

}

module.exports = loggued;