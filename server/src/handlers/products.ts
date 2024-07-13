import {Request,Response} from 'express'
import Product from '../models/Product.model'
//mis acciones
//intentamos mantener solo el codigo que interactue con la dn
//obtener por id
export const getProductById = async(req:Request,res:Response)=>{
    console.log(req.params.id);
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product){
     return res.status(404).json({
         error:'Producto No Encontrado'
     })
    }

    res.json({data:product})
    // try {
    //    console.log(req.params.id);
    //    const {id} = req.params
    //    const product = await Product.findByPk(id)
    //    if(!product){
    //     return res.status(404).json({
    //         error:'Producto No Encontrado'
    //     })
    //    }

    //    res.json({data:product})
       
    // } catch (error) {
    //     console.log(error);
    // }
}
//obtener todos los productos
export const getProducts = async(req:Request,res:Response)=>{
    const products = await Product.findAll({
        order:[
            ['price','DESC']
        ]
    })
    res.json({data:products})
    // try {
    //     const products = await Product.findAll({
    //         order:[
    //             ['price','DESC']
    //         ]
    //     })
    //     res.json({data:products})
    // } catch (error) {
    //     console.log(error);
    // }
}
//crear el producto
export const createProduct = async(req:Request,res:Response)=>{
            //creamos el producto en la db
            const product = await Product.create(req.body)
            //regresamos el producto creado
            res.status(201).json({data:product})
    // try {
    //     //creamos el producto en la db
    // const product = await Product.create(req.body)
    // //regresamos el producto creado
    // res.status(201).json({data:product})
        
    // } catch (error) {
    //     console.log(error);
        
    // }
}
//actalizar el producto
export const updateProduct = async (req:Request,res:Response)=>{
    const {id} = req.params    
    const product = await Product.findByPk(id)
    if(!product){
     return res.status(404).json({
         error:'Producto No Encontrado'
     })
    }

    //actualizar el producto entero
    await product.update(req.body)
    await product.save()
    res.json({data:product})
}
//modificar el producto con patch
export const updateAvailabilit = async (req:Request,res:Response)=>{
    const {id} = req.params    
    const product = await Product.findByPk(id)
    if(!product){
     return res.status(404).json({
         error:'Producto No Encontrado'
     })
    }

    //modificar
   //cambiamos solo el estado del producto cada vez que se envie una peticion
   product.availability= !product.dataValues.availability
    await product.save()
    res.json({data:product})
}
//eliminar
export const deleteProduct = async (req:Request,res:Response)=>{
    const {id} = req.params    
    const product = await Product.findByPk(id)
    if(!product){
     return res.status(404).json({
         error:'Producto No Encontrado'
     })
    }
    await product.destroy()
    res.json({data:'Producto eliminado'})
    
}

