// import { Model } from 'sequelize';
// import {Table,Column,DataType} from 'sequelize-typescript'

// @Table({
//     tableName:'products'
// })
// class Product extends Model{
//     @Column({
//         type:DataType.STRING(100)
//     })
//     name:string

//     @Column({
//         type:DataType.FLOAT(6,2)
//     })
//     price:number

//     @Column({
//         type:DataType.BOOLEAN
//     })
//     availability:boolean
// }
// export default Product
import { Table, Column, Model, DataType,Default } from 'sequelize-typescript';
//utilizamos decoradores para crear el modelo

//utilizamos el decorador table para indicar la tabla
@Table({
  tableName: 'products'
})

//definimos la propiedades de la clase como columna
class Product extends Model<Product> {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.FLOAT(6, 2),
    allowNull: false,
  })
  price!: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  availability!: boolean;
}

export default Product;
