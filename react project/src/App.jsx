import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Rooms from "./pages/Rooms";
import Details from "./pages/Details";
import About from "./pages/About";
import ResetPassword from "./pages/ResetPassword";
import CheckInOut from "./pages/CheckInOut";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/details" element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkin" element={<CheckInOut />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;