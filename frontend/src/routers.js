import {createBrowserRouter, Navigate} from "react-router-dom";
import MainLayout from "./lauouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AddVehiclePage from "./pages/AddVehiclePage";
import AdminPage from "./pages/AdminPage";
import VehiclesPage from "./pages/VehiclesPage";
import EditVehiclePage from "./pages/EditVehiclePage";
import VehiclesIDPage from "./pages/VehiclesIDPage";
import RecoveryPage from "./pages/RecoveryPage";
import {ChatPage} from "./pages/ChatPage";
import {AnalyticPage} from "./pages/AnalyticPage";


const routers = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'vehicles'}/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'auth/recovery/:token', element: <RecoveryPage/>},
            {path: 'register', element: <RegisterPage/>},
            {path: 'profile', element: <ProfilePage/>},
            {path: 'vehicles', element: <VehiclesPage/>},
            {path: 'vehicles/:id', element: <VehiclesIDPage/>},

            // Доступ тільки для авторизованих користувачів
            {path: '/vehicle/add', element: <AddVehiclePage/>},
            {path: `/vehicle/edit/:id`, element: <EditVehiclePage/>},
            {path: '/chat', element: <ChatPage/>},
            {path: '/chat/:sellerId', element: <ChatPage/>},

            // для преміум користувачів
            {path: `/analytics/:id`, element: <AnalyticPage/>},

            // Доступ тільки для менеджера або суперюзера
            {path: '/admin/', element: <AdminPage/>},

        ]
    }
])

export {routers}