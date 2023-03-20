const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: "dnxq6ul1l",
    api_key: "456835793793541",
    api_secret: "Ycl3rKXcwP_nE6qGuwSZsENGTlo"
  });


const cloudy = {
    
        Create: function(req) {

    

const res = cloudinary.uploader.upload("C:/Users/61411/Documents/IT/CURSO-PROGRAMACION-WEB-FULL-STACK/TRABAJO FINAL/imagenes de prueba/istockphoto-135199020-1024x1024.jpg", {public_id: "olympic_flag"})

res.then((data) => {
  console.log(data);
  console.log(data.secure_url);
}).catch((err) => {
  console.log(err);
});


// Generate 
const url = cloudinary.url("olympic_flag", {
  width: 100,
  height: 150,
  Crop: 'fill'
});



// The output url
console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
    
}

}



module.exports = cloudy;