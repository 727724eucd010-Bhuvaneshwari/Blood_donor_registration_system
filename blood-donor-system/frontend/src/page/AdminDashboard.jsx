import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaPlus,
  FaToggleOn,
  FaToggleOff,
  FaBolt,
  FaComments,
  FaCalendarCheck
} from "react-icons/fa";

import api from "../api/axiosInstance";

const COMPATIBLE = {
  "O-": ["O-"],
  "O+": ["O+", "O-"],
  "A-": ["A-", "O-"],
  "A+": ["A+", "A-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "AB-": ["AB-", "A-", "B-", "O-"],
  "AB+": ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"]
};

function AdminDashboard() {
  const [centers, setCenters] = useState([]);
  const [requests, setRequests] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    city: "",
    pincode: "",
    contactNumber: "",
    operatingHours: "24/7"
  });

  const [message, setMessage] = useState("");

  // ==============================
  // LOAD ADMIN DATA
  // ==============================

const load = async () => {
  try {
    const c = await api.get("/admin/centers");
    console.log("CENTERS:", c.data);
    setCenters(c.data);

    const r = await api.get("/admin/requests");
    console.log("REQUESTS:", r.data);
    setRequests(r.data);

    const f = await api.get("/admin/feedback");
    console.log("FEEDBACK:", f.data);
    setFeedback(f.data);

    const a = await api.get("/appointments/admin/all");
    console.log("APPOINTMENTS:", a.data);
    setAppointments(a.data);

  } catch (err) {
    console.error("ADMIN API ERROR:", err);
    console.error("STATUS:", err.response?.status);
    console.error("DATA:", err.response?.data);

    setMessage(
      err.response?.data?.error ||
      `Admin API failed: ${err.response?.status || "Network Error"}`
    );
  }
};
  useEffect(() => {
    load().catch(() =>
      setMessage("Unable to load administrator data.")
    );
  }, []);

  // ==============================
  // ADD BLOOD CENTRE
  // ==============================

  const addCenter = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/centers", form);

      setForm({
        name: "",
        city: "",
        pincode: "",
        contactNumber: "",
        operatingHours: "24/7"
      });

      setMessage("Blood centre added successfully.");

      load();
    } catch (err) {
      setMessage(
        err.response?.data?.error ||
        "Could not add centre."
      );
    }
  };

  // ==============================
  // TOGGLE CENTRE VERIFICATION
  // ==============================

  const toggle = async (id, verified) => {
    try {
      await api.put(
        `/admin/centers/${id}/verification?verified=${!verified}`
      );

      load();
    } catch {
      setMessage("Could not update verification status.");
    }
  };

  // ==============================
  // COMPLETE DONATION
  // ==============================

  const completeAppointment = async (id) => {
    try {
      await api.put(`/appointments/${id}/complete`);

      setMessage(
        "Donation marked as completed successfully."
      );

      load();
    } catch (err) {
      setMessage(
        err.response?.data?.error ||
        "Could not complete the donation."
      );
    }
  };

  return (
    <div className="container py-4">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="mb-4">
        <h2>ADMIN CONSOLE</h2>

        <p className="text-muted">
          BloodConnect Operations
        </p>

        <p className="text-muted">
          Private control room for emergency demand,
          centres and feedback.
        </p>

        <span className="badge bg-danger-subtle text-danger">
          ADMIN
        </span>
      </div>


      {/* ==============================
          MESSAGE
      ============================== */}

      {message && (
        <div className="alert alert-info border-0">
          {message}
        </div>
      )}


      {/* ==============================
          METRICS
      ============================== */}

      <div className="row g-4 mb-4">

        <div className="col-md-4">
          <div className="metric-card">

            <small>Blood centres</small>

            <strong>
              {centers.length}
            </strong>

            <span>
              {centers.filter(c => c.verified).length} verified
            </span>

          </div>
        </div>


        <div className="col-md-4">
          <div className="metric-card">

            <small>Emergency requests</small>

            <strong>
              {requests.length}
            </strong>

            <span>
              private admin records
            </span>

          </div>
        </div>


        <div className="col-md-4">
          <div className="metric-card">

            <small>Feedback received</small>

            <strong>
              {feedback.length}
            </strong>

            <span>
              submitted by donors
            </span>

          </div>
        </div>

      </div>


      {/* ==============================
          ADD CENTRE + VERIFICATION
      ============================== */}

      <div className="row g-4 mb-4">

        {/* ADD CENTRE */}

        <div className="col-lg-5">

          <div className="panel-card">

            <h5>
              <FaPlus className="text-danger me-2" />
              Add blood centre / hospital
            </h5>

            <form
              onSubmit={addCenter}
              className="mt-3"
            >

              {[
                "name",
                "city",
                "pincode",
                "contactNumber",
                "operatingHours"
              ].map((key) => (

                <input
                  key={key}
                  className="form-control mb-3"
                  placeholder={{
                    name: "Centre / hospital name",
                    city: "City",
                    pincode: "Pincode",
                    contactNumber: "Contact number",
                    operatingHours: "Operating hours"
                  }[key]}
                  value={form[key]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]: e.target.value
                    })
                  }
                  required
                />

              ))}

              <button className="btn btn-danger rounded-pill w-100">
                Add Centre
              </button>

            </form>

          </div>

        </div>


        {/* CENTRE VERIFICATION */}

        <div className="col-lg-7">

          <div className="panel-card">

            <h5>
              Centre verification
            </h5>

            <div className="table-responsive mt-3">

              <table className="table align-middle">

                <thead>

                  <tr>
                    <th>Centre</th>
                    <th>City</th>
                    <th>Status</th>
                    <th></th>
                  </tr>

                </thead>

                <tbody>

                  {centers.map((c) => (

                    <tr key={c.centerId}>

                      <td className="fw-semibold">
                        {c.name}
                      </td>

                      <td>
                        {c.city}
                      </td>

                      <td>

                        {c.verified ? (

                          <span className="badge bg-success-subtle text-success">

                            <FaCheckCircle className="me-1" />

                            Verified

                          </span>

                        ) : (

                          <span className="badge bg-warning-subtle text-warning-emphasis">

                            Pending

                          </span>

                        )}

                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() =>
                            toggle(
                              c.centerId,
                              c.verified
                            )
                          }
                        >

                          {c.verified ? (
                            <FaToggleOff />
                          ) : (
                            <FaToggleOn />
                          )}

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>


      {/* ==============================
          DONOR APPOINTMENTS
      ============================== */}

      <div className="panel-card mb-4">

        <div className="d-flex justify-content-between align-items-center">

          <h5>

            <FaCalendarCheck className="text-danger me-2" />

            Donor Appointments

          </h5>

          <span className="badge bg-danger-subtle text-danger">
            ADMIN ONLY
          </span>

        </div>


        <div className="table-responsive mt-3">

          <table className="table align-middle">

            <thead>

              <tr>
                <th>Donor</th>
                <th>Blood Group</th>
                <th>Centre</th>
                <th>City</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {appointments.length ? (

                appointments.map((a) => (

                  <tr key={a.appointmentId}>

                    {/* DONOR */}

                    <td className="fw-semibold">
                      {a.donor?.name || "-"}
                    </td>


                    {/* BLOOD GROUP */}

                    <td>

                      <span className="blood-chip">
                        {a.donor?.bloodGroup || "-"}
                      </span>

                    </td>


                    {/* CENTRE */}

                    <td>
                      {a.bloodBank?.name || "-"}
                    </td>


                    {/* CITY */}

                    <td>
                      {a.bloodBank?.city || "-"}
                    </td>


                    {/* DATE */}

                    <td>
                      {a.appointmentDate}
                    </td>


                    {/* STATUS */}

                    <td>

                      {a.status === "completed" ? (

                        <span className="badge bg-success-subtle text-success">

                          <FaCheckCircle className="me-1" />

                          Completed

                        </span>

                      ) : a.status === "cancelled" ? (

                        <span className="badge bg-secondary-subtle text-secondary">

                          Cancelled

                        </span>

                      ) : (

                        <span className="badge bg-warning-subtle text-warning-emphasis">

                          Booked

                        </span>

                      )}

                    </td>


                    {/* ACTION */}

                    <td>

                      {a.status === "booked" && (

                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            completeAppointment(
                              a.appointmentId
                            )
                          }
                        >

                          <FaCheckCircle className="me-1" />

                          Complete

                        </button>

                      )}


                      {a.status === "completed" && (

                        <span className="text-success fw-semibold">

                          Done

                        </span>

                      )}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center text-muted py-4"
                  >
                    No appointments found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==============================
          EMERGENCY REQUESTS
      ============================== */}

      <div className="panel-card mb-4">

        <div className="d-flex justify-content-between align-items-center">

          <h5>

            <FaBolt className="text-danger me-2" />

            Emergency blood requests

          </h5>

          <span className="badge bg-danger-subtle text-danger">
            ADMIN ONLY
          </span>

        </div>


        <div className="table-responsive mt-3">

          <table className="table align-middle">

            <thead>

              <tr>
                <th>Urgency</th>
                <th>Patient</th>
                <th>Blood group</th>
                <th>Units</th>
                <th>Hospital</th>
                <th>City</th>
                <th>Contact</th>
                <th>Compatible groups</th>
              </tr>

            </thead>


            <tbody>

              {requests.length ? (

                requests.map((r) => (

                  <tr key={r.requestId}>

                    <td>
                      <span className="urgency-tag">
                        {r.urgency}
                      </span>
                    </td>

                    <td className="fw-semibold">
                      {r.patientName}
                    </td>

                    <td>
                      <span className="blood-chip">
                        {r.bloodGroup}
                      </span>
                    </td>

                    <td>
                      {r.quantityRequired}
                    </td>

                    <td>
                      {r.requestingFacility}
                    </td>

                    <td>
                      {r.city}
                    </td>

                    <td>
                      {r.contactNumber}
                    </td>

                    <td>
                      {(COMPATIBLE[r.bloodGroup] || []).join(", ")}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center text-muted py-4"
                  >
                    No emergency requests.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==============================
          DONOR FEEDBACK
      ============================== */}

      <div className="panel-card">

        <h5>

          <FaComments className="text-danger me-2" />

          Donor feedback

        </h5>


        <div className="table-responsive mt-3">

          <table className="table align-middle">

            <thead>

              <tr>
                <th>Centre</th>
                <th>Donor</th>
                <th>Ratings</th>
                <th>Comments</th>
              </tr>

            </thead>


            <tbody>

              {feedback.length ? (

                feedback.map((f) => (

                  <tr key={f.feedbackId}>

                    <td>
                      {f.bloodBank?.name ||
                        `Centre #${f.bloodBank?.centerId || "-"}`}
                    </td>

                    <td>
                      {f.anonymous
                        ? "Anonymous Donor"
                        : f.donor?.name || "Donor"}
                    </td>

                    <td>
                      {f.ratingStaff}★ staff ·{" "}
                      {f.ratingFacility}★ facility ·{" "}
                      {f.ratingWaitTime}★ wait
                    </td>

                    <td>
                      {f.comments || "—"}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center text-muted py-4"
                  >
                    No feedback received.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;