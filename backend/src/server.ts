import dotenv from "dotenv"
import {connectDB} from "./config/db"

dotenv.config()

import app from "./app"


const PORT = process.env.PORT || "5001"

// Connect to database
connectDB()

app.listen(PORT, ()=> {
    console.log(`Server running on port: ${PORT}`);
})