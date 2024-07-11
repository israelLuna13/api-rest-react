import { Router } from "express"
import { createProduct,getProducts,getProductById, updateProduct, updateAvailabilit, deleteProduct } from "./handlers/products"
import {body,param} from 'express-validator'
import { handleInputErrors } from "./middleware/index"

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

router.put('/:id', 
    param('id').isInt().withMessage('ID no es valido'),
    body("name").notEmpty().withMessage("El nombre del producto no puedo ir vacio"),
    body("price").isNumeric().withMessage('Precio no valido').notEmpty().withMessage("El precio del producto no puedo ir vacio")
    .custom(value => value > 0),
    body('availability').isBoolean().withMessage('Valor de disponibilidad no valido'),
    handleInputErrors,
    updateProduct)

router.patch('/:id',param('id').isInt().withMessage('ID no es valido'),handleInputErrors,updateAvailabilit)
router.delete('/:id',param('id').isInt().withMessage('ID no es valido'),handleInputErrors,deleteProduct)

export default router