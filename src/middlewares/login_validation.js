const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
let users = JSON.parse(usersJSON);


function verificacion(req,res,next) {
    let condicion = 0;
    for(i of users) {
        if(req.body.email == i.email) {
            condicion = 1;
            if(bcrypt.compareSync(req.body.password,i.contraseña)) {
                if(req.body.mantener_sesion != undefined) {
                    res.cookie('user',i.id, {
                        expire: 300000 + Date.now()
                     });
                    req.session.user = {
                        'id':i.id,
                        'nombre': i.nombre,
                        'apellido': i.apellido,
                        'email':i.email,
                        'imagen':i.imagen
                    };
                    condicion = 2;
                    break;
                }
                req.session.user = {
                    'id':i.id,
                    'nombre': i.nombre,
                    'apellido': i.apellido,
                    'email':i.email,
                    'imagen':i.imagen
                };
                condicion = 2;
                break;
            } 
        }
    }

    if(condicion == 0) {
        res.render('index',{mensaje:'El correo electrónico que ingresaste no está conectado a una cuenta. Encuentra tu cuenta e inicia sesión'});

    } else if(condicion == 1) {
        res.render('index',{old:req.body.email,mensaje:'La contraseña que ingresaste es incorrecta'});
    } else {
        next();
    }
}

module.exports = verificacion;