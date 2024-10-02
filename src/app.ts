import express, { Router }  from 'express';
import pool from './database/db_connect';
import { getCategories } from "./controllers/categories_controller";

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const categoriesRoutes = Router();

categoriesRoutes.get('/categories',getCategories);

/*app.get('/',async (req, res) => {
    //const query ='select * from employees;';
    //const response = await pool.query(query);
    //console.log(response);
    res.send('hola mundo jejejeje ');
});*/

app.use(categoriesRoutes);

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
});