import {Request,Response} from 'express'
import Product from '../models/Product.model.js'
//mis acciones
//intentamos mantener solo el codigo que interactue con la dn
//obtener por id
export const getProductById = async(req:Request,res:Response)=>{
    try {
       console.log(req.params.id);
       const {id} = req.params
       const product = await Product.findByPk(id)
       if(!product){
        return res.status(404).json({
            error:'Producto No Encontrado'
        })
       }

       res.json({data:product})
       
    } catch (error) {
        console.log(error);
    }
}
//obtener todos los productos
export const getProducts = async(req:Request,res:Response)=>{
    try {
        const products = await Product.findAll({
            order:[
                ['price','DESC']
            ]
        })
        res.json({data:products})
    } catch (error) {
        console.log(error);
    }
}
//crear el producto
export const createProduct = async(req:Request,res:Response)=>{
    try {
        //creamos el producto en la db
    const product = await Product.create(req.body)
    //regresamos el producto creado
    res.json({data:product})
        
    } catch (error) {
        console.log(error);
        
    }
}