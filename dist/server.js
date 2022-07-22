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
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const errorsHandler_1 = __importDefault(require("./services/errorsHandler"));
const appError_1 = __importDefault(require("./utils/errors/appError"));
const authentication_1 = __importDefault(require("./api/routes/authentication"));
const user_1 = __importDefault(require("./api/routes/user"));
// import studentInfoRoutes from './api/routes/students';
const dashboard_1 = __importDefault(require("./api/routes/dashboard"));
const cwd = process.cwd();
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION! shutting down...');
    process.exit(1);
});
dotenv_1.default.config();
// Initialize express
const app = (0, express_1.default)();
// enable proxy
app.enable('trust proxy');
// Port
const address = '0.0.0.0:8000';
const PORT = process.env.PORT || 8000;
// compression middleware
app.use((0, compression_1.default)());
// implement cors
// use cors middleware
app.use((0, cors_1.default)());
// add your routes
// app.set('view engine', 'ejs');
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: path_1.default.join(cwd, 'temp'),
    createParentPath: true,
}));
// Define index route
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("<section style=background:#104DB2;padding:6em;color:white;font-size:20px;><center><h2>Welcome To Prolego!</h2>A platform that takes into consideration the academic excellence of students. We’re so glad you’re here! You are now part of a growing community of professionals contributing to the reduction of academic dropout and failure by predicting student's academic performance across the globe via Prolego Whether you’ve come to create something of your own or for your company, we’ve got something for you. Let’s go!.</center><p style=font-size:22px;><a href='https://documenter.getpostman.com/view/11215567/UzBmM7GL#0ed2871f-3d6c-47c4-8a9f-2fba0e10a374'style=color:white;font-size:22px;>Click here<a/> for Documentation</p></section>");
}));
// app.get('/upload', async (req: Request, res: Response) => {
//   res.render('index');
// });
// Routes
(0, authentication_1.default)(app);
(0, user_1.default)(app);
// studentInfoRoutes(app);
(0, dashboard_1.default)(app);
app.all('*', (req, res, next) => {
    next(new appError_1.default(`can't find ${req.originalUrl} on server!`, 404));
});
app.use(errorsHandler_1.default);
// Listen for server connections
const server = app.listen(PORT, () => console.log(`server running on ${address}`));
process.on('unhandledRejection', (err) => {
    throw err;
});
process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. shutting down gracefully');
    server.close(() => {
        console.log('process terminated!');
    });
});
exports.default = server;
