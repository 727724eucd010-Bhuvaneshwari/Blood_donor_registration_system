import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTint,
  FaCalendarCheck,
  FaClipboardCheck,
  FaSearch,
  FaCommentDots,
  FaHospital,
  FaUserCircle
} from "react-icons/fa";
import donorService from "../services/donorService";
import "./Dashboard.css";

function Dashboard() {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const name = localStorage.getItem("userName") || "Donor";

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await donorService.getMyProfile();
        setDonor(data);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.status === 404
            ? "Your donor profile is not registered yet."
            : "Unable to load your donor profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div>
            <h4>Loading your dashboard...</h4>
            <p>Please wait while we load your donor information.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Welcome */}
      <div className="dashboard-welcome mb-5">
        <div>
          <span className="dashboard-eyebrow">
            DONOR DASHBOARD
          </span>

          <h1>
            Welcome, {name} 👋
          </h1>

          <p>
            Thank you for being a registered BloodConnect donor.
            Manage your donations, appointments and eligibility from here.
          </p>
        </div>

        <div className="dashboard-user-icon">
          <FaUserCircle />
        </div>
      </div>


      {/* Error / Profile not found */}
      {error && (
        <div className="alert alert-warning border-0 mb-4">
          {error}

          <div className="mt-3">
            <Link to="/donor-register" className="btn btn-danger">
              Complete Donor Registration
            </Link>
          </div>
        </div>
      )}


      {donor && (
        <>

          {/* Donor Profile */}
          <div className="donor-profile-card mb-5">

            <div className="donor-profile-heading">

              <div>
                <span>MY DONOR PROFILE</span>
                <h3>{donor.name}</h3>
              </div>

              <div className="blood-group-large">
                <FaTint />
                <strong>
                  {donor.bloodGroup || "—"}
                </strong>
              </div>

            </div>


            <div className="row g-3 mt-2">

              <div className="col-md-3">
                <div className="profile-info">
                  <small>Blood Group</small>
                  <strong>
                    {donor.bloodGroup || "Not updated"}
                  </strong>
                </div>
              </div>


              <div className="col-md-3">
                <div className="profile-info">
                  <small>City</small>
                  <strong>
                    {donor.city || "Not updated"}
                  </strong>
                </div>
              </div>


              <div className="col-md-3">
                <div className="profile-info">
                  <small>Age</small>
                  <strong>
                    {donor.age || "Not updated"}
                  </strong>
                </div>
              </div>


              <div className="col-md-3">
                <div className="profile-info">
                  <small>Availability</small>

                  <strong
                    className={
                      donor.available
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {donor.available
                      ? "Available"
                      : "Not Available"}
                  </strong>

                </div>
              </div>

            </div>
          </div>


          {/* Personal Status */}
          <div className="row g-4 mb-5">

            <div className="col-md-6">

              <div className="dashboard-status-card">

                <div className="status-icon">
                  <FaClipboardCheck />
                </div>

                <div>

                  <small>DONATION ELIGIBILITY</small>

                  <h4>
                    {donor.available
                      ? "Eligible to Donate"
                      : "Currently Not Eligible"}
                  </h4>

                  <p>
                    {donor.nextEligibleDate
                      ? `Next eligible date: ${donor.nextEligibleDate}`
                      : "You can check your eligibility before booking a donation."}
                  </p>

                  <Link
                    to="/eligibility"
                    className="dashboard-link"
                  >
                    Check Eligibility →
                  </Link>

                </div>

              </div>

            </div>


            <div className="col-md-6">

              <div className="dashboard-status-card">

                <div className="status-icon">
                  <FaCalendarCheck />
                </div>

                <div>

                  <small>DONATION APPOINTMENT</small>

                  <h4>
                    Manage Your Appointment
                  </h4>

                  <p>
                    Schedule a blood donation at a verified
                    blood centre.
                  </p>

                  <Link
                    to="/appointments"
                    className="dashboard-link"
                  >
                    Book Appointment →
                  </Link>

                </div>

              </div>

            </div>

          </div>


          {/* Quick Actions */}
          <div className="dashboard-section-title">

            <h2>Quick Actions</h2>

            <p>
              Everything you need as a BloodConnect donor.
            </p>

          </div>


          <div className="row g-4">

            {/* Search Donors */}
            <div className="col-md-4">

              <Link
                to="/donors"
                className="dashboard-action-card"
              >

                <span>
                  <FaSearch />
                </span>

                <div>

                  <h4>
                    Search Blood Donors
                  </h4>

                  <p>
                    Search for compatible blood donors
                    by city and blood group.
                  </p>

                </div>

              </Link>

            </div>


            {/* Blood Bank */}
            <div className="col-md-4">

              <Link
                to="/centers"
                className="dashboard-action-card"
              >

                <span>
                  <FaHospital />
                </span>

                <div>

                  <h4>
                    Blood Bank Directory
                  </h4>

                  <p>
                    Find verified blood banks and
                    donation centres near you.
                  </p>

                </div>

              </Link>

            </div>


            {/* Appointments */}
            <div className="col-md-4">

              <Link
                to="/appointments"
                className="dashboard-action-card"
              >

                <span>
                  <FaCalendarCheck />
                </span>

                <div>

                  <h4>
                    My Appointments
                  </h4>

                  <p>
                    View, book or cancel your blood
                    donation appointments.
                  </p>

                </div>

              </Link>

            </div>


            {/* Eligibility */}
            <div className="col-md-4">

              <Link
                to="/eligibility"
                className="dashboard-action-card"
              >

                <span>
                  <FaClipboardCheck />
                </span>

                <div>

                  <h4>
                    Eligibility Screening
                  </h4>

                  <p>
                    Check whether you are currently
                    eligible to donate blood.
                  </p>

                </div>

              </Link>

            </div>


            {/* Feedback */}
            <div className="col-md-4">

              <Link
                to="/feedback"
                className="dashboard-action-card"
              >

                <span>
                  <FaCommentDots />
                </span>

                <div>

                  <h4>
                    Give Feedback
                  </h4>

                  <p>
                    Share your experience and suggestions
                    with BloodConnect.
                  </p>

                </div>

              </Link>

            </div>


            {/* Update Profile */}
            <div className="col-md-4">

              <Link
                to="/donor-register"
                className="dashboard-action-card"
              >

                <span>
                  <FaUserCircle />
                </span>

                <div>

                  <h4>
                    Update Donor Profile
                  </h4>

                  <p>
                    Keep your donor information up to date.
                  </p>

                </div>

              </Link>

            </div>

          </div>

        </>
      )}

    </div>
  );
}

export default Dashboard;