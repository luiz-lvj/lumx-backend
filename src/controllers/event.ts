import { Request, Response } from "express";
import connection from "../db";



export async function  createEvent(req: Request, res: Response) {
    try{

        const {name, description, date, reward_per_sell} = req.body;
        if(!name || !description || !date || !reward_per_sell){
            res.status(400).send({
                "error": "Bad Request"
            });
            return;
        }

        await connection.query(`
            INSERT INTO events(
                name, description, date, reward_per_sell
            ) VALUES (
                $1, $2, $3, $4
            )
        `,[name, description, date, reward_per_sell]);

        return res.status(201).send({
            "status": "Event created"
        });


    } catch (error) {
        console.error(error);
        res.status(500).send({
            "error": "Internal Server Error"
        });
    }
}