const express = require('express');
const router = express.Router();
const multer = require('multer');

const Validations = require('../../middleware/validations')

const roomController = require('../../controllers/hotels/room-controller');



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
router.post('/smartct/room', Validations.validate('createRoom'),upload.single('photo'), roomController.createRoom);
router.get('/smartct/room', roomController.getBusinesses);
router.get('/smartct/room/:roomId', Validations.validate('roomId'), roomController.getRoomByPk);
router.post('/smartct/room/destroy/:roomId', Validations.validate('roomId'), roomController.destroyRoomById);
router.post('/smartct/room/amend/:roomId', Validations.validate('roomId'), roomController.amendRoomById);



module.exports = router;