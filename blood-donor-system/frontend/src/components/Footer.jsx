import { Link } from "react-router-dom";
import { FaTint } from "react-icons/fa";

function Footer() {
  return (
    <footer className="gov-footer mt-5">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <h6><FaTint className="me-2" />BloodConnect Portal</h6>
            <p className="small" style={{ color: "#9fb1c8" }}>
              A centralized blood donor coordination system connecting donors, blood banks,
              and hospitals for faster, more accurate emergency response.
            </p>
          </div>
          <div className="col-6 col-lg-2">
            <h6>Looking For Blood</h6>
            <Link to="/donors">Search Donors</Link>
            <Link to="/centers">Blood Bank Directory</Link>
            <Link to="/urgent">Emergency Requests</Link>
          </div>
          <div className="col-6 col-lg-2">
            <h6>Want To Donate</h6>
            <Link to="/donor-register">Donor Registration</Link>
            <Link to="/eligibility">Eligibility Screening</Link>
            <Link to="/appointments">Book Appointment</Link>
          </div>
          <div className="col-lg-4">
            <h6>Important</h6>
            <p className="small mb-1" style={{ color: "#9fb1c8" }}>
              This is an academic project built for demonstration purposes and is not
              affiliated with any government health authority.
            </p>
            <p className="small" style={{ color: "#9fb1c8" }}>
              Passwords are secured using BCrypt hashing; sessions use JWT authentication.
            </p>
          </div>
        </div>
      </div>
      <div className="gov-disclaimer">
        © 2026 BloodConnect Portal — Final Year Academic Project — Built with React &amp; Spring Boot
      </div>
    </footer>
  );
}

export default Footer;
