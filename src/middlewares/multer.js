const multer = require('multer');
const path = require('path');


let configuracionImagen = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.join(__dirname,'../../public/img'))

    },

    filename: function(req,file,cb) {
        let imageName = Date.now() + file.originalname;
        cb(null,imageName);

    },
});

const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) {
        cb(null, true);
    } else {
        cb(new multer.MulterError('not a PNG'), false);
        cb(null, false);
        return cb(new Error('No es una imagen'));
    }
};


const limits = {
    fileSize: 1024 * 1024 * 1, // tamaño en bytes, 2 mb 
    fieldNameSize: 200
}

/* 1tb = 1024 gb / 1 gb = 1024 mb / 1 mb = 1024 kb / 1 kb = 1024 bytes / 1 byte = 8 bits / 1 bit */


const uploadFile = multer({ storage: configuracionImagen, fileFilter: fileFilter, limits: limits });


module.exports = uploadFile;