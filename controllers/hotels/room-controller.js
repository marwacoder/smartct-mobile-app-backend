const id = require('shortid');
const {validationResult} = require('express-validator')
const {SERVER_ERROR,SUCCESS, CONFLICT, FIELD_VALIDATION, NOT_FOUND, NOT_AUTH} = require('../../helpers/response');
const { Room } = require('../../models');
const {validator} = require('../../middleware/validations')



const multer = require('multer');
const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, '../../uploads/hotels/rooms');
        
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
    
}).single('photo')




const validationRule = {
    'roomName': 'required|string',
    'roomNumber': 'required|integer',
    'capacity': 'required|integer',
    'smoke': 'required|boolean',
    'price': 'required|integer',
    'phoneNumber': 'required|integer',
    'phoneNumber': 'size|11',
    'description': 'required|string',
    'status': 'required|string',
    'hotelId': 'required|integer'
}
        
//
    



const createRoom = async(req, res)=>{
         
        try {

            upload(req, res,  async(err)=> {
                //  const obj = req.body = JSON.stringify(req.body)
                // const cookies = req.cookies = JSON.stringify(req.cookies)
                // req.cookies = JSON.parse(cookies)
                //  req.body = JSON.parse(obj)
    
                console.log(req.body)
                
                if (err instanceof multer.MulterError) {
                  // A Multer error occurred when uploading.
                  return await res.status(500).json({
                      error:{
                          msg:'Server Error',
                          statusCode: 500
                      }
                  })
                } else if (err) {
                  // An unknown error occurred when uploading.
                  return await res.status(500).json({
                    error:{
                        msg:'Error occured while uploading file',
                        statusCode: 500
                    }
                })
                }else if (!req.file) {
                    // An unknown error occurred when uploading.
                    return await res.status(422).json({
                      error:{
                          msg:'Please upload photo',
                          statusCode: 422
                      }
                  })
                  }
              
                validator(req.body, validationRule,{}, async(error, status)=>{
         
                    
                    if(error){
                       
                        return await res.status(403).json(FIELD_VALIDATION(error));
                    }else{
                        
                        const {
                            roomName,roomNumber,hotelId, capacity, price,smoke,description,status
                        } = req.body;
                        const findRoomByRoomNumber = await Room.findAll({where:{roomNumber}})
        
                        
        
                        
                        if(findRoomByRoomNumber.length > 0){
                            return await res.status(409).json(CONFLICT('Room already exist',roomNumber));
                        }else {    
                            
                            await Room.create({
                            roomId: id(),
                            roomName,roomNumber, 
                            capacity, price,smoke,
                            description, photo: req.file.path,
                            status, hotelId
                        });
                        return await res.status(200).json(SUCCESS())
                    }
                }
                })
                
                // Everything went fine.
              })
            
    }
    catch(error){
        return res.status(500).json(SERVER_ERROR(error))
    }
        }


const getRooms = async(req, res)=>{

    try{
        const rooms = await Room.findAll()
        if(rooms){
            return res.status(200).json(SUCCESS(rooms))
        }
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }

}

const getRoomByPk =async(req, res)=>{
    const {roomId} = req.params;
    try{
        const room = await Room.findByPk(roomId);

        if(!room){
            return await res.status(404).json(NOT_FOUND(room))
        }
        return await res.status(200).json(SUCCESS(room))
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }
}

const destroyRoomById =async(req, res)=>{
    const {roomId} = req.params;

    try {

        const room = await Room.findByPk(roomId);
        
        if(!room){
            return await res.status(404).json(NOT_FOUND(roomId))
        }
        await Room.destroy({where:{roomId}})
        return await res.status(200).json(SUCCESS())
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }
}


const amendRoomById =async(req, res)=>{
    const {roomId} = req.params;

    try {

        const room = await Room.findByPk(roomId);
        
        if(!room){
            return await res.status(404).json(NOT_FOUND())
        }
        await Hotel.update({ ...req.body},{ where:{roomId}})
        return await res.status(200).json(SUCCESS())
    }catch(error){
        return res.status(500).json(SERVER_ERROR(error))
    }
}



module.exports = {
    createRoom,
    getRoomByPk, getRooms,
    destroyRoomById, amendRoomById
};