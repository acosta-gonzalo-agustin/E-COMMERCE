const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const expressFileUpload = require('express-fileupload');
const Logueado = require('./src/middlewares/Loggued');



app.use(express.static(path.join(__dirname, './public')));


/*-----------------------------IMPORTANDO RUTAS---------------------------------------------*/

const homeRoute = require('./src/routes/homeRoute');
const aboutUsRoute = require('./src/routes/aboutUsRoute');
const productRoute = require('./src/routes/productRoute');
const citiesListingRoute = require('./src/routes/citiesListingRoute');
const faqsRoute = require('./src/routes/faqsRoute');
const shoppingCartRoute = require('./src/routes/shoppingCartRoute');
const userRoute = require('./src/routes/userRoute');


/*----------------------------ESTABLECIENDO EL MOTOR DE PLANTILLA -----------------------------------*/

app.set('view engine', 'ejs');

app.set('views', './src/views');


/*---------------------------------------------ACTIVANDO ENVIO POR FORMULARIO------------------------------------------*/

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*-----------------------------------------IMPORTANDO METODOS PUT Y DELETE-------------------------------*/

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


/*----------------------------------------------RUTA DE EXPRESS FILE UPLOAD-------------------------------*/
app.use(expressFileUpload({
    // limits: { fileSize: 512000 }, // 500kb
    abortOnLimit: true
  })
  );

/*------------------------------EXPRESS-SESSION A NIVEL APLICACION--------------------------------*/

  app.use(session( {
    secret: "Secret message",
    resave:false,
    saveUninitialized:false,
  }));

  /*------------------------------MIDDLEWARE USUARIO LOGGUEADO NIVEL APLICACION--------------------------------*/

  app.use(Logueado);



/*---------------------------RUTEO DE VISTAS-------------------------------*/  

app.use('/',homeRoute);

app.use('/about-us',aboutUsRoute);

app.use('/product',productRoute);

app.use('/cities-listing',citiesListingRoute);

app.use('/FAQs',faqsRoute);

app.use('/shopping-cart',shoppingCartRoute);

app.use('/user',userRoute)


/*-------------------------------------- ERROR PARA RUTAS ERRONEAS------------------------------------------*/


app.use((req, res, next) => {
    res.status(404).render('not-found');
   })



/*---------------------------------MONTAJE DE SERVIDOR----------------------------------------------*/


app.listen(process.env.PORT || 3000, function() {
  console.log('servidor montado');
});