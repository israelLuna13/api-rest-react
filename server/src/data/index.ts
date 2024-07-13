import {exit} from 'node:process'
import db from '../config/db'

const clearDB = async()=>{
    try {
        await db.sync({force:true})
        console.log('Datos eliminados correctamente');
        //finaliza correctamente
        exit()
    } catch (error) {
        console.log(error);
        //finaliza con errores
        exit(1)
    }
}
//validar que se esta introduciendo el --clear en el comando para limpiar la db
if(process.argv[2] === '--clear'){
    clearDB()
}