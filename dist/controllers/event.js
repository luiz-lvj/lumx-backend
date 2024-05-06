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
exports.getEventById = exports.getEvents = exports.createEvent = void 0;
const db_1 = __importDefault(require("../db"));
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, date, reward_per_sell } = req.body;
            if (!name || !description || !date || !reward_per_sell) {
                res.status(400).send({
                    "error": "Bad Request"
                });
                return;
            }
            yield db_1.default.query(`
            INSERT INTO events(
                name, description, date, reward_per_sell
            ) VALUES (
                $1, $2, $3, $4
            );
        `, [name, description, date, reward_per_sell]);
            return res.status(201).send({
                "status": "Event created"
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                "error": "Internal Server Error"
            });
        }
    });
}
exports.createEvent = createEvent;
function getEvents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const events = yield db_1.default.query(`
            SELECT * FROM events;
        `);
            res.status(200).send({
                "events": events.rows
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                "error": "Internal Server Error"
            });
        }
    });
}
exports.getEvents = getEvents;
function getEventById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const events = yield db_1.default.query(`
            SELECT * FROM events WHERE id = $1;
        `, [id]);
            res.status(200).send({
                "event": events.rows[0]
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                "error": "Internal Server Error"
            });
        }
    });
}
exports.getEventById = getEventById;
