import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import router from "./router";
import db from "./config/db";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggweUiOption } from "./config/swagger";

//instancia de express
const server = express();
//permitir conexiones
const corsOptions: CorsOptions = {
    
  origin: function (origin, callback) {
    //si la url que hace la peticion es la que esta en las variables de entorno
    if (origin === process.env.FRONTEND_URL) {
        //permitimos la conexion
      callback(null, true);
    } else {
        //denegamos la conexion
      callback(new Error("Error de CORS"));
    }
  },
};
server.use(cors(corsOptions));
//leer los datos de formularios
server.use(express.json());
server.use(morgan("dev"));

//conectar a db
export async function conectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.bgYellow.black( 'Conexion exitosa  a la base de datos'));
  } catch (error) {
    // console.log(error);
    console.log(colors.bgRed.white("Error al conectrase a la base de datos"));
  }
}
conectDB();
//rutas
server.use("/api/products", router);

//Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggweUiOption)
);

export default server;
