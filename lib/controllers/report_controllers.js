"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReporteVehiculos = void 0;
const db_connect_1 = __importDefault(require("../database/db_connect"));
/**
 * post all data of reporte_vehiculos
 * @param req
 * @param res
 * @returns reporte_vehiculos by id
 */
const createReporteVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, tipo_hurto, numero_placa, color, modelo, kilometraje, otros_datos, descripcion_hurto, fecha, hora, direccion, latitud, longitud } = req.body;
    // Validar que los campos requeridos estén presentes
    if (id_usuario &&
        tipo_hurto &&
        fecha &&
        hora &&
        direccion &&
        latitud &&
        longitud) {
        const client = yield db_connect_1.default.connect(); // Conexión a la base de datos
        try {
            // Iniciar una transacción
            yield client.query('BEGIN');
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
            yield client.query(insertQuery, values);
            // Confirmar la transacción
            yield client.query('COMMIT');
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
        }
        catch (error) {
            // Deshacer la transacción en caso de error
            yield client.query('ROLLBACK');
            console.error(error);
            return res.status(500).json('Error interno del servidor');
        }
        finally {
            client.release(); // Liberar el cliente
        }
    }
    else {
        // Respuesta si faltan campos requeridos
        return res.status(400).json('Solicitud incorrecta: faltan campos requeridos');
    }
});
exports.createReporteVehiculos = createReporteVehiculos;
