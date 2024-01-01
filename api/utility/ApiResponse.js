const ApiResponse = (res, statusCode, msg) =>{
    return res.status(statusCode).json({msg: msg});
}

export default ApiResponse;