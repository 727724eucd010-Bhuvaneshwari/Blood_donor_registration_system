import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaTint, FaUserCircle, FaSignOutAlt, FaShieldAlt } from "react-icons/fa";
import authService from "../services/authService";
import GovTopBar from "./GovTopBar";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("userName") || "Account";
  const role = localStorage.getItem("userRole");

  const logout = () => {
    authService.logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) => `nav-link nav-link-item ${isActive ? "active" : ""}`;

  return (
    <>
      <GovTopBar />

      <header className="gov-header">
        <div className="container brand-row">
          <span className="gov-emblem"><FaTint /></span>
          <div className="gov-brand-text">
            <h1>BloodConnect</h1>
            <small>CENTRALIZED BLOOD DONOR COORDINATION SYSTEM</small>
          </div>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg gov-nav p-0">
        <div className="container">
          <button className="navbar-toggler my-2" style={{ borderColor: "#fff" }} type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav">
              <NavLink to="/" end className={linkClass}>Home</NavLink>

              <div className="nav-item dropdown">
                <span className="nav-link nav-link-item dropdown-toggle" role="button" data-bs-toggle="dropdown">
                  Looking For Blood
                </span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/centers">Blood Bank Directory</Link></li>
                  <li><Link className="dropdown-item" to="/donors">Search Donors</Link></li>
                  <li><Link className="dropdown-item" to="/urgent">Emergency Requests</Link></li>
                </ul>
              </div>

              <div className="nav-item dropdown">
                <span className="nav-link nav-link-item dropdown-toggle" role="button" data-bs-toggle="dropdown">
                  Want To Donate
                </span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/donor-register">Donor Registration</Link></li>
                  <li><Link className="dropdown-item" to="/eligibility">Eligibility Screening</Link></li>
                  <li><Link className="dropdown-item" to="/appointments">Appointment Booking</Link></li>
                </ul>
              </div>

              <NavLink to="/urgent" className={linkClass}>Emergency</NavLink>

              {token ? (
                <div className="nav-item dropdown ms-lg-auto">
                  <span className="nav-link nav-link-item dropdown-toggle" role="button" data-bs-toggle="dropdown">
                    <FaUserCircle className="me-1" /> {name}
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><span className="dropdown-item-text small text-muted">{role} account</span></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={() => navigate("/dashboard")}>Dashboard</button></li>
                    <li><button className="dropdown-item" onClick={() => navigate("/appointments")}>My Appointments</button></li>
                    <li><button className="dropdown-item" onClick={() => navigate("/feedback")}>Feedback</button></li>
                    {role === "ADMIN" && <li><button className="dropdown-item" onClick={() => navigate("/admin")}><FaShieldAlt className="me-2" />Admin Console</button></li>}
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger" onClick={logout}><FaSignOutAlt className="me-2" />Sign out</button></li>
                  </ul>
                </div>
              ) : (
                <>
                  <NavLink to="/login" className="nav-link nav-link-item ms-lg-auto">Donor Login</NavLink>
                  <NavLink to="/admin-login" className="nav-link nav-link-item admin-nav-link">Admin Login</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
