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
            );
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

export async function getEvents(req: Request, res: Response) {
    try{
        const events = await connection.query(`
            SELECT * FROM events;
        `);

        res.status(200).send({
            "events": events.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            "error": "Internal Server Error"
        });
    }
}

export async function getEventById(req: Request, res: Response) {
    try{
        const { id } = req.params;

        const events = await connection.query(`
            SELECT * FROM events WHERE id = $1;
        `,[id]);

        res.status(200).send({
            "event": events.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            "error": "Internal Server Error"
        });
    }
}