const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');



function verificacion(req, res, next) {

    db.users.findOne({
        where: { email: req.body.email }
    })
        .then(function (user) {
            if (user != null) {
                res.render('users/register', { registrado: 'usuario ya registrado' });
            }
            else {
                next();
            }
        });
}

module.exports = verificacion;
