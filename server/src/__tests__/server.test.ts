import request from 'supertest'
import server , {conectDB} from '../server'
import db from '../config/db'

//simulamos la conexion a la base de datos
jest.mock('../config/db')

describe('connectDB',()=>{

    it('should handle datbase connection error',async()=>{
        //creamos el espia y va a esperar que se ejecute el metodo authenticate 

        jest.spyOn(db,'authenticate').
                                    mockRejectedValueOnce(new Error('Hibo un error al conectar a la BD'))//forzamos el error para que caiga en el catch
        //este espia espera el mensaje de error
        const consoleSpy = jest.spyOn(console, 'log')
        //empieza a ejecutarse el codigo de conexion a la db
        await conectDB()
        //valores esperados
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error al conectrase a la base de datos')
        )
    })
})