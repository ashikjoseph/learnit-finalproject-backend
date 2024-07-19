const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});


const fileFilter = (req, file, callback) => {
    if ((file.fieldname === 'noteThumbnail' || file.fieldname === 'profileImage') &&
        (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) {
        callback(null, true);
    } else if (file.fieldname === 'notePdf' && file.mimetype === 'application/pdf') {
        callback(null, true);
    } else {
        callback(new Error('Invalid file type.'));
    }
};


const multerConfig = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = multerConfig;
