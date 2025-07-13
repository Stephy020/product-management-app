import express from 'express'
import dotenv from "dotenv"
import productRoute from './routes/productRoute.js'

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use("/products", productRoute)

app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`))