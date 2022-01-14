const express = require('express');
const app = express();
const path = require('path');


app.listen(3000, function() {
    console.log('servidor montado');
});

app.use(express.static('public'));


 

app.get('/home',function(req,res) {
    res.send('home');
});