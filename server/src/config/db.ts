import {Sequelize} from 'sequelize-typescript'
import dotenv from 'dotenv'
//agregamos la extension js
import Product from '../models/Product.model.js'
dotenv.config()//para las variables de entorno

//le agregamos ?ssl=true
const db = new Sequelize(process.env.DATABASE_URL!,{
    models:[Product]//creamos el modelo del producto
})

export default db