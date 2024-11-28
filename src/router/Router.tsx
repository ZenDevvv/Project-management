import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { app } from "../config/app";

const router = createBrowserRouter(app.routes);

const Router = () => {
    return <RouterProvider router={router}/>
}

export { Router }