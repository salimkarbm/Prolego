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
// Initialize express
const app = (0, express_1.default)();
// Port
const address = '0.0.0.0:8080';
const PORT = process.env.PORT || 8080;
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Define index route
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Welcome to Prolego. The following API's are available to be accessed:");
}));
// Listen for server connections
app.listen(PORT, () => console.log(`server running on ${address}`));
exports.default = app;
