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
const csvtojson_1 = __importDefault(require("csvtojson"));
// import path from 'path';
// import AppError from './errors/appError';
// import { StudentInfo }  from './interface/studentInfo';
const fileConverter = (csvFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!csvFilePath) {
    //   return new AppError('cannot find path to file', 404);
    // }
    // if (!(path.extname(csvFilePath) === '.csv')) {
    //   return new AppError('Please provide a CSV file', 400);
    // }
    const convertedFile = yield (0, csvtojson_1.default)().fromFile(csvFilePath);
    const data = convertedFile.slice(0, 100);
    return data;
});
exports.default = fileConverter;
