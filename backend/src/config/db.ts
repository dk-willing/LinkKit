import mongoose from "mongoose"

import dotenv from "dotenv"

dotenv.config()

const DB = process.env.DB_URL?.replace('<db_password>', process.env.DB_PASSWORD!)

export const connectDB = async () => {
    try {
        await mongoose.connect(DB!)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error while connecting to database",error)
    }
}