import {Request,Response} from 'express'
import {check, validationResult} from 'express-validator'
import Product from '../models/Product.model.js'
export const createProduct = async(req:Request,res:Response)=>{
    //validacion de los campos con express validator
    await check("name").notEmpty().withMessage("El nombre del producto no puedo ir vacio").run(req)
    await check("price")
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage("El precio del producto no puedo ir vacio")
    .custom(value => value > 0).run(req)


    let erros = validationResult(req)
    //verificamos si hay errores
    if(!erros.isEmpty()){
        return res.status(400).json({errors:erros.array()})
    }
    //creamos el producto en la db
    const product = await Product.create(req.body)
    //regresamos el producto creado
    res.json({data:product})
}