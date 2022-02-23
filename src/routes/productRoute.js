const productController = require('../controllers/productController');
const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');


let storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.join(__dirname,'../../public/img'))

    },

    filename: function(req,file,cb) {
        let imageName = Date.now() + file.originalname;
        cb(null,imageName);

    },
});

const upload = multer({storage:storage});





/*-------------------------RUTAS PARCIALES-------------------------------*/

router.get('/listing',productController.list);

router.get('/edit/:id',productController.edit);
router.put('/listing/:id',upload.single('imagen'),productController.update);


router.get('/create',productController.create);
router.get('/filter',productController.filter);


module.exports = router;