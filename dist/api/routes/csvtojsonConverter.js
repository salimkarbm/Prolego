"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojsonConverter_1 = __importDefault(require("../../utils/csvtojsonConverter"));
const convertFileRoute = (app) => {
    app.get('/api/v1/convert', csvtojsonConverter_1.default);
};
exports.default = convertFileRoute;
