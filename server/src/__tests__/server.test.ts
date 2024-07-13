import request from 'supertest'
import server , {conectDB} from '../server'
import db from '../config/db'

//pruebas
//debemos obtener un json
describe('GET/api',()=>{
    it('should send back a json response', async()=>{
        const res = await request(server).get('/api')

        //lo que se espera de la respuesta
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde Api')
        //lo que no se espera de la respuesta
        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})

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