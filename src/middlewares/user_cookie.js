function loggued(req,res,next) {
    if(req.cookies.user != undefined && req.session.user == undefined) {

        const fs = require('fs');
        const path = require('path');
        const bcrypt = require('bcryptjs');

        let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
        let users = JSON.parse(usersJSON);

        for(i of users) {
            if(req.cookies.user == i.id) {

                    req.session.user = {
                        'id':i.id,
                        'nombre': i.nombre,
                        'apellido': i.apellido,
                        'email':i.email,
                        'imagen':i.imagen
                    };
                    let condicion = 2;
                    break;
                
            }

        }
        
    }

    next();

}

module.exports = loggued;