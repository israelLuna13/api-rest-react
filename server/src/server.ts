import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'

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

server.get('/api',(req,res)=>{
    res.json({msg:'Desde Api'})
})


export default server