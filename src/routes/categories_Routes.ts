import { Router } from "express";
import { getCategories, getCategoriesById, createCategories, deleteCategories, updateCategories } from "../controllers/categories_controller";
import { authenticateToken } from "../middleware/authorization";

export const categoriesRoutes = Router();

categoriesRoutes.get('/categories',getCategories);
categoriesRoutes.get('/categories/:id',getCategoriesById);
categoriesRoutes.post('/createcategories',createCategories);
categoriesRoutes.delete('/deleteCategories/:id',deleteCategories);
categoriesRoutes.put('/updatecategories/:id',updateCategories);