import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home/Home";
import SignUp from "./page/SignUp/SignUp";
import Login from "./page/Login/Login";
import Navbar from "./components/Navbar/Navbar";

const user = localStorage.getItem('token')
 
const router = (
  <Router>
    <Routes>
      <Route path="/" element={user ? <Navbar /> : <Navigate to="/dashboard"/>} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard"/>} />
      <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/dashboard"/>} />
    </Routes>
  </Router>
);

function App() {
  return <div>
    {router}
  </div>;
}

export default App;