import './App.css'
import Notification from "./components/common/Notification";
import AppRouter from './router/common';

function App() {
  return (
    <div>
      <AppRouter/>
      <Notification />
    </div>
  );
}
export default App;