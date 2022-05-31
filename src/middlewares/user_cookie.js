function loggued(req, res, next) {

    if (req.cookies.user != undefined && req.session.user == undefined) {

        const db = require('../database/models');
        db.users.findByPk(req.cookies.user)
            .then(function (resultado) {
                if (resultado != null) {
                    req.session.user = {
                        'id': resultado.id,
                        'name': resultado.name,
                        'last_name': resultado.last_name,
                        'email': resultado.email,
                        'profile_picture':resultado.profile_picture,
                        'phone_number': resultado.phone_number,
                        'promo_code': resultado.promo_code,
                        'driver_licence': resultado.driver_licence,
                        'id_role': resultado.id_role
                    };
                }
                next();
            })

    } else {
        next()
    }

    

}

module.exports = loggued;