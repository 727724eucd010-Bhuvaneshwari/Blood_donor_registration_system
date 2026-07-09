import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Dashboard from "./page/Dashboard";
import Donors from "./page/Donors";
import UrgentRequests from "./page/UrgentRequests";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/urgent" element={<UrgentRequests />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;