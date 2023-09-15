import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer/>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
