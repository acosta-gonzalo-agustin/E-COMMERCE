const express = require('express');
const app = express();
const path = require('path');


app.listen(3000, function() {
    console.log('servidor montado');
});

app.use(express.static(path.join(__dirname, './public')));


 

app.get('/home',function(req,res) {
    res.sendFile(path.join(__dirname,'views/index.html'));
});