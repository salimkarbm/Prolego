"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorsHandler_1 = __importDefault(require("./utils/errors/errorsHandler"));
const appError_1 = __importDefault(require("./utils/errors/appError"));
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION! shutting down...');
    process.exit(1);
});
dotenv_1.default.config();
// Initialize express
const app = (0, express_1.default)();
// Port
const address = '0.0.0.0:8000';
const PORT = process.env.PORT || 8000;
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Define index route
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("<h3>Welcome To Prolego. Your World Of High-Performance Awaits, We’re so glad you’re here! You are now part of a growing community of professionals contributing to the reduction of academic dropout and failure by predicting student's academic performance across the globe via Prolego Whether you’ve come to create something of your own or for your company, we’ve got something for you. Let’s go!.</h3>");
}));
app.all('*', (req, res, next) => {
    next(new appError_1.default(`can't find ${req.originalUrl} on server!`, 404));
});
app.use(errorsHandler_1.default);
// Listen for server connections
app.listen(PORT, () => console.log(`server running on ${address}`));
process.on('unhandledRejection', (err) => {
    throw err;
});
exports.default = app;