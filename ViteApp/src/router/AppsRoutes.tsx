import Dashtask from '../components/apps/Task/Dashtask';
import NavBar from '../components/main/Navbar';
import { Routes, Route } from "react-router-dom";
import WorkingOn from './WorkingOn';
import TaskDetail from '../components/apps/Task/TaskDetail';


const AppsRoutes = () => {
    return (
        <NavBar>
            <Routes>
                <Route path="/task" element={<Dashtask />} />
                <Route path="/task/:id" element={<TaskDetail/>} />
                <Route path="/dashboard" element={<WorkingOn />} />
                <Route path="/profile" element={<WorkingOn />} />
            </Routes>
        </NavBar>
    )
}

export default AppsRoutes