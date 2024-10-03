import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
//import pool from "../database/db_connect";

require("dotenv").config();

export const generateToken = (req: Request, response: Response): Response => {
    const userName = req.body.username;
  //const password = req.body.password;
  //const query = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [userName, password]);
    const user = { name: userName };
  // if (query.rowCount !== null  && query.rowCount > 0){
    const accessToken = jwt.sign(user, `${process.env.CLAVE_JWT}`, {
        expiresIn: "1h",
    });
    return response.status(200).json({ accessToken });
  //  } else {
  // return response.status(400).json('User Not found');
  //}
};

export const authenticateToken = (req: Request,res: Response,next: NextFunction) => {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Auth Token Not found" });
    }
    jwt.verify(token, `${process.env.CLAVE_JWT}`, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid Token" });
        }
    });
    next();
};
