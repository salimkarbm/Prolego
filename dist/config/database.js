"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { NODE_ENV, Database, User, Host, Port, POSTGRES_TEST_DB, Password, DATABASE_URL, } = process.env;
let client;
if (NODE_ENV === 'production') {
    const connectionString = DATABASE_URL;
    client = new pg_1.Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });
}
else if (NODE_ENV === 'development') {
    client = new pg_1.Pool({
        host: Host,
        user: User,
        database: Database,
        password: Password,
        port: parseInt(Port, 10),
    });
}
else {
    client = new pg_1.Pool({
        host: Host,
        user: User,
        database: POSTGRES_TEST_DB,
        password: Password,
        port: parseInt(Port, 10),
    });
}
// Listen for server connections
exports.default = {
    client,
    Database,
    User,
    Host,
    Port,
    POSTGRES_TEST_DB,
    Password,
};
