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
exports.signin = void 0;
const db_1 = __importDefault(require("../db"));
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res.status(400).send({
                    "error": "Email is required"
                });
            }
            const influencers = yield db_1.default.query(`
            SELECT * FROM influencers WHERE email = $1;
        `, [email]);
            if (influencers.rows.length === 0) {
                return res.status(404).send({
                    "error": "Email not found"
                });
            }
            const influencer = influencers.rows[0];
            if (influencer.password !== password) {
                return res.status(401).send({
                    "error": "Unauthorized"
                });
            }
            res.status(200).send({
                "name": influencer.name,
                "email": influencer.email,
                "wallet_id": influencer.wallet_id,
                "wallet_address": influencer.wallet_address,
                "referral_code": influencer.referral_code
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
exports.signin = signin;
