import { Request, Response } from "express";
import connection from "../db";



export async function signin(req: Request, res: Response) {
  try{
    //get body from request
    const { email, name} = req.body;
    if(!email){
      res.status(400).send({
        "error": "Bad Request"
      });
      return;
    }

    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.LUMX_API_KEY}`,
        }
    }

    const url = process.env.LUMX_API_URL + "/wallets";

    const responseLumx = await fetch(url, options);
    const responseJson = await responseLumx.json();

    const walletId = responseJson.id;
    const walletAddress = responseJson.address;

    //generate a random code with 8 characters
    const referralCode = Math.random().toString(36).substring(2, 10);

    await connection.query(`
      INSERT INTO influencers(
        name, email, wallet_id, wallet_address, referral_code
      ) VALUES (
        $1, $2, $3, $4, $5
    `,[name, email, walletId, walletAddress, referralCode]);


    res.status(200).send({
        "wallet_id": walletId,
        "wallet_address": walletAddress,
        "referral_code": referralCode
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
        "error": "Internal Server Error"
    });
  }
}