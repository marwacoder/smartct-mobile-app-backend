const express = require('express');
const router = express.Router();
const multer = require('multer');

const Validations = require('../../middleware/validations')

const hotelAccountController = require('../../controllers/hotels/hotel-controller');



const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, './uploads/hotels/');
    },
    filename(req, file, callback){
        callback(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
       cb(null, false); 
    }
}

const upload = multer({
    storage: storage, limits: {
    fileSize: 1024 * 1024 *5
    },
    fileFilter: fileFilter,
    
});

// http://localhost:8000/kaduna/smartct/business
router.post('/smartct/hotel', Validations.validate('createHotelAccount'),upload.single('photo'), hotelAccountController.createHotelAccount);
router.get('/smartct/hotel', hotelAccountController.getHotels);
router.get('/smartct/hotel/:hotelId', Validations.validate('hotelId'), hotelAccountController.getHotelByPk);
router.post('/smartct/hotel/destroy/:hotelId', Validations.validate('hotelId'), hotelAccountController.destroyHotelById);
router.post('/smartct/hotel/amend/:hotelId', Validations.validate('hotelId'), hotelAccountController.amendHotelById);
router.post('/smartct/hotel/amend-password/:hotelId', Validations.validate('credentials'), hotelAccountController.amendCredentials);



module.exports = router;