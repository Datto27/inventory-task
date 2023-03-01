import { Request, Response, Router } from "express"
import { body } from "express-validator"
import { createInventory, deleteInventory, getInvetories } from "../controllers/invetory.controllers"
import { createInventoryValidator, deleteInventoryValidator } from "../validators/inventory.validator"

const router = Router()

router.get("/", getInvetories)

router.post("/",
  createInventoryValidator,
  createInventory
)

router.delete("/:inventoryID", deleteInventoryValidator, deleteInventory)


export default router