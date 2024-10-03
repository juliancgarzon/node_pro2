import { Router } from "express";
import { getCategories, getCategoriesById, createCategories, deleteCategories, updateCategories } from "../controllers/categories_controller";
import { authenticateToken } from "../middleware/authorization";

export const categoriesRoutes = Router();

categoriesRoutes.get('/categories',authenticateToken,getCategories);
categoriesRoutes.get('/categories/:id',authenticateToken,getCategoriesById);
categoriesRoutes.post('/createcategories',authenticateToken,createCategories);
categoriesRoutes.delete('/deleteCategories/:id',authenticateToken,deleteCategories);
categoriesRoutes.put('/updatecategories/:id',authenticateToken,updateCategories);