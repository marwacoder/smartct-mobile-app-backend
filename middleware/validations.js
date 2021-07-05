const { body, param,} = require('express-validator');
const Validator = require('validatorjs')
const datalize = require('datalize');
const field = datalize.field;

const validate = (method) => {
    switch (method) {
        
            case 'createBusinessAccount': {
            return [
                body('businessName', 'must not be empty businessName').notEmpty(),
                body('email', 'must not be empty email address').notEmpty(),
                body('typeofBusiness', 'must not be empty typeofBusiness').notEmpty(),
                body('email', 'must be a valid email address').isEmail(),
                body('phoneNumber', 'must not be empty phoneNumber').notEmpty(),
                body('phoneNumber', 'must be a valid email phoneNumber').isMobilePhone(),
                body('typeofBusiness', 'must not be empty typeofBusiness').notEmpty(),
                body('cordinate', 'must not be empty cordinate').notEmpty(),
                body('description', 'must not be empty description').notEmpty()
            ]
        }

        // Hotel form validation
        case 'createHotelAccount': {
            return [
                body('noOfroom', 'must not be empty noOfroom').notEmpty(),
                body('noOfroom', 'must not be empty noOfroom').isNumeric(),
                body('email', 'must not be empty email address').notEmpty(),
                body('email', 'must be a valid email address').isEmail(),
                body('phoneNumber', 'must not be empty phoneNumber').notEmpty(),
                body('phoneNumber', 'must be a valid email phoneNumber').isMobilePhone(),
                body('description', 'must not be empty description').notEmpty(),
                body('photo', 'must not be empty photo').notEmpty(),
                body('password', 'must not be empty password').notEmpty(),
                body('password').custom((value, { req }) => {
                    if (value !== req.body.confirmPassword) {
                        throw new Error('password not matched');
                    }
                    return true;
                })

            ]
        }
        case 'createRoom': {
            return [
                body('roomName', 'must not be empty roomName').notEmpty(),
                body('roomNumber', 'must not be empty roomNumber').isNumeric(),
                body('roomNumber', 'must not be empty roomNumber').notEmpty(),
                body('capacity', 'must not be empty capacity').notEmpty(),
                body('capacity', 'must not be empty capacity').isNumeric(),
                body('smoke', 'must be a valid email smoke').isBoolean(),
                body('smoke', 'must be a valid email smoke').notEmpty(),
                body('price', 'must not be empty price').notEmpty(),
                body('price', 'must not be empty price').isNumeric(),
                body('phoneNumber', 'must be a valid email phoneNumber').isMobilePhone(),
                body('description', 'must not be empty description').notEmpty(),
                body('photo', 'must not be empty photo').notEmpty(),
                body('status', 'must not be empty status').notEmpty()
            ]
        }
        case 'credentials' :{
            return [
                body('password', 'must not be empty password').notEmpty(),
                body('password').custom((value, { req }) => {
                    if (value !== req.body.confirmPassword) {
                        throw new Error('password not matched');
                    }
                    return true;
                })
            ]
        }
        case 'businessId' :{
            return param('businessId','must not be empty businessId').notEmpty()
        }
        case 'hotelId' :{
            return param('hotelId','must not be empty hotelId').notEmpty()
        }
        case 'roomId' :{
            return param('roomId','must not be empty roomId').notEmpty()
        }
        
    }
    
}


const validator = (body, rules, customMessages, cb)=>{
    
    const validation = new Validator(body, rules, customMessages);
    validation.passes(()=> cb(null, true));
    validation.fails(()=> cb(validation.errors, false));

    }


module.exports = { validate, validator}; 