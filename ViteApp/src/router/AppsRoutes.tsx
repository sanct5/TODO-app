import Dashtask from '../components/apps/Dashboard/Dashtask';
import NavBar from '../components/main/Navbar';
import { Routes, Route } from "react-router-dom";
import WorkingOn from './WorkingOn';


const AppsRoutes = () => {
    return (
        <NavBar>
            <Routes>
                <Route path="/task" element={<Dashtask />} />
                <Route path="/dashboard" element={<WorkingOn />} />
                <Route path="/profile" element={<WorkingOn />} />
            </Routes>
        </NavBar>
    )
}

export default AppsRoutes