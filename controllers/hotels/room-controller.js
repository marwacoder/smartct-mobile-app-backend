const bc = require('bcrypt');
const id = require('shortid');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {SERVER_ERROR,SUCCESS, CONFLICT, FIELD_VALIDATION, NOT_FOUND, NOT_AUTH} = require('../../helpers/response');
const { Room } = require('../../models');



const createRoom = async(req, res)=>{
    const {
        roomName,roomNumber, capacity, price,smoke,description,status
    } = req.body;

    const errors = validationResult(req);

    try{
        const findRoomByRoomNumber = await Room.findAll({where:{roomNumber}});
    
            if(!errors.isEmpty()){
                return await res.status(403).json(FIELD_VALIDATION(errors))
            }
         if(findRoomByRoomNumber.length > 0){
            return await res.status(409).json(CONFLICT(email));
        }else {         await Room.create({
                        roomId: id(),
                        roomName,roomNumber, 
                        capacity, price,smoke,
                        description, photo: req.file.path,status
                    });
                    return await res.status(200).json(SUCCESS())
                }

    }catch(error){
        return res.status(500).json(SERVER_ERROR())
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
        return res.status(500).json(SERVER_ERROR())
    }
}



module.exports = {
    createRoom,
    getRoomByPk, getRooms,
    destroyRoomById, amendRoomById
};