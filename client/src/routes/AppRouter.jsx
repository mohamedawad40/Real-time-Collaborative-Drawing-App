import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/Login";
import MainLayout from "../layout/Mainlayout";
import Rooms from "../pages/Rooms";
import RoomDetail from "../pages/DrawingBoard";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Rooms />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room/:id/join" element={<RoomDetail />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

        </Route>
    )
);

export const AppRouter = () => <RouterProvider router={router} />;
