import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'
//agregamos la extension js
import Product from '../models/Product.model'
dotenv.config()//para las variables de entorno

//le agregamos ?ssl=true
const db = new Sequelize(process.env.DATABASE_URL!,{
    models:[Product],//creamos el modelo del producto
    logging:false
})

export default db