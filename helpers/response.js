 const SERVER_ERROR =(error)=>{
    return {
        msg: 'Server Error',
        statusCode: 500,
        error
    }
}

const BAD_REQUEST =(message)=>{
    return {
        msg: 'Bad Requet',
        statusCode: 400,
        message
    }
}


const NOT_FOUND =(message)=>{
    return {
        msg: `${message} Not found`,
        statusCode: 404,
        params: message
    }
}

const NOT_AUTH =()=>{
    return {
        msg: 'invalid username or password',
        statusCode: 401
    }
}

 const SUCCESS =(data)=>{
    return {
        msg: 'success',
        statusCode: 200,
        data
    }
}

 const CONFLICT =(msg)=>{
    return {
        msg: `Business with this email address already exist`,
        statusCode: 409,
        params: msg
    }
}

 const FIELD_VALIDATION =(errors)=>{
    return {
        msg: errors.array()[0].msg,
        param: errors.array()[0].param,
        statusCode: 403
    }
}


module.exports = {
    SERVER_ERROR, SUCCESS, 
    NOT_FOUND, NOT_AUTH,
    CONFLICT, FIELD_VALIDATION,
    BAD_REQUEST
}