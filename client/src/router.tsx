import {createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import Products,{loader as productsLoader, action as updateAvailabilityAction} from './views/Products'
import NewProduct,{action as newProductAction} from './views/NewProduct'
import EditProduct, { loader as EditProductLoader, action as editProductAction} from './views/EditProduct'
import {action as deleteProductAction} from './components/ProductsDetails'
export const router = createBrowserRouter([
    {
        //ruta principal
        path:'/',
        element:<Layout/>,
        children:[
            //estas rutas son hijas del layout
            //el layout estara presente cuando se visiten estas rutas
            {
                //se mostrara esta pagina cuando se visite '/'
                index:true,
                element:<Products/>,
                //asociamos con la ruta el loader para obtener datos de la api y el action para hacer alguna modificacion
                loader:productsLoader,
                action:updateAvailabilityAction
            },
            {
                //crear un nuevo producto
                path:'products/nuevo',
                element:<NewProduct/>,
                action:newProductAction
            },
            {
                //actualizar un producto
                path:'productos/:id/editar',// ROA Patter - Resource-oriented design
                element:<EditProduct/>,
                loader:EditProductLoader
                ,action:editProductAction
            },
            {
                //eliminar un producto
                path:'productos/:id/eliminar',
                action:deleteProductAction
            }

        ]
    }
])