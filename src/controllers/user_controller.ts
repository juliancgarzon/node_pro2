import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../database/db_connect";


require("dotenv").config();

export const generateToken = async(req: Request, response: Response): Promise <Response> => {
    const usuario = req.body.username;
    const contraseña = req.body.password;
    const query = await pool.query('SELECT * FROM user_login WHERE usuario = $1 AND contraseña = $2', [usuario, contraseña]);
    const user = query.rows[0];
    if (query.rowCount !== null  && query.rowCount > 0){
    const accessToken = jwt.sign(user, `${process.env.CLAVE_JWT}`, {expiresIn: "1h",});
    return response.status(200).json({ accessToken });
    } else {
    return response.status(400).json('User Not found');
    }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const {userName, password, email} = req.body;
    if (userName !== null && password !== null && email !== null){
        try {
            await pool.query('INSERT INTO users (username, password, email) values ($1, $2, $3)',
                [userName, password, email]
            );
            return res.status(201).json({
                message: 'User created successfully',
                category: {
                    userName,
                    email,
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


