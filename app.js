const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, './public')));

/*-----------------------------IMPORTANDO RUTAS---------------------------------------------*/

const homeRoute = require('./src/routes/homeRoute');
const aboutUsRoute = require('./src/routes/aboutUsRoute');
const productRoute = require('./src/routes/productRoute');
const citiesListingRoute = require('./src/routes/citiesListingRoute');
const faqsRoute = require('./src/routes/faqsRoute');


/*----------------------------ESTABLECIENDO EL MOTOR DE PLANTILLA -----------------------------------*/

app.set('view engine', 'ejs');

app.set('views', './src/views');


/*---------------------------------MONTAJE DE SERVIDOR----------------------------------------------*/


app.listen(process.env.PORT || 3000, function() {
    console.log('servidor montado');
});

/*------------------------------------------ESTABLECIENDO LAS RUTAS----------------------------------*/

app.use('/',homeRoute);

app.use('/about-us',aboutUsRoute);

app.use('/product',productRoute);

app.use('/cities-listing',citiesListingRoute);

app.use('/FAQs',faqsRoute);