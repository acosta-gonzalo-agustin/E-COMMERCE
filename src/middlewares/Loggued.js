function loggued(req,res,next) {
    
    res.locals.loggued = false;
    if(req.session && req.session.user) {
        res.locals.loggued = true;      
        res.locals.user = req.session.user;
        console.log('llego');
    } 
    next();
}

module.exports = loggued;