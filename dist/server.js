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
const dotenv_1 = __importDefault(require("dotenv"));
const path = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv_1.default.config({ path });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const signup_1 = require("./controllers/signup");
const send_1 = require("./controllers/send");
const event_1 = require("./controllers/event");
const influencer_1 = require("./controllers/influencer");
const signin_1 = require("./controllers/signin");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, signup_1.signup)(req, res); }));
app.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, signin_1.signin)(req, res); }));
app.post('/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, send_1.sendTokens)(req, res); }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/event', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, event_1.createEvent)(req, res); }));
app.get('/events', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, event_1.getEvents)(req, res); }));
app.get('/influencers/:walletId/balance', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, influencer_1.getBalanceByWalletId)(req, res); }));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
