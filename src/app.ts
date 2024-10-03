import express, { Router }  from 'express';
//import pool from './database/db_connect';

import { generateToken } from './controllers/user_controller';

import { errorHandler } from './middleware/error';

import { us_statesRoutes } from './routes/states_routes';
import { categoriesRoutes } from './routes/categories_Routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT;
const userRoutes= Router();

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