const express = require('express');
const app = express();
const path = require('path');


app.listen(process.env.PORT || 3000, function() {
    console.log('servidor montado');
});

app.use(express.static(path.join(__dirname, './public')));


 

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname,'views/index.html'));
});

app.get('/login',function(req,res) {
    res.sendFile(path.join(__dirname,'views/users/login.html'));
});

app.get('/product-detail',function(req,res) {
    res.sendFile(path.join(__dirname,'views/products/product-detail.html'));
});

app.get('/product-listing',function(req,res) {
    res.sendFile(path.join(__dirname,'views/products/product-listing.html'));
});

app.get('/register',function(req,res) {
    res.sendFile(path.join(__dirname,'views/users/register.html'));
});

app.get('/shopping-cart',function(req,res) {
    res.sendFile(path.join(__dirname,'views/shopping-cart.html'));
});

app.get('/about-us',function(req,res) {
    res.sendFile(path.join(__dirname,'views/about-us.html'));
});

app.get('/FAQ',function(req,res) {
    res.sendFile(path.join(__dirname,'views/FAQs.html'));
});

app.get('/cities',function(req,res) {
    res.sendFile(path.join(__dirname,'views/cities-listing.html'));
});