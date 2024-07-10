import { Router } from "express"
import { createProduct,getProducts,getProductById } from "./handlers/products.js"
import {body,param} from 'express-validator'
import { handleInputErrors } from "./middleware/index.js"

//routing
//validamos con express validator
//rutas de mi app
const router = Router()

router.get('/',getProducts)

router.get('/:id',param('id').isInt().withMessage('ID no es valido'),handleInputErrors,getProductById)
router.post('/',   
     body("name").notEmpty().withMessage("El nombre del producto no puedo ir vacio"),
     body("price").isNumeric().withMessage('Valor no valido').notEmpty().withMessage("El precio del producto no puedo ir vacio")
    .custom(value => value > 0),
    handleInputErrors,
    createProduct)

router.put('/',(req,res)=>{
    res.json('Desde put')
})

router.delete('/',(req,res)=>{
    res.json('Desde delete')
})
export default router