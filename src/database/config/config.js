require('dotenv').config();

module.exports =
{
  "development": {
    "username": process.env.usernamed,
    "password": process.env.passwordd,
    "database": process.env.databased,
    "host":     process.env.hostd,
    "dialect":  process.env.dialectd,
    'port':     process.env.portd
  },
  "test": {
    "username": process.env.usernamet,
    "password": process.env.passwordt,
    "database": process.env.databaset,
    "host"    : process.env.hostt,
    "dialect" : process.env.dialectt
  },
  "production": {
    "username": process.env.usernamep,
    "password": process.env.passwordp,
    "database": process.env.databasep,
    "host":     process.env.hostp,
    "dialect": process.env.dialectp,
    'port':    process.env.portp
  }
}
