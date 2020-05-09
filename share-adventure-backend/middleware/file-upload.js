const multer = require('multer');
const { v4 : uuidv4} = require('uuid');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}
const filStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uuidv4() + '.' +ext);
    }
});

const fileUpload = multer({
    storage: filStorage,
    limits: 5000000, // 5mb
    fileFilter: (req,file,cb)=> {
        const isValid = !!MIME_TYPE_MAP[file.mimetype]; //using !! operator returns boolean based on undefined or null
        let error = isValid ? null : new Error('Invalid Mime Type')
        cb(error,isValid);
    }
})

module.exports = fileUpload;