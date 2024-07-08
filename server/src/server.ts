import express from 'express'
import colors from 'colors'
import router from './router.js'
import db from './config/db.js'

//instancia de express
const server = express()
//leer los datos de formularios
server.use(express.json())

//conectar a db
async function conectDB() {

    try {
        await db.authenticate()
        db.sync()
        console.log(colors.bgYellow.black( 'Conexion exitosa  a la base de datos'));
        
    } catch (error) {
        console.log(error);
        console.log(colors.bgRed.white('Error al conectrase a la base de datos'));
    }
}
conectDB()
//rutas
server.use('/api/products',router)


export default server