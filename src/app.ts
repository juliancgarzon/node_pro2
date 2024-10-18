import express, { Router }  from 'express';
import { errorHandler } from './middleware/error';
import { usuariosRoutes } from './routes/usuarios_Routes';
import cors from "cors";
import { userRoutes } from './routes/user_routes';


require('dotenv').config();

const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(usuariosRoutes);
app.use(userRoutes); 


app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
});