import { QueryResult } from "pg";
import pool from "../database/db_connect";
import { Request,Response } from "express";

/**
 * Get All Data of us_states Table.
 * @param req 
 * @param res 
 * @returns us_states
 */
export const getus_states = async (req:Request, res:Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('SELECT * FROM us_states;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error' );
    }

};
