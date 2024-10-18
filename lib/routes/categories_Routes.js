"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories_controller");
exports.categoriesRoutes = (0, express_1.Router)();
exports.categoriesRoutes.get('/categories', categories_controller_1.getCategories);
exports.categoriesRoutes.get('/categories/:id', categories_controller_1.getCategoriesById);
exports.categoriesRoutes.post('/createcategories', categories_controller_1.createCategories);
exports.categoriesRoutes.delete('/deleteCategories/:id', categories_controller_1.deleteCategories);
exports.categoriesRoutes.put('/updatecategories/:id', categories_controller_1.updateCategories);