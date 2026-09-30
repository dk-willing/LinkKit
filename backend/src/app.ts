import express from "express"
import cors from "cors"


const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))



export default app