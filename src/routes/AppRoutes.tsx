import { Routes, Route } from "react-router"
import PublicRoutes from "./PublicRoutes";
import AuthLayout from "../pages/AuthLayout";
import PrivateRoutes from "./PrivateRoutes";
import MainLayout from "../pages/MainLayout/index";
import HomePage from "../pages/Home";
import RidesPage from "../pages/Rides";
import UsersPage from "../pages/Users";
import FrequentRidesPage from "../pages/FrequentRides";
import Error404Page from "../pages/NotFound/Error404Page";
import LoginPage from "../pages/AuthLayout/Login";
import AddFrequentRide from "../pages/FrequentRides/AddFrequentRide";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Auth Routes */}
            <Route element={<PublicRoutes />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Route>
            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/rides" element={<RidesPage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/frequent-rides" element={<FrequentRidesPage />} />
                    <Route path="/add-frequent-ride" element={<AddFrequentRide />} />
                    <Route path="*" element={<Error404Page />} />
                </Route>
            </Route>
        </Routes>
    )
}
export default AppRoutes;