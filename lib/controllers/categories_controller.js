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
exports.updateCategories = exports.deleteCategories = exports.createCategories = exports.getCategoriesById = exports.getCategories = void 0;
const db_connect_1 = __importDefault(require("../database/db_connect"));
/**
 * Get All Data of Categories Table.
 * @param req
 * @param res
 * @returns Categories
 */
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM categories ORDER BY category_id;');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getCategories = getCategories;
/**
 * Get all data of categories table by id
 * @param req
 * @param res
 * @returns Categories by id
 */
const getCategoriesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield db_connect_1.default.query('SELECT * FROM categories WHERE category_id = $1', [id]);
        return res.json(response.rows);
    }
    catch (error) {
        console.error(console);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getCategoriesById = getCategoriesById;
/**
 * Create a new categorie.
 * @param req
 * @param res
 * @returns
 */
const createCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body);
    const { categoryId, categoryName, categoryDescription } = req.body;
    // console.log(categoryId, categoryName, categoryDescription);
    if (categoryId !== null && categoryName !== null && categoryDescription !== null && categoryDescription !== undefined) {
        try {
            yield db_connect_1.default.query('INSERT INTO categories (category_id, category_name, description) values ($1, $2, $3)', [categoryId, categoryName, categoryDescription]);
            return res.status(201).json({
                message: 'Category created successfully',
                category: {
                    categoryId,
                    categoryName,
                    categoryDescription,
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
exports.createCategories = createCategories;
/**
 * Delete Categories by id
 * @param req
 * @param res
 * @returns
 */
const deleteCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleteCategories = deleteCategories;
/**
 * Update Categories by Id
 * @param req
 * @param res
 * @returns
 */
const updateCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.updateCategories = updateCategories;
