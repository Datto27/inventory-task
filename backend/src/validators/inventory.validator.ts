import { body, check, param, validationResult } from "express-validator"

export const createInventoryValidator = [
  body("location")
    .isString().withMessage("location must be a string")
    .isIn(["მთავარი ოფისი", "კავეა გალერია", "კავეა თბილისი მოლი", "კავეა ისთ ფოინთი", "კავეა სითი მოლი"])
      .withMessage("location must be one of them 'მთავარი ოფისი', 'კავეა გალერია', 'კავეა თბილისი მოლი', 'კავეა ისთ ფოინთი', 'კავეა სითი მოლი'"),
  body("name").isString().withMessage("name must be a string").trim(),
  body("price").isNumeric().withMessage("price must be a number").trim()
]

export const deleteInventoryValidator = [
  param("inventoryID").isNumeric().withMessage("id must be a number")
]