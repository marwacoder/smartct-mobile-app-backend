const express = require('express');
const router = express.Router();


const Validations = require('../../middleware/validations')

const hotelAccountController = require('../../controllers/hotels/hotel-controller');


// http://localhost:8000/kaduna/smartct/business
router.post('/smartct/hotel', hotelAccountController.createHotelAccount);
router.get('/smartct/hotel', hotelAccountController.getHotels);
router.get('/smartct/hotel/:hotelId', Validations.validate('hotelId'), hotelAccountController.getHotelByPk);
router.post('/smartct/hotel/destroy/:hotelId', Validations.validate('hotelId'), hotelAccountController.destroyHotelById);
router.post('/smartct/hotel/amend/:hotelId', Validations.validate('hotelId'), hotelAccountController.amendHotelById);
router.post('/smartct/hotel/amend-password/:hotelId', Validations.validate('credentials'), hotelAccountController.amendCredentials);



module.exports = router;