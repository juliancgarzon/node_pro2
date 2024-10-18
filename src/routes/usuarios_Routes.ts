import { Router } from "express";
import { getusers,getusersById,createusers,deleteusers,updateusers } from "../controllers/usuarios_controller";
import { authenticateToken } from "../middleware/authorization";

export const usuariosRoutes = Router();

usuariosRoutes.get('/users',getusers);
usuariosRoutes.get('/users/:id',getusersById);
usuariosRoutes.post('/createusers',createusers);
usuariosRoutes.delete('/deleteusers/:id',deleteusers);
usuariosRoutes.put('/updateusers/:id',updateusers);