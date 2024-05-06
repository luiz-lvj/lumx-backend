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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalanceByWalletId = void 0;
function getBalanceByWalletId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { walletId } = req.params;
            if (!walletId) {
                return res.status(400).send({
                    "error": "WalletId is required"
                });
            }
            const options = {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${process.env.LUMX_API_KEY}`,
                },
            };
            const url = process.env.LUMX_API_URL + "/wallets/" + walletId;
            const responseLumx = yield fetch(url, options);
            const responseJson = yield responseLumx.json();
            if (!("tokens" in responseJson)) {
                return res.status(400).send({
                    "error": "WalletId not found"
                });
            }
            let balance = 0;
            for (let i = 0; i < responseJson.tokens.length; i++) {
                if (String(responseJson.tokens[i].contractAddress).toLowerCase() === String(process.env.TOKEN_ADDRESS).toLowerCase()) {
                    balance = responseJson.tokens[i].quantity / (Math.pow(10, 18));
                    break;
                }
                return res.status(400).send({
                    "error": "Token not found"
                });
            }
            res.status(200).send({
                "balance": balance
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
exports.getBalanceByWalletId = getBalanceByWalletId;
