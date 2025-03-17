import express from 'express'
import { config } from 'dotenv';
import path from 'path';
import database_connection from './Database/database_connection.js';

if (process.env.NODE_ENV === 'dev')
    config({ path: path.resolve('src/Config/.dev.env') });
config()

const bootstrap = function (){
    const app = express()
    const PORT = process.env.PORT;
    database_connection()
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })
}

export default bootstrap