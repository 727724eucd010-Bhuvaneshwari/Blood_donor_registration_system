import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./page/Home";
import Login from "./page/Login";
import AdminLogin from "./page/AdminLogin";
import Register from "./page/Register";
import Dashboard from "./page/Dashboard";
import Donors from "./page/Donors";
import DonorRegister from "./page/DonorRegister";
import UrgentRequests from "./page/UrgentRequests";
import Appointments from "./page/Appointments";
import BloodBanks from "./page/BloodBanks";
import BloodStock from "./page/BloodStock";
import Eligibility from "./page/Eligibility";
import Feedback from "./page/Feedback";
import AdminDashboard from "./page/AdminDashboard";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/centers" element={<BloodBanks />} />
          <Route path="/donor-register" element={<DonorRegister />} />
          <Route path="/urgent" element={<UrgentRequests />} />
          <Route path="/eligibility" element={<Eligibility />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/stock" element={<BloodStock />} />
          </Route>

          <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
