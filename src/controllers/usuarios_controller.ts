import { QueryResult } from "pg";
import pool from "../database/db_connect";
import { Request,Response } from "express";

/**
 * Get All Data of usuarios Table.
 * @param req 
 * @param res 
 * @returns usuarios
 */
export const getusers = async (req:Request, res:Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('SELECT * FROM usuarios ORDER BY id_register;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error' );
    }

};

/**
 * Get all data of usuarios table by id
 * @param req 
 * @param res 
 * @returns usuarios by id
 */
export const getusersById = async (req:Request, res:Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    try {
        const response: QueryResult= await pool.query('SELECT * FROM usuarios WHERE id_register = $1', [id]);
        return res.json (response.rows);
    } catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error' );
    }
}
/**
 * Create a new usuarios.
 * @param req 
 * @param res 
 * @returns 
 */

export const createusers = async (req: Request, res: Response): Promise<Response> => {
    //console.log(req.body);
    const { nombre, apellido,ciudad,fecha_de_nacimiento,email,usuario,contraseña} = req.body;

   // console.log(categoryId, categoryName, categoryDescription);

    if (  nombre !== null && apellido !== null && ciudad !== null && fecha_de_nacimiento !== null && email !== null && usuario !== null && contraseña !== null){
        try {
            await pool.query('INSERT INTO usuarios (nombre, apellido,ciudad,fecha_de_nacimiento,email,usuario,contraseña) values ($1, $2, $3)',
                [nombre, apellido,ciudad,fecha_de_nacimiento,email,usuario,contraseña]
            );
            return res.status(201).json({
                message: 'Category created successfully',
                category: {
                    nombre,
                    apellido,
                    ciudad,
                    fecha_de_nacimiento,
                    email,
                    usuario,
                    contraseña
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
 * Delete usuarios by id
 * @param req 
 * @param res 
 * @returns 
 */

export const deleteusers = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM categories WHERE category_id = $1', [id]);
        return res.status(200).json(`The categorie ${id} delete successfully.`);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};

/**
 * Update usuarios by Id
 * @param req 
 * @param res 
 * @returns 
 */

export const updateusers = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const {categoryName, categoryDescription} = req.body;
    try {
        await pool.query('UPDATE categories SET category_name = $1, description = $2 WHERE category_id = $3',
            [categoryName,categoryDescription,id]
        );

        return res.json({
            message: 'Category Successfully Updated.',
            category: {
                id,
                categoryName,
                categoryDescription,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }

};