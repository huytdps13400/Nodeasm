const multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  module.exports = 
    multer({storage: storage, limits: { fileSize: 4 * 1024 * 1024 }})