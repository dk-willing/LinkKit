import express from "express"
import cors from "cors"
import urlRoute from "./routes/url.routes"

const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))


app.use('/api/v1', urlRoute)


export default app