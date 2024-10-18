import { QueryResult } from "pg";
import pool from "../database/db_connect";
import { Request,Response } from "express";
import moment from 'moment';

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
    const { nombre, apellido, ciudad, fecha_de_nacimiento, email, usuario, contraseña } = req.body;
    //console.log("Datos recibidos:", req.body);
    if (nombre && apellido && ciudad && fecha_de_nacimiento && email && usuario && contraseña) {
        const client = await pool.connect(); // Usamos un cliente para manejar la transacción
        try {
            // Usar moment.js para reformatear la fecha
            const formattedDate = moment(fecha_de_nacimiento, 'DD/MM/YYYY').format('YYYY-MM-DD');
            /*console.log("Datos después de formatear la fecha:", {
                nombre,
                apellido,
                ciudad,
                fecha_de_nacimiento: formattedDate,
                email,
                usuario,
                contraseña
            });*/

            // Iniciar la transacción
            await client.query('BEGIN');

            // Inserción en la tabla usuarios
            await client.query(
                'INSERT INTO usuarios (nombre, apellido, ciudad, fecha_de_nacimiento, email, usuario, contraseña) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [nombre, apellido, ciudad, formattedDate, email, usuario, contraseña]
            );

            // Inserción en la tabla user_login
            await client.query(
                'INSERT INTO user_login (usuario, contraseña) VALUES ($1, $2)',
                [usuario, contraseña]
            );

            // Si todo sale bien, confirmamos la transacción
            await client.query('COMMIT');

            return res.status(201).json({
                message: 'User and login information created successfully',
                user: {
                    nombre,
                    apellido,
                    ciudad,
                    fecha_de_nacimiento: formattedDate,
                    email,
                    usuario
                }
            });
        } catch (error) {
            // Si ocurre algún error, deshacemos la transacción
            await client.query('ROLLBACK');
            console.error(error);
            return res.status(500).json('Internal Server Error');
        } finally {
            client.release(); // Liberamos el cliente de la conexión
        }
    } else {
        return res.status(400).json('Bad Request: Missing required fields');
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