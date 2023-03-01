import { Request, Response } from "express";  
import { validationResult } from "express-validator";
import { Inventory } from "../models/inventory.model";

export const createInventory = (req:Request, res:Response) => {
  const inventory = req.body
  const errors = validationResult(req)

  if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

  Inventory.create(inventory)
    .then((data) => {
      // console.log(data)
      res.status(201).json({msg: data.dataValues})
    }).catch((err) => {
      // console.log(err)
      res.status(500).json({msg: err})
    })
}

export const getInvetories =  (req:Request, res:Response) => {
  const limit: number = parseInt(req.query.limit as string) || 20
  const skip: number = parseInt(req.query.skip as string) || 0
  const location: string = req.query.location?.toString() || ""
  let filter: object

  if(location) filter = { location }
  else filter = {}

  Inventory.findAll({
    limit,
    offset: skip,
    where: { ...filter }
  })
  .then((data) => {
    // console.log(data)
    res.status(200).json({data})
  }).catch((err) => {
    // console.log(err)
    res.status(500).json({msg: err})
  })
}

export const deleteInventory =  (req:Request, res:Response) => {
  const inventoryID = req.params.inventoryID
  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
  
  Inventory.destroy({
    where: { id: inventoryID }
  })
  .then((data) => {
    // console.log(data)
    if(data===0) return res.status(400).json({msg: "inventory not found"})
    res.status(200).json({msg: "inventory deleted successfully"})
  })
  .catch((err) => {
    // console.log(err)
    res.status(500).json({msg: err})
  })
}