"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port_database = process.env.DB_PORT;
const database = process.env.DB_NAME;
//require ssl
const connection = new Pool({
    user,
    password,
    host,
    port: Number(port_database),
    database,
    ssl: true
});
exports.default = connection;
