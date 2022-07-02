"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { NODE_ENV, Database, User, Host, DATABASE_PORT, POSTGRES_TEST_DB, Password, DATABASE_URL, } = process.env;
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
<<<<<<< HEAD
        port: parseInt(DATABASE_PORT, 10),
=======
>>>>>>> 1b1c16fae12c46bc70c95763425f67ba5ca1cd8c
    });
}
else {
    client = new pg_1.Pool({
        host: Host,
        user: User,
        database: POSTGRES_TEST_DB,
        password: Password,
        port: parseInt(DATABASE_PORT, 10),
    });
}
// Listen for server connections
exports.default = {
    client,
    Database,
    User,
    Host,
    DATABASE_PORT,
    POSTGRES_TEST_DB,
    Password,
};
