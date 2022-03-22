const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
let users = JSON.parse(usersJSON);


function verificacion(req,res,next) {
    for(i of users) {
        if(req.body.email == i.email) {
            if(bcrypt.compareSync(req.body.password,i.contraseña)) {
                break; 
            } else {
                console.log('llego');
                res.render('/',{mensaje:'La contraseña que ingresaste es incorrecta'});
            }
        } else {
            console.log('llego');
            res.render('/',{mensaje:'El correo electrónico que ingresaste no está conectado a una cuenta. Encuentra tu cuenta e inicia sesión'});
        }
    }
    
    req.session.usuario  = req.body.email;
    next();
}

module.exports = verificacion;