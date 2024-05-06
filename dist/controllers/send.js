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
exports.sendTokens = void 0;
const db_1 = __importDefault(require("../db"));
function sendTokens(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { wallet_id, event_id } = req.body;
            if (!wallet_id || !event_id) {
                res.status(400).send({
                    "error": "Bad Request"
                });
                return;
            }
            const amounts = yield db_1.default.query(`
            SELECT reward_per_sell FROM events WHERE id = $1;
        `, [event_id]);
            const amount = amounts.rows[0].reward_per_sell;
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${process.env.LUMX_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "contractId": process.env.TOKEN_ID,
                    "walletId": wallet_id,
                    "quantity": amount,
                })
            };
            const url = process.env.LUMX_API_URL + "/transactions/mints";
            const responseLumx = yield fetch(url, options);
            const responseJson = yield responseLumx.json();
            console.log(responseJson);
            res.status(200).send({
                "tx_id": responseJson
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                "error": "Internal Server Error"
            });
        }
    });
}
exports.sendTokens = sendTokens;
