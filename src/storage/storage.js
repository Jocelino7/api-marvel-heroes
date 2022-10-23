const multer = require("multer")
const uuid = require('uuid')
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null,"./uploads"),
    filename: (req, file, cb) => cb(null, uuid.v4()+ file.originalname)
})
module.exports = storage