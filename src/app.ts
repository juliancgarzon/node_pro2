import express, { Router }  from 'express';
//import pool from './database/db_connect';
import { createCategories, deleteCategories, getCategories, getCategoriesById, updateCategories } from "./controllers/categories_controller";
import { generateToken } from './controllers/user_controller';
import { authenticateToken } from './middleware/authorization';
import { errorHandler } from './middleware/error';
import { createState, deleteStates, getus_states, getus_statesById, updateStates } from './controllers/states_controller';

require('dotenv').config();

const app = express();
const port = process.env.PORT;


const us_statesRoutes =Router();
const categoriesRoutes = Router();
const userRoutes= Router();

categoriesRoutes.get('/categories',authenticateToken,getCategories);
categoriesRoutes.get('/categories/:id',authenticateToken,getCategoriesById);
categoriesRoutes.post('/createcategories',authenticateToken,createCategories);
categoriesRoutes.delete('/deleteCategories/:id',authenticateToken,deleteCategories);
categoriesRoutes.put('/updatecategories/:id',authenticateToken,updateCategories);
us_statesRoutes.get('/us_states',authenticateToken,getus_states)
us_statesRoutes.get('/us_states/:id',authenticateToken,getus_statesById);
us_statesRoutes.post('/createState',authenticateToken,createState );
us_statesRoutes.delete('/deleteState/:id',authenticateToken,deleteStates);
us_statesRoutes.put('/updateStates/:id',authenticateToken,updateStates);

/*app.get('/',async (req, res) => {
    //const query ='select * from employees;';
    //const response = await pool.query(query);
    //console.log(response);
    res.send('hola mundo jejejeje ');
});*/
userRoutes.post('/api/login',generateToken);


app.use(express.json());
app.use(errorHandler);
app.use(categoriesRoutes);
app.use(userRoutes); 
app.use(us_statesRoutes);

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
});