const express = require('express');
const app = express();
const path = require('path');
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser');

const expressFileUpload = require('express-fileupload');
const Logueado = require('./src/middlewares/Loggued');
const userCookie = require('./src/middlewares/user_cookie');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');



// dsa// 

app.use(cors())

app.use(express.static(path.join(__dirname, './public')));


/*------------------------------CLOUDINARY CONFIG --------------------------------*/




// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});



/*------------------------------EXPRESS-SESSION A NIVEL APLICACION--------------------------------*/

app.use(cookieSession( {
  secret: "Secret message",
  
}));


/*------------------------------COOKIE-PARSER A NIVEL APLICACION--------------------------------*/

app.use(cookieParser());

/*------------------------------MIDDLEWARE USUARIO LOGGUEADO NIVEL APLICACION--------------------------------*/

app.use(userCookie); 




/*------------------------------MIDDLEWARE USUARIO LOGGUEADO NIVEL APLICACION--------------------------------*/

app.use(Logueado); 



/*-----------------------------IMPORTANDO RUTAS---------------------------------------------*/

const homeRoute = require('./src/routes/homeRoute');
const aboutUsRoute = require('./src/routes/aboutUsRoute');
const productRoute = require('./src/routes/productRoute');
const citiesListingRoute = require('./src/routes/citiesListingRoute');
const faqsRoute = require('./src/routes/faqsRoute');
const userRoute = require('./src/routes/userRoute');
const cloudyRoute = require('./src/routes/Cloudy');


/*----------------------------ESTABLECIENDO EL MOTOR DE PLANTILLA -----------------------------------*/

app.set('view engine', 'ejs');

app.set('views', 'src/views');


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







/*---------------------------RUTEO DE VISTAS-------------------------------*/  



app.use('/',homeRoute);

app.use('/about-us',aboutUsRoute);

app.use('/product',productRoute);

app.use('/cities-listing',citiesListingRoute);

app.use('/FAQs',faqsRoute);

app.use('/user',userRoute)

app.use('/cloudys',cloudyRoute)



/*---------------------------------MONTAJE DE SERVIDOR----------------------------------------------*/


app.listen(process.env.PORT || 3001, function() {
  console.log('servidor montado');
});







