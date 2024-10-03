import express, { Router }  from 'express';
//import pool from './database/db_connect';
import { createCategories, deleteCategories, getCategories, getCategoriesById, updateCategories } from "./controllers/categories_controller";
import { authenticateToken, generateToken } from './controllers/user_controller';

require('dotenv').config();

const app = express();
const port = process.env.PORT;



const categoriesRoutes = Router();
const userRoutes= Router();
categoriesRoutes.get('/categories',authenticateToken,getCategories);
categoriesRoutes.get('/categories/:id',authenticateToken,getCategoriesById);
categoriesRoutes.post('/createcategories',authenticateToken,createCategories);
categoriesRoutes.delete('/deleteCategories/:id',authenticateToken,deleteCategories);
categoriesRoutes.put('/updatecategories/:id',authenticateToken,updateCategories);


/*app.get('/',async (req, res) => {
    //const query ='select * from employees;';
    //const response = await pool.query(query);
    //console.log(response);
    res.send('hola mundo jejejeje ');
});*/
userRoutes.post('/api/login',generateToken);


app.use(express.json());
app.use(categoriesRoutes);
app.use(userRoutes); 

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
});