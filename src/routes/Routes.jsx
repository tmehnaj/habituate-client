import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: 'login',
                element: <LogIn></LogIn>,
            },
            {
                path: 'register',
                element: <Register></Register>,
            },
            {
                path: "*",
                element: <NotFound></NotFound>
            }
        ]
    }
])