import { Sequelize } from "sequelize-typescript"
import { Inventory } from "../models/inventory.model"


const connect = new Sequelize({
  dialect: "postgres",
  host: "containers-us-west-80.railway.app",
  username: "postgres",
  password: "x7C79QWTl2d7PGrsBw5O",
  database: "railway",
  port: 7928,
  logging: false,
  models: [Inventory]
})

export default connect