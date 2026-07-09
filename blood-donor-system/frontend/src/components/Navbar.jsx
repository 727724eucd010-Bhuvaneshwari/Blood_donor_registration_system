import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "User";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const active = (path) =>
    location.pathname === path ? "nav-link active fw-bold" : "nav-link";

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{ background: "#dc3545" }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-3"
          to="/"
        >
          🩸 BloodConnect
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbar"
        >

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className={active("/")} to="/">
                Home
              </Link>
            </li>

            {token && (
              <>
                <li className="nav-item">
                  <Link className={active("/dashboard")} to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className={active("/donors")} to="/donors">
                    Donors
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className={active("/urgent")} to="/urgent">
                    Urgent Requests
                  </Link>
                </li>

                <li className="nav-item dropdown ms-3">

                  <a
                    href="#"
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <FaUserCircle
                      size={30}
                      className="me-2"
                    />

                    {userName}
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/donors")}
                      >
                        Donors
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/urgent")}
                      >
                        Urgent Requests
                      </button>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>

                  </ul>

                </li>
              </>
            )}

            {!token && (
              <>
                <li className="nav-item">
                  <Link className={active("/login")} to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className={active("/register")} to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;