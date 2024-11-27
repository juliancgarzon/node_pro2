import { Router } from "express";
import { createReporteVehiculos} from "../controllers/report_controllers";

export const reportRoutes= Router();
reportRoutes.post('/report/vehicle',createReporteVehiculos);
