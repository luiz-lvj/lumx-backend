import { Request, Response } from "express";
import connection from "../db";


export async function sendTokens(req: Request, res: Response) {
    try{

        const {referral_code, event_id } = req.body;

        if (!referral_code || !event_id){
            res.status(400).send({
                "error": "Bad Request"
            });
            return;
        }

        const wallets = await connection.query(`
            SELECT wallet_id FROM influencers WHERE referral_code = $1;
        `,[referral_code]);

        const wallet_id = wallets.rows[0].wallet_id;

        const amounts = await connection.query(`
            SELECT reward_per_sell FROM events WHERE id = $1;
        `,[event_id]);

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
        }

        const url = process.env.LUMX_API_URL + "/transactions/mints";

        const responseLumx = await fetch(url, options);
        const responseJson = await responseLumx.json();
        console.log(responseJson);

        res.status(200).send({
            "tx_id": responseJson
        });


    } catch(err){
        console.log(err);
        res.status(500).send({
            "error": "Internal Server Error"
        });
    }
}