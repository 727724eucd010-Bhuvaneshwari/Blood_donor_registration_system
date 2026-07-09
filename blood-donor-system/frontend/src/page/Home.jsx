import { Link } from "react-router-dom";
import { FaHeartbeat, FaTint, FaUserFriends } from "react-icons/fa";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="text-white"
        style={{
          background:
            "linear-gradient(to right, #dc3545, #c82333)",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6">

              <h1 className="display-3 fw-bold">
                Donate Blood
              </h1>

              <h2 className="display-5 mb-4">
                Save Someone's Life ❤️
              </h2>

              <p className="lead">

                A single blood donation can save
                up to three lives.

                Join our BloodConnect community today.

              </p>

              <Link
                to="/register"
                className="btn btn-light btn-lg mt-3 me-3"
              >
                Become Donor
              </Link>

              <Link
                to="/donors"
                className="btn btn-outline-light btn-lg mt-3"
              >
                Find Donor
              </Link>

            </div>

            <div className="col-lg-6 text-center">

              <img
                // // src="https://img.freepik.com/free-vector/world-blood-donor-day-concept_23-2148482368.jpg"
                // className="img-fluid rounded shadow"
                // alt="Blood Donation"
              />

            </div>

          </div>

        </div>
      </section>

      {/* Features */}

      <section className="container py-5">

        <h2 className="text-center fw-bold mb-5">
          Why Choose BloodConnect?
        </h2>

        <div className="row">

          <div className="col-md-4">

            <div className="card border-0 shadow-lg p-4 text-center">

              <FaHeartbeat
                size={50}
                className="text-danger mx-auto mb-3"
              />

              <h4>Emergency Help</h4>

              <p>

                Raise urgent blood requests
                within seconds.

              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card border-0 shadow-lg p-4 text-center">

              <FaTint
                size={50}
                className="text-danger mx-auto mb-3"
              />

              <h4>Verified Donors</h4>

              <p>

                Find blood donors easily
                with just one click.

              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card border-0 shadow-lg p-4 text-center">

              <FaUserFriends
                size={50}
                className="text-danger mx-auto mb-3"
              />

              <h4>Community</h4>

              <p>

                Connect hospitals,
                donors and patients together.

              </p>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default Home;