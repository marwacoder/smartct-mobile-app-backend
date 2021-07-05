const express = require('express');
const router = express.Router();


const Validations = require('../../middleware/validations')

const roomController = require('../../controllers/hotels/room-controller');

//http://localhost:8000/kaduna/smartct/room
router.post('/smartct/room', roomController.createRoom);
router.get('/smartct/room', roomController.getRooms);
router.get('/smartct/room/:roomId', Validations.validate('roomId'), roomController.getRoomByPk);
router.post('/smartct/room/destroy/:roomId', Validations.validate('roomId'), roomController.destroyRoomById);
router.post('/smartct/room/amend/:roomId', Validations.validate('roomId'), roomController.amendRoomById);



module.exports = router;