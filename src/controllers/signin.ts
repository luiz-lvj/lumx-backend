import { Request, Response } from "express";
import connection from "../db";


export async function signin(req: Request, res: Response) {
    try{
            
        const {email, password} = req.body;

        if(!email) {
            return res.status(400).send({
                "error": "Email is required"
            })
        }

        const influencers = await connection.query(`
            SELECT * FROM influencers WHERE email = $1;
        `,[email]);
        
        if(influencers.rows.length === 0) {
            return res.status(404).send({
                "error": "Email not found"
            })
        }

        const influencer = influencers.rows[0];

        if(influencer.password !== password) {
            return res.status(401).send({
                "error": "Unauthorized"
            })
        }

        res.status(200).send({
            "name": influencer.name,
            "email": influencer.email,
            "wallet_id": influencer.wallet_id,
            "wallet_address": influencer.wallet_address,
            "referral_code": influencer.referral_code
        });


    
            
        
    } catch(err){
        console.log(err);
        res.status(500).send({
            "error": "Internal Server Error"
        });
    }
}