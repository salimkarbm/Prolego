"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/errors/appError"));
const handleDuplicateFieldDB = (err) => {
    const message = err.detail;
    return new appError_1.default(message, 400);
};
const handleExpressValidatorError = (err) => {
    const errors = err.errors.map((el) => {
        const result = Object.values(el);
        return result[2];
    });
    const message = `Invalid input data ${errors.join(', ')}.`;
    return new appError_1.default(message, 400);
};
const handleJWTError = () => {
    return new appError_1.default('Invalid token. please log in again ', 401);
};
const handleJWTExpiredError = () => {
    return new appError_1.default('Your token has expired! please log in again', 401);
};
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorPro = (err, res) => {
    // operational error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
        // programming or other unknown error: don't leak error details'
    }
    else {
        // log error
        console.error('ERROR', err);
        // send generic error message
        res.status(500).json({
            status: 'error',
            message: 'something went wrong!',
        });
    }
};
exports.default = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = Object.assign({}, err);
        if (error.name === 'JsonWebTokenError')
            error = handleJWTError();
        if (error.name === 'TokenExpiredError')
            error = handleJWTExpiredError();
        if (error.errors instanceof Array) {
            error = handleExpressValidatorError(error);
        }
        if (error.code === 23505) {
            error = handleDuplicateFieldDB(error);
        }
        sendErrorPro(error, res);
    }
};
