import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec,{swaggweUiOption} from './config/swagger'

//instancia de express
const server = express()
//leer los datos de formularios
server.use(express.json())

//conectar a db
export async function conectDB() {

    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.bgYellow.black( 'Conexion exitosa  a la base de datos'));
        
    } catch (error) {
        // console.log(error);
        console.log(colors.bgRed.white('Error al conectrase a la base de datos'));
    }
}
conectDB()
//rutas
server.use('/api/products',router)

//Docs
server.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec,swaggweUiOption))

export default server