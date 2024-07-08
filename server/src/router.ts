import { Router } from "express"
import { createProduct } from "./handlers/products.js"
//routing
//rutas de mi app
const router = Router()
router.get('/',(req,res)=>{

    res.json('Desde GET')
})
router.post('/',createProduct)

router.put('/',(req,res)=>{

    res.json('Desde put')
})

router.delete('/',(req,res)=>{

    res.json('Desde delete')
})
export default router