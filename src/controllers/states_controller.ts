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
/**
 * Get all data of us_states table by id
 * @param req 
 * @param res 
 * @returns us_states by id
 */
export const getus_statesById = async (req:Request, res:Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    try {
        const response: QueryResult= await pool.query('SELECT * FROM us_states WHERE state_id = $1', [id]);
        return res.json (response.rows);
    } catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error' );
    }
}

/**
 * Create a new us_states.
 * @param req 
 * @param res 
 * @returns us_states
 */

export const createState = async (req: Request, res: Response): Promise<Response> => {
    
    const {state_id, state_name, state_abbr,state_region} = req.body;

    if (state_id!== null && state_name!== null && state_abbr!== null && state_region !== null){
        try {
            await pool.query('INSERT INTO us_states (state_id, state_name, state_abbr,state_region) values ($1, $2, $3,$4)',
                [state_id, state_name, state_abbr,state_region]
            );
            return res.status(201).json({
                message: 'State created successfully',
                category: {
                    state_id,
                    state_name,
                    state_abbr,
                    state_region,
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    } else {
        return res.status(500).json('Internal Server Error');
    }
};
/**
 * Delete States by id
 * @param req 
 * @param res 
 * @returns 
 */

export const deleteStates = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM us_states WHERE state_id = $1', [id]);
        return res.status(200).json(`The state ${id} delete successfully.`);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

/**
 * Update States by Id
 * @param req 
 * @param res 
 * @returns 
 */

export const updateStates = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const {state_name, state_abbr,state_region} = req.body;

    try {
        await pool.query('UPDATE us_states SET state_name = $1, state_abbr = $2, state_region = $3 WHERE state_id = $4',
            [state_name,state_abbr,state_region,id]
        );

        return res.json({
            message: 'State Successfully Updated.',
            category: {
                id,
                state_name,
                state_abbr,
                state_region,

            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }

};  
/**
 * Update States by Id
 * @param req 
 * @param res 
 * @returns 
 */