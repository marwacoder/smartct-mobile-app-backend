const bc = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {SERVER_ERROR,SUCCESS, CONFLICT, FIELD_VALIDATION, NOT_FOUND, NOT_AUTH} = require('../helpers/response');
const { Business } = require('../models');


const getBusinessId = (min = 0, max = 1000000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString().padStart(8, '0')
}


const createBusinessAccount = async(req, res)=>{
    const {
        businessName, typeofBusiness, location, cordinate,
        email, phoneNumber, description,
        image, password, confirmPassword
    } = req.body;
    console.log(req.body)

    const id = getBusinessId()
    const errors = validationResult(req);
    console.log(req)

    try{
        const findBusinessByEmail = await Business.findAll({where:{email}});
    
            if(!errors.isEmpty()){
                return await res.status(403).json(FIELD_VALIDATION(errors))
            }
         if(findBusinessByEmail.length > 0){
            return await res.status(409).json(CONFLICT(email));
        }else {         await Business.create({
                        businessId: id,
                        businessName,
                        typeofBusiness,
                        email,
                        phoneNumber,
                        location,
                        cordinate,
                        description
                    });
                    return await res.status(200).json(SUCCESS())
                }

    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }
}


const getBusinesses = async(req, res)=>{

    try{
        const businesses = await Business.findAll()
        if(businesses){
            return res.status(200).json(SUCCESS(businesses))
        }
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }

}

const getBusinessByPk =async(req, res)=>{
    const {businessId} = req.params;
    try{
        const business = await Business.findByPk(businessId);

        if(!business){
            return await res.status(404).json(NOT_FOUND(business))
        }
        return await res.status(200).json(SUCCESS(business))
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }
}

const destroyBusinessById =async(req, res)=>{
    const {businessId} = req.params;

    try {

        const business = await Business.findByPk(businessId);
        
        if(!business){
            return await res.status(404).json(NOT_FOUND(businessId))
        }
        await Business.destroy({where:{businessId}})
        return await res.status(200).json(SUCCESS())
    }catch(error){
        return res.status(500).json(SERVER_ERROR(error))
    }
}


const amendBusinessById =async(req, res)=>{
    const {businessId} = req.params;

    try {

        const business = await Business.findByPk(businessId);
        
        if(!business){
            return await res.status(404).json(NOT_FOUND(business))
        }
        await Business.update({ ...req.body},{ where:{businessId}})
        return await res.status(200).json(SUCCESS(business))
    }catch(error){
        return res.status(500).json(SERVER_ERROR())
    }
}


module.exports = {
    createBusinessAccount,
    getBusinessByPk, getBusinesses,
    destroyBusinessById, amendBusinessById
};