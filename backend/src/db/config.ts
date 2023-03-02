import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
dotenv.config()
import { Inventory } from "../models/inventory.model"


const connect = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "",
  port: parseInt(process.env.DB_PORT as string) || 5432,
  logging: false,
  models: [Inventory]
})

export default connect