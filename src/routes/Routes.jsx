import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import MyProfile from "../pages/MyProfile";
import PrivateRoutes from "./PrivateRoutes";
import AlreadyLoggedInRoutes from "./AlreadyLoggedInRoutes";

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
                path: "about",
                element: <About></About>,
            },
            {
                path: 'myProfile',
                element: <PrivateRoutes>
                    <MyProfile></MyProfile>
                </PrivateRoutes>
            },
            {
                path: 'login',
                element: <AlreadyLoggedInRoutes>
                    <LogIn></LogIn>
                </AlreadyLoggedInRoutes>,
            },
            {
                path: 'register',
                element: <AlreadyLoggedInRoutes>
                    <Register></Register>
                </AlreadyLoggedInRoutes>,
            },
            {
                path: "*",
                element: <NotFound></NotFound>
            }
        ]
    }
])