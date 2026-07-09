import StatCard from "../components/StatCard";
import { FaUsers, FaTint, FaHospital } from "react-icons/fa";
import { Link } from "react-router-dom";

function Dashboard() {

  return (

    <div className="container py-5">

      <div className="mb-5">

        <h2 className="fw-bold">

          Welcome 👋

        </h2>

        <p className="text-muted">

          Manage donors and urgent blood requests.

        </p>

      </div>

      <div className="row">

        <StatCard
          title="Total Donors"
          value="120+"
          icon={<FaUsers />}
          color="#0d6efd"
        />

        <StatCard
          title="Blood Requests"
          value="35"
          icon={<FaTint />}
          color="#dc3545"
        />

        <StatCard
          title="Hospitals"
          value="15"
          icon={<FaHospital />}
          color="#198754"
        />

      </div>

      <div className="row mt-5">

        <div className="col-md-6">

          <div className="card shadow-lg border-0">

            <div className="card-body">

              <h4>

                Blood Donors

              </h4>

              <p>

                View all registered blood donors.

              </p>

              <Link
                className="btn btn-danger"
                to="/donors"
              >
                Open Donors
              </Link>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow-lg border-0">

            <div className="card-body">

              <h4>

                Urgent Requests

              </h4>

              <p>

                View and create urgent requests.

              </p>

              <Link
                className="btn btn-danger"
                to="/urgent"
              >
                Open Requests
              </Link>

            </div>

          </div>

        </div>

      </div>

      <div className="card shadow-lg border-0 mt-5">

        <div className="card-body">

          <h3 className="mb-3">

            About BloodConnect

          </h3>

          <p>

            BloodConnect is a platform that helps
            connect blood donors with patients during
            emergencies.

            Search donors instantly,
            create urgent requests,
            and help save lives.

          </p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;