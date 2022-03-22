const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
let users = JSON.parse(usersJSON);


function verificacion(req,res,next) {
    for(i of users) {
        if(req.body.email == i.email) {
            res.render('users/register', {registrado:'usuario ya registrado'});
        }
    } 

    next();
    
}

module.exports = verificacion;
   