import { Request, Response } from "express";


export async function getBalanceByWalletId(req: Request, res: Response) {
    try{

        const { walletId } = req.params;

        if(!walletId) {
            return res.status(400).send({
                "error": "WalletId is required"
            })
        }

        const options = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${process.env.LUMX_API_KEY}`,
            },
        }

        const url = process.env.LUMX_API_URL + "/wallets/" + walletId;
        const responseLumx = await fetch(url, options);
        const  responseJson = await responseLumx.json();

    
        if(!("tokens" in responseJson)) {
            return res.status(400).send({
                "error": "WalletId not found"
            })
        }
        let balance = 0;


        for(let i = 0; i < responseJson.tokens.length; i++) {
            if(String(responseJson.tokens[i].contractAddress).toLowerCase() === String(process.env.TOKEN_ADDRESS).toLowerCase()) {
                balance = responseJson.tokens[i].quantity/(Math.pow(10, 18));
                break;
            }
            return res.status(400).send({
                "error": "Token not found"
            })
        }
        

        res.status(200).send({
            "balance": balance
        });



    } catch(err) {
        console.log(err);
        res.status(500).send({
            "error": "Internal Server Error"
        });
    }
}

export async function withdraw(req: Request, res: Response) {
    try{

        const { wallet_id, amount } = req.body;

        if(!wallet_id || !amount) {
            return res.status(400).send({
                "error": "Bad Request"
            })
        }

        const options = {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${process.env.LUMX_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "contractId": process.env.TOKEN_ID,
                "from": wallet_id,
                "to": process.env.TREASURY_ADDRESS,
                "quantity": amount,
            })
        }

        const url = process.env.LUMX_API_URL + "/transactions/transfers";

        const responseLumx = await fetch(url, options);
        const responseJson = await responseLumx.json();
        

        res.status(200).send({
            "tx_id": responseJson
        });

    } catch(err) {
        console.log(err);
        res.status(500).send({
            "error": "Internal Server Error"
        });
    }
}