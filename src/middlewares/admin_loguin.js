const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

let usersJSON = fs.readFileSync(path.join(__dirname, '../data/admin.json'), 'utf-8');
let users = JSON.parse(usersJSON);


function verificacion(req,res,next) {
    let condicion = 0;
    for(i of users) {
        if(req.body.email == i.email) {
            condicion = 1;
            if(bcrypt.compareSync(req.body.password,i.contraseña)) {
                if(req.body.mantener_sesion != undefined) {
                    res.cookie('user',i.id, {
                        maxAge: 1000 *3600
                     });
                }
                req.session.user = {
                    'id':i.id,
                    'nombre': i.nombre,
                    'email':i.email,
                    'imagen':i.imagen
                };
                condicion = 2;
                break;
            } 
        }
    }

    if(condicion == 0) {
        res.render('users/admin',{mensaje_admin:'El correo electrónico no corresponde a un administrador'});

    } else if(condicion == 1) {
        res.render('users/admin',{old:req.body.email,mensaje_admin:'La contraseña que ingresaste es incorrecta'});
    } else {
        next();
    }
}

module.exports = verificacion;