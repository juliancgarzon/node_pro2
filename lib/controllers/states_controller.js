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
exports.updateStates = exports.deleteStates = exports.createState = exports.getus_statesById = exports.getus_states = void 0;
const db_connect_1 = __importDefault(require("../database/db_connect"));
/**
 * Get All Data of us_states Table.
 * @param req
 * @param res
 * @returns us_states
 */
const getus_states = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM us_states;');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getus_states = getus_states;
/**
 * Get all data of us_states table by id
 * @param req
 * @param res
 * @returns us_states by id
 */
const getus_statesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM us_states WHERE state_id = $1', [id]);
        return res.json(response.rows);
    }
    catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getus_statesById = getus_statesById;
/**
 * Create a new us_states.
 * @param req
 * @param res
 * @returns us_states
 */
const createState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state_id, state_name, state_abbr, state_region } = req.body;
    if (state_id !== null && state_name !== null && state_abbr !== null && state_region !== null) {
        try {
            yield db_connect_1.default.query('INSERT INTO us_states (state_id, state_name, state_abbr,state_region) values ($1, $2, $3,$4)', [state_id, state_name, state_abbr, state_region]);
            return res.status(201).json({
                message: 'State created successfully',
                category: {
                    state_id,
                    state_name,
                    state_abbr,
                    state_region,
                }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    }
    else {
        return res.status(500).json('Internal Server Error');
    }
});
exports.createState = createState;
/**
 * Delete States by id
 * @param req
 * @param res
 * @returns
 */
const deleteStates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield db_connect_1.default.query('DELETE FROM us_states WHERE state_id = $1', [id]);
        return res.status(200).json(`The state ${id} delete successfully.`);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.deleteStates = deleteStates;
/**
 * Update States by Id
 * @param req
 * @param res
 * @returns
 */
const updateStates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { state_name, state_abbr, state_region } = req.body;
    try {
        yield db_connect_1.default.query('UPDATE us_states SET state_name = $1, state_abbr = $2, state_region = $3 WHERE state_id = $4', [state_name, state_abbr, state_region, id]);
        return res.json({
            message: 'State Successfully Updated.',
            category: {
                id,
                state_name,
                state_abbr,
                state_region,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.updateStates = updateStates;
/**
 * Update States by Id
 * @param req
 * @param res
 * @returns
 */ 
