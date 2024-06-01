import SignIn from "../components/auth/SignIn";
import { Routes, Route, BrowserRouter, Navigate, } from "react-router-dom";
import AppsRoutes from './AppsRoutes';

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/app/*" element={<AppsRoutes />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter