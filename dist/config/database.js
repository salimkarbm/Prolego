"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { NODE_ENV, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_TEST_DB, POSTGRES_PASSWORD, } = process.env;
let client;
if (NODE_ENV === 'development') {
    console.log('dev');
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD,
        port: parseInt(POSTGRES_PORT, 10),
    });
}
else if (NODE_ENV === 'test') {
    console.log('test');
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        database: POSTGRES_TEST_DB,
        password: POSTGRES_PASSWORD,
        port: parseInt(POSTGRES_PORT, 10),
    });
}
else {
    client = new pg_1.Pool({});
}
// Listen for server connections
exports.default = {
    client,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_TEST_DB,
    POSTGRES_PASSWORD,
};
