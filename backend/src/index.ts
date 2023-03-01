import express, { Express } from "express";
import cors from "cors"
import bodyParser from "body-parser"
import connect from "./db/config";
import InventoryRoutes from "./routes/inventory.routes"

// config
const app = express()
const PORT = process.env.PORT || 8080
connect.sync().then(() => {
  console.log("db connected")
}).catch((err) => {
  console.log("db error: ", err)
})

// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

// routes
app.get("/", (req, res) => res.json({msg: "welcome!"}))
app.use("/inventories", InventoryRoutes)


app.listen(PORT, () => {
  console.info(`running on ${PORT} port`)
})