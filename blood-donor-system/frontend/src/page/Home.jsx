import { Link } from "react-router-dom";
import {
  FaTint,
  FaHospital,
  FaClipboardCheck,
  FaUserPlus,
  FaCalendarCheck,
  FaBolt
} from "react-icons/fa";
import "./Home.css";

function Home() {

  const tiles = [
    {
      icon: <FaTint />,
      title: "Blood Availability",
      desc: "Check live donor pool by blood group",
      to: "/donors"
    },
    {
      icon: <FaHospital />,
      title: "Blood Bank Directory",
      desc: "Find verified centers near you",
      to: "/centers"
    },
    {
      icon: <FaBolt />,
      title: "Emergency Request",
      desc: "Raise an urgent blood requirement",
      to: "/urgent"
    },
    {
      icon: <FaUserPlus />,
      title: "Donor Registration",
      desc: "Register as a voluntary blood donor",
      to: "/donor-register"
    },
    {
      icon: <FaClipboardCheck />,
      title: "Eligibility Screening",
      desc: "Check if you can donate today",
      to: "/eligibility"
    },
    {
      icon: <FaCalendarCheck />,
      title: "Book Appointment",
      desc: "Schedule your donation visit",
      to: "/appointments"
    }
  ];

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="gov-banner">
        <div className="container">

          <h1>
            Blood Donor Coordination Portal
          </h1>

          <p>
            A centralized platform connecting voluntary blood donors,
            blood banks, and hospitals — supporting eligibility screening,
            verified center discovery, and compatibility-based emergency
            donor matching.
          </p>

          <div className="mt-4">

            <Link
              to="/urgent"
              className="btn btn-danger me-3"
            >
              Request Blood
            </Link>

            <Link
              to="/donor-register"
              className="btn btn-light"
            >
              Become a Donor
            </Link>

          </div>

        </div>
      </section>


      {/* Quick Action Tiles */}
      <div className="container gov-tile-grid">

        <div className="row g-3">

          {tiles.map((tile, index) => (
            <div
              className="col-6 col-md-4 col-lg-2"
              key={index}
            >
              <Link
                to={tile.to}
                className="gov-tile text-decoration-none"
              >

                <span className="tile-icon">
                  {tile.icon}
                </span>

                <strong>
                  {tile.title}
                </strong>

                <span>
                  {tile.desc}
                </span>

              </Link>
            </div>
          ))}

        </div>

      </div>


      {/* About This Portal */}
      <section className="container py-5 mt-3">

        <div className="gov-section-title">

          <h2>
            About This Portal
          </h2>

          <p>
            How the coordination workflow operates end to end
          </p>

        </div>


        <div className="row g-4">

          {/* Step 1 */}
          <div className="col-md-4">

            <div className="workflow-card p-4 bg-white border h-100">

              <h5
                className="fw-bold"
                style={{ color: "var(--gov-navy)" }}
              >
                1. Register &amp; Screen
              </h5>

              <p className="text-muted mb-0">
                Donors register and complete a short eligibility
                pre-screening before visiting a center.
              </p>

            </div>

          </div>


          {/* Step 2 */}
          <div className="col-md-4">

            <div className="workflow-card p-4 bg-white border h-100">

              <h5
                className="fw-bold"
                style={{ color: "var(--gov-navy)" }}
              >
                2. Discover &amp; Book
              </h5>

              <p className="text-muted mb-0">
                Search verified blood banks by city and book an
                appointment for donation.
              </p>

            </div>

          </div>


          {/* Step 3 */}
          <div className="col-md-4">

            <div className="workflow-card p-4 bg-white border h-100">

              <h5
                className="fw-bold"
                style={{ color: "var(--gov-navy)" }}
              >
                3. Match in Emergencies
              </h5>

              <p className="text-muted mb-0">
                Urgent requests are matched against all medically
                compatible donor blood groups, not exact matches only.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;