"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRoutes = void 0;
const express_1 = require("express");
const report_controllers_1 = require("../controllers/report_controllers");
exports.reportRoutes = (0, express_1.Router)();
exports.reportRoutes.post('/report/vehicle', report_controllers_1.createReporteVehiculos);
