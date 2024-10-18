"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_1 = require("./middleware/error");
const usuarios_Routes_1 = require("./routes/usuarios_Routes");
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./routes/user_routes");
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(error_1.errorHandler);
app.use(usuarios_Routes_1.usuariosRoutes);
app.use(user_routes_1.userRoutes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
