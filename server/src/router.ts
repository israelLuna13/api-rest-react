import { Router } from "express"
import { createProduct,getProducts,getProductById, updateProduct, updateAvailabilit, deleteProduct } from "./handlers/products"
import {body,param} from 'express-validator'
import { handleInputErrors } from "./middleware/index"

//routing
//validamos con express validator
//rutas de mi app
const router = Router()
/**
 * @swagger
 * components:
 *          schemas:
 *              Product:
 *                   type: object
 *                   properties:
 *                         id:
 *                              type: integer
 *                              description: The product ID
 *                              example: 1
 *                         name:
 *                              type: string
 *                              description: The Product name
 *                              example: Monitor
 *                         price:
 *                              type: number
 *                              description: The Product price
 *                              example: 200
 * 
 *                         availability:
 *                              type: boolean
 *                              description: The Product availability
 *                              example: true
 */

/**
 *@swagger 
 * /api/products:
 *       get:   
 *            summary: Get a list of products
 *            tags:
 *                 - Products
 *            description : Return  a list of products
 *            responses: 
 *                 200: 
 *                     description: Successful response     
 *                     content:
 *                          application/json:
 *                              shema:
 *                                 type: array
 *                                 items:     
 *                                     $ref: '#/components/schemas/Product'
 */
router.get('/',getProducts)

/**
 * 
 * @swagger
 * /api/products/{id}:
 *  get:
 *     summary: Get a product by id
 *     tags:
 *         - Products     
 *     description: Return a product based on its unique ID
 *     parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the product to retrieve
 *           required: true
 *           schema:
 *              type: integer
 *     responses:
 *          200:  
 *              description: Successful response     
 *              content:
 *                   application/json:
 *                         shema:   
 *                             $ref: '#/components/schemas/Product'
 *          
 *          400:
 *              description: Bad Request - Invalid ID
 * 
 *          404:
 *              description: Not found
 * 
 *    
 */
router.get('/:id',param('id').isInt().withMessage('ID no es valido'),handleInputErrors,getProductById)


/**
 * 
 * @swagger
 * /api/products:
 *  post:
 *     summary: Create a new peoduct
 *     tags:
 *         - Products     
 *     description: Returns a new record in the database
 *     requestBody:
 *           required: true
 *           content:
 *              application/json:   
 *                      schema:
 *                            type: object
 *                            properties:
 *                                 name:
 *                                      type: string
 *                                      example: "Ipad 10 pro"
 *                                 price:
 *                                       type: number
 *                                       example: 600
 *     responses:
 *           201:
 *               description: Product created successfully
 *               content:
 *                    application/json:
 *                           schema:
 *                               $ref: '#/components/schemas/Product'
 *           400:
 *              description: Bad Request - invalid input data
 */

router.post('/',  
     body("name").notEmpty().withMessage("El nombre del producto no puedo ir vacio"),
     body("price").isNumeric().withMessage('Valor no valido').notEmpty().withMessage("El precio del producto no puedo ir vacio")
    .custom(value => value > 0),
     handleInputErrors,
     createProduct)


/**
 * 
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update availability the product
 *     tags:
 *         - Products     
 *     parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the product to retrieve
 *           required: true
 *           schema:
 *              type: integer
 *     requestBody:
 *           required: true
 *           content:
 *              application/json:   
 *                      schema:
 *                            type: object
 *                            properties:
 *                                 name:
 *                                      type: string
 *                                      example: "Ipad 10 pro"
 *                                 price:
 *                                       type: number
 *                                       example: 600
 *                                 availability:
 *                                       type: boolean
 *                                       example: true
 *     responses:
 *           200:
 *               description: Product updated successfully
 *               content:
 *                    application/json:
 *                           schema:
 *                               $ref: '#/components/schemas/Product'
 *                                
 *           400:
 *               description: Bad Request - invalid ID or invalid input data
 * 
 *           404:
 *               description: Product not found
 */


router.put('/:id', 
    param('id').isInt().withMessage('ID no es valido'),
    body("name").notEmpty().withMessage("El nombre del producto no puedo ir vacio"),
    body("price").isNumeric().withMessage('Precio no valido').notEmpty().withMessage("El precio del producto no puedo ir vacio")
    .custom(value => value > 0),
    body('availability').isBoolean().withMessage('Valor de disponibilidad no valido'),
    handleInputErrors,
    updateProduct)




/**
 * 
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update Product availability
 *     tags:
 *         - Products     
 *     description: Returns the update availability
 *     parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the product to retrieve
 *           required: true
 *           schema:
 *              type: integer
 *     
 *     responses:
 *           200:
 *               description: Product updated successfully
 *               content:
 *                    application/json:
 *                           schema:
 *                               $ref: '#/components/schemas/Product'
 *                                
 *           400:
 *               description: Bad Request - invalid ID
 * 
 *           404:
 *               description: Product not found
 */

router.patch('/:id',param('id').isInt().withMessage('ID no es valido'),handleInputErrors,updateAvailabilit)

/**
 * 
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: delete Product availability
 *     tags:
 *         - Products     
 *     description: Returns the update availability
 *     parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the product to delete
 *           required: true
 *           schema:
 *              type: integer
 *     
 *     responses:
 *           200:
 *               description: Product deleted successfully
 *               content:
 *                    application/json:
 *                           schema:
 *                               type: string
 *                                
 *           400:
 *               description: Bad Request - invalid ID
 * 
 *           404:
 *               description: Product not found
 */

router.delete('/:id',param('id').isInt().withMessage('ID no es valido'),handleInputErrors,deleteProduct)

export default router