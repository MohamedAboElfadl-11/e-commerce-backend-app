import mongoose from "mongoose";

const database_connection = () => {
    try {
        mongoose.connect(process.env.DB_URL)
        console.log(`database connected successfully ✅`)
    } catch (error) {
        console.log(error, `faild to connect to database ❌`)
    }
}

export default database_connection