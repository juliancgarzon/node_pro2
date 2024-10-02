import { QueryResult } from "pg";
import pool from "../database/db_connect";
import { Request,Response } from "express";

export const getCategories = async (req:Request, res:Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('SELECT * FROM categories;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(console);
        return res.status(500).json('Internal Server Error' );
    }

    
};