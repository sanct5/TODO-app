import './App.css'
import SignIn from "./components/auth/SignIn";
import Dashtask from "./components/Dashboard/Dashtask";
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";


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

    </div>


  );
}

export default App;