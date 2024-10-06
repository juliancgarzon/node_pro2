import { Router } from "express";
import { createUser, generateToken } from "../controllers/user_controller";

export const userRoutes= Router();
userRoutes.post('/api/login',generateToken);
userRoutes.post('/user/register',createUser);