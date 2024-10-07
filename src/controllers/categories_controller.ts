import { QueryResult } from "pg";
import pool from "../database/db_connect";
import { Request,Response } from "express";

/**
 * Get All Data of Categories Table.
 * @param req 
 * @param res 
 * @returns Categories
 */
export const getCategories = async (req:Request, res:Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('SELECT * FROM categories ORDER BY category_id;');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error' );
    }

};

/**
 * Get all data of categories table by id
 * @param req 
 * @param res 
 * @returns Categories by id
 */
export const getCategoriesById = async (req:Request, res:Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    try {
        const response: QueryResult= await pool.query('SELECT * FROM categories WHERE category_id = $1', [id]);
        return res.json (response.rows);
    } catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error' );
    }
}
/**
 * Create a new categorie.
 * @param req 
 * @param res 
 * @returns 
 */

export const createCategories = async (req: Request, res: Response): Promise<Response> => {
    //console.log(req.body);
    const {categoryId, categoryName, categoryDescription} = req.body;

   // console.log(categoryId, categoryName, categoryDescription);

    if (categoryId !== null && categoryName !== null && categoryDescription !== null && categoryDescription !== undefined){
        try {
            await pool.query('INSERT INTO categories (category_id, category_name, description) values ($1, $2, $3)',
                [categoryId, categoryName, categoryDescription]
            );
            return res.status(201).json({
                message: 'Category created successfully',
                category: {
                    categoryId,
                    categoryName,
                    categoryDescription,
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
 * Delete Categories by id
 * @param req 
 * @param res 
 * @returns 
 */

export const deleteCategories = async (req: Request, res: Response): Promise<Response> => {
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
 * Update Categories by Id
 * @param req 
 * @param res 
 * @returns 
 */

export const updateCategories = async (req: Request, res: Response): Promise<Response> => {
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