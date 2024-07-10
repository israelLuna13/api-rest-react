import { Request,Response,NextFunction } from "express";
import {validationResult} from 'express-validator'

export const handleInputErrors = (req:Request,res:Response,next:NextFunction)=>{
    //validacion de los campos con express validator
    let erros = validationResult(req)
    //verificamos si hay errores
    if(!erros.isEmpty()){
        return res.status(400).json({errors:erros.array()})
    }    next()
}