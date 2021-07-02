const express = require('express');
const router = express.Router();
const multer = require('multer');

const Validations = require('../middleware/validations')

const businessAccountController = require('../controllers/businessAccount-controller');



const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, './uploads/');
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
router.post('/smartct/business', Validations.validate('createBusinessAccount'),upload.single('image'), businessAccountController.createBusinessAccount);
router.get('/smartct/business', businessAccountController.getBusinesses);
router.get('/smartct/business/:businessId', Validations.validate('businessId'), businessAccountController.getBusinessByPk);
router.post('/smartct/business/destroy/:businessId', Validations.validate('businessId'), businessAccountController.destroyBusinessById);
router.post('/smartct/business/amend/:businessId', Validations.validate('businessId'), businessAccountController.amendBusinessById);



module.exports = router;