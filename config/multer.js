const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatar');
    },
    filename: function (req, file, cb) {
        const filename = uuidv4() + path.extname(file.originalname);
        cb(null, filename);
    }
});

const teamLogoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/logo');
    },
    filename: function (req, file, cb) {
        const filename = uuidv4() + path.extname(file.originalname);
        cb(null, filename);
    }
});

const teamLogoUpload = multer({ storage: teamLogoStorage });
module.exports = multer({ storage ,teamLogoStorage })
