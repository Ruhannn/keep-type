import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Cart from "../components/Cart";
import ProductDetails from "../components/DetailPage";




 const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },
    {
        path:"/cart",
        element:<Cart />

    },
    {
        path:'/product/:id',
        element:<ProductDetails/>
    }

])

export default router