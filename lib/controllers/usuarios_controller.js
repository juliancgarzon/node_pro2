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
exports.updateusers = exports.deleteusers = exports.createusers = exports.getusersById = exports.getusers = void 0;
const db_connect_1 = __importDefault(require("../database/db_connect"));
const moment_1 = __importDefault(require("moment"));
/**
 * Get All Data of usuarios Table.
 * @param req
 * @param res
 * @returns usuarios
 */
const getusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM usuarios ORDER BY id_register;');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getusers = getusers;
/**
 * Get all data of usuarios table by id
 * @param req
 * @param res
 * @returns usuarios by id
 */
const getusersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM usuarios WHERE id_register = $1', [id]);
        return res.json(response.rows);
    }
    catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getusersById = getusersById;
/**
 * Create a new usuarios.
 * @param req
 * @param res
 * @returns
 */
const createusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, ciudad, fecha_de_nacimiento, email, usuario, contraseña } = req.body;
    //console.log("Datos recibidos:", req.body);
    if (nombre && apellido && ciudad && fecha_de_nacimiento && email && usuario && contraseña) {
        const client = yield db_connect_1.default.connect(); // Usamos un cliente para manejar la transacción
        try {
            // Usar moment.js para reformatear la fecha
            const formattedDate = (0, moment_1.default)(fecha_de_nacimiento, 'DD/MM/YYYY').format('YYYY-MM-DD');
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
            yield client.query('BEGIN');
            // Inserción en la tabla usuarios
            yield client.query('INSERT INTO usuarios (nombre, apellido, ciudad, fecha_de_nacimiento, email, usuario, contraseña) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nombre, apellido, ciudad, formattedDate, email, usuario, contraseña]);
            // Inserción en la tabla user_login
            yield client.query('INSERT INTO user_login (usuario, contraseña) VALUES ($1, $2)', [usuario, contraseña]);
            // Si todo sale bien, confirmamos la transacción
            yield client.query('COMMIT');
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
        }
        catch (error) {
            // Si ocurre algún error, deshacemos la transacción
            yield client.query('ROLLBACK');
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
        finally {
            client.release(); // Liberamos el cliente de la conexión
        }
    }
    else {
        return res.status(400).json('Bad Request: Missing required fields');
    }
});
exports.createusers = createusers;
/**
 * Delete usuarios by id
 * @param req
 * @param res
 * @returns
 */
const deleteusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield db_connect_1.default.query('DELETE FROM categories WHERE category_id = $1', [id]);
        return res.status(200).json(`The categorie ${id} delete successfully.`);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.deleteusers = deleteusers;
/**
 * Update usuarios by Id
 * @param req
 * @param res
 * @returns
 */
const updateusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { categoryName, categoryDescription } = req.body;
    try {
        yield db_connect_1.default.query('UPDATE categories SET category_name = $1, description = $2 WHERE category_id = $3', [categoryName, categoryDescription, id]);
        return res.json({
            message: 'Category Successfully Updated.',
            category: {
                id,
                categoryName,
                categoryDescription,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.updateusers = updateusers;
