const BaseError = require("./base_error");

class ApiError extends BaseError{
    constructor(name, httpStatusCode, description, isOperational){
        super(name, httpStatusCode, description, isOperational);
    }

}

module.exports = ApiError;