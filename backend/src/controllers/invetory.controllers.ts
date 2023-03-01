import { Request, Response } from "express";  
import { validationResult } from "express-validator";

export const createInventory =  (req:Request, res:Response) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

  res.status(200).json()
}

export const getInvetories =  (req:Request, res:Response) => {
  const limit: number = parseInt(req.query.limit as string) || 20
  const skip: number = parseInt(req.query.skip as string) || 20
  const location: string = ""


  res.status(200).json()
}

export const deleteInventory =  (req:Request, res:Response) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
  
  res.status(200).json()
}