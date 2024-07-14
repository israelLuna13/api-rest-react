import {createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import Products from './views/Products'
import NewProduct,{action as newProductAction} from './views/NewProduct'
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
                element:<Products/>
            },
            {
                path:'products/nuevo',
                element:<NewProduct/>,
                action:newProductAction
            }
        ]
    }
])