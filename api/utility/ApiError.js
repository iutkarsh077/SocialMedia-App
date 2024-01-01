const ApiError = (res, statusCode, msg) =>{
    return res.status(statusCode).json({msg: msg});
}

export default ApiError;