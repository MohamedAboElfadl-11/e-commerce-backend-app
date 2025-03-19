import express from 'express'
import { config } from 'dotenv';
import path from 'path';
import database_connection from './Database/database_connection.js';
import controllerHandler from './Utils/routerHundler.js';

if (process.env.NODE_ENV === 'dev')
    config({ path: path.resolve('src/Config/.dev.env') });
config()

const bootstrap = function (){
    const app = express()
    const PORT = process.env.PORT;
    database_connection()
    app.use(express.json())
    controllerHandler(app)
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })
}

export default bootstrap