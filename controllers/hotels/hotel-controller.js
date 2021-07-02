const bc = require('bcrypt');
const id = require('shortid');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {SERVER_ERROR,SUCCESS, CONFLICT, FIELD_VALIDATION, NOT_FOUND, NOT_AUTH} = require('../../helpers/response');
const { Hotel } = require('../../models');




const createHotelAccount = async(req, res)=>{
    const {
        description, noOfroom, email, password, phoneNumber,businessId
    } = req.body;

    console.log(req.file)
    const errors = validationResult(req);

    try{
        const findHotelByEmail = await Hotel.findAll({where:{email}});
    
            if(!errors.isEmpty()){
                return await res.status(403).json(FIELD_VALIDATION(errors))
            }
         if(findHotelByEmail.length > 0){
            return await res.status(409).json(CONFLICT(email));
        }else {
            await bc.hash(password, 10, async(error, hash) => {
                
                if(error){
                    return await res.status(500).json(SERVER_ERROR(error))
                }
                if(hash){
                    await Hotel.create({
                        hotelId: id(),
                        noOfroom, 
                        photo: req.file.path,
                        email,
                        phoneNumber,
                        description,
                        password,
                        businessId
                    });
                    return await res.status(200).json(SUCCESS());
                }
            })
        }

    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }
}


const getHotels = async(req, res)=>{

    try{
        const hotel = await Hotel.findAll()
        if(hotel){
            return res.status(200).json(SUCCESS(hotel))
        }
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }

}

const getHotelByPk =async(req, res)=>{
    const {hotelId} = req.params;
    try{
        const hotel = await Hotel.findByPk(hotelId);

        if(!hotel){
            return await res.status(404).json(NOT_FOUND(hotel))
        }
        return await res.status(200).json(SUCCESS(hotel))
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }
}

const destroyHotelById = async(req, res)=>{
    const {hotelId} = req.params;

    try {

        const hotel = await Hotel.findByPk(hotelId);
        
        if(!hotel){
            return await res.status(404).json(NOT_FOUND(hotelId))
        }
        await Hotel.destroy({where:{hotelId}})
        return await res.status(200).json(SUCCESS())
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }
}


const amendHotelById =async(req, res)=>{
    const {hotelId} = req.params;

    try {

        const hotel = await Hotel.findByPk(hotelId);
        
        if(!hotel){
            return await res.status(404).json(NOT_FOUND())
        }
        await Hotel.update({ ...req.body},{ where:{hotelId}})
        return await res.status(200).json(SUCCESS())
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }
}


const amendCredentials = async(req, res)=>{
    const {hotelId} = req.params;
    const { password, confirmPassword} = req.body;

    const errors = validationResult(req);

    try{

        const hotel = await Hotel.findByPk(hotelId);
        if(!errors.isEmpty()){
            return await res.status(403).json(FIELD_VALIDATION(errors))
        }
        if(!hotel) return await res.status(404).json(NOT_FOUND(hotel))

        else {
            await bc.hash(password, 10, async(error, hash) => {
                
                if(error){
                    return await res.status(500).json(SERVER_ERROR(error))
                }
                if(hash){
                    await Hotel.update({
                        password: hash
                    },{where:{hotelId}});
                    return await res.status(200).json(SUCCESS())
                }
            })
        }
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }
}




const authenticate = async(req, res)=>{
    const { email, password } = req.body;

    try{
        const hotel = await Hotel.findAll({where:{email}});

        if(!hotel){
            return res.status(404).json(NOT_FOUND())
        }
        else
        bc.compare(password, hotel[0].password, async (error, result) => {
            if (error) {
                return await res.status(500).json(SERVER_ERROR(error))
            }
            if(result){
                const token =  jwt.sign({
                    email: hotel[0].email,
                    password: hotel[0].password
                }, 'secrete',
                    {
                        expiresIn: 3600
                    })
                return await res.status(200).json(SUCCESS({hotel, token}))
            }
            else return await res.status(401).json(NOT_AUTH())
        })
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }
}




module.exports = {
    createHotelAccount,
    getHotelByPk, getHotels,
    destroyHotelById, amendHotelById,
    amendCredentials, authenticate
};