import './App.css'
import SignIn from "./components/auth/SignIn";
import Dashtask from "./components/Dashboard/Dashtask";
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import Notification from "./components/common/Notification";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<SignIn />} />
            <Route path="/dashtask" element={<Dashtask />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Notification />
    </div>
  );
}
export default App;