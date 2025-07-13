import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/Login";
import MainLayout from "../layout/Mainlayout";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            {/* <Route index element={<Home />} /> */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

        </Route>
    )
);

export const AppRouter = () => <RouterProvider router={router} />;
