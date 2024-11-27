import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../database/db_connect";


/**
 * post all data of reporte_vehiculos 
 * @param req 
 * @param res 
 * @returns reporte_vehiculos by id
 */

export const createReporteVehiculos = async (req: Request, res: Response): Promise<Response> => {
    const {
        id_usuario,
        tipo_hurto,
        numero_placa,
        color,
        modelo,
        kilometraje,
        otros_datos,
        descripcion_hurto,
        fecha,
        hora,
        direccion,
        latitud,
        longitud
    } = req.body;

    // Validar que los campos requeridos estén presentes
    if (
        id_usuario &&
        tipo_hurto &&
        fecha &&
        hora &&
        direccion &&
        latitud &&
        longitud
    ) {
        const client = await pool.connect(); // Conexión a la base de datos
        try {
            // Iniciar una transacción
            await client.query('BEGIN');

            // Inserción en la tabla reporte_vehiculos
            const insertQuery = `
                INSERT INTO reporte_vehiculos (
                    id_usuario, tipo_hurto, numero_placa, color, modelo, kilometraje, 
                    otros_datos, descripcion_hurto, fecha, hora, direccion, latitud, longitud
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            `;

            const values = [
                id_usuario,
                tipo_hurto,
                numero_placa || null, // Maneja valores opcionales
                color || null,
                modelo || null,
                kilometraje || null,
                otros_datos || null,
                descripcion_hurto || null,
                fecha,
                hora,
                direccion,
                latitud,
                longitud
            ];

            await client.query(insertQuery, values);

            // Confirmar la transacción
            await client.query('COMMIT');

            // Respuesta exitosa
            return res.status(201).json({
                message: 'Reporte creado exitosamente',
                reporte: {
                    id_usuario,
                    tipo_hurto,
                    numero_placa,
                    color,
                    modelo,
                    kilometraje,
                    otros_datos,
                    descripcion_hurto,
                    fecha,
                    hora,
                    direccion,
                    latitud,
                    longitud
                }
            });
        } catch (error) {
            // Deshacer la transacción en caso de error
            await client.query('ROLLBACK');
            console.error(error);
            return res.status(500).json('Error interno del servidor');
        } finally {
            client.release(); // Liberar el cliente
        }
    } else {
        // Respuesta si faltan campos requeridos
        return res.status(400).json('Solicitud incorrecta: faltan campos requeridos');
    }
};