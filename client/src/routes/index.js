import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import About from "../pages/About";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import UserDashboard from "../pages/userDashboard";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import AdminDetails from "../pages/AdminDetails";

// Create a browser router and define the routes.
const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children:[
            {
                path:"",
                element: <Home />
            },
            {
                path:"about",
                element: <About/>
            },
            {
                path:"login",
                element:<Login />
            },
            {
                path:"dashboard",
                element:<UserDashboard />
            },
            {
                path:"forgotpassword",
                element:<ForgotPassword/>
            },
            {
                path:"signup",
                element:<Signup/>
            },
            {
                path:"admin-panel",
                element:<AdminPanel />,
                children:[
                    {
                        path:"",
                        element:<AdminDetails />
                    },
                    {
                        path:"all-users",
                        element:<AllUsers />
                    },
                    {
                        path:"all-products",
                        element:<AllProducts />
                    }
                ]
            }
        ]
    },
]);


export default router;