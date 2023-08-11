const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  }

});

const maxFileSize = 1 * 1024 * 1024; 

const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxFileSize 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); 
    } else {
      const error = new Error('El archivo debe ser una imagen (jpeg, jpg o png, gif, webp)');
      error.code = 400;
      cb(error); 
    }
  }
});

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      code: 400,
      message: 'Error al subir el archivo',
      error: err.message
    });
  } else if (err) {
    return res.status(err.code || 500).json({
      code: err.code || 500,
      message: err.message || 'Error en el servidor'
    });
  }
  next();
};

const deleteFile = (publicId) => {
    if (publicId) {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.log("Error al eliminar la foto de Cloudinary:", error);
        } else {
          console.log("Foto eliminada de Cloudinary:", result);
        }
      });
    }
  };
  
module.exports = {
  upload,
  deleteFile,
  errorMiddleware
};
