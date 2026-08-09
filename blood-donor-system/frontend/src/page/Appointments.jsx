import { useEffect, useState } from "react";
import { FaCalendarCheck, FaHistory, FaTimesCircle } from "react-icons/fa";
import appointmentService from "../services/appointmentService";
import bloodBankService from "../services/bloodBankService";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";

function Appointments() {
  const [donor, setDonor] = useState(null);
  const [centers, setCenters] = useState([]);
  const [centerId, setCenterId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadMine = async () => {
    try {
      const [profile, centerData] = await Promise.all([api.get("/donors/me"), bloodBankService.getAllCenters()]);
      setDonor(profile.data); setCenters(centerData);
      const [current, completed] = await Promise.all([appointmentService.getMyAppointments(), appointmentService.getMyHistory()]);
      setAppointments(current); setHistory(completed);
    } catch (err) {
      if (err.response?.status === 404) setError("No donor profile is linked to this account. Please register as a donor first.");
      else setError(err.response?.data?.error || "Unable to load appointment details.");
    } finally { setLoading(false); }
  };
  useEffect(() => { loadMine(); }, []);

  const handleBook = async (e) => {
    e.preventDefault(); setError(""); setMessage("");
    try {
      await appointmentService.bookAppointment({ donor:{id: donor.id}, bloodBank:{centerId:Number(centerId)}, appointmentDate });
      setMessage("Appointment booked successfully."); setCenterId(""); setAppointmentDate(""); loadMine();
    } catch (err) { setError(err.response?.data?.error || "Failed to book appointment."); }
  };

  const cancel = async (id) => {
    try { await appointmentService.cancelAppointment(id); setMessage("Appointment cancelled."); loadMine(); }
    catch (err) { setError(err.response?.data?.error || "Could not cancel appointment."); }
  };

  if (loading) return <div className="container py-5"><p className="text-muted">Loading appointment details...</p></div>;

  return (
    <div className="container py-5">
      <div className="gov-section-title">
        <h2><FaCalendarCheck className="me-2" />Donation Appointments</h2>
        <p>Choose a verified blood centre and reserve your donation visit.</p>
      </div>

      {message && <div className="alert alert-success border-0">{message}</div>}
      {error && <div className="alert alert-danger border-0">{error}</div>}

      {!donor ? (
        <div className="panel-card text-center py-5"><h4>Complete your donor profile first</h4><p className="text-muted">Your appointment is linked to your donor profile, so the system can keep your history in one place.</p><Link className="btn btn-danger rounded-pill" to="/donor-register">Register as Donor</Link></div>
      ) : (
        <>
          <div className="appointment-profile mb-4"><div><small>DONOR PROFILE</small><strong>{donor.name}</strong><span>{donor.bloodGroup} · {donor.city}</span></div><span className="blood-chip large">Donor #{donor.id}</span></div>
          <div className="panel-card mb-5">
            <h5>Book an Appointment</h5>
            <form onSubmit={handleBook} className="row g-3 mt-1">
              <div className="col-md-6"><label>Blood donation centre</label><select className="form-select" value={centerId} onChange={e=>setCenterId(e.target.value)} required><option value="">Select a centre</option>{centers.filter(c=>c.verified).map(c=><option key={c.centerId} value={c.centerId}>{c.name} — {c.city}</option>)}</select></div>
              <div className="col-md-4"><label>Appointment date</label><input type="date" className="form-control" min={new Date().toISOString().split("T")[0]} value={appointmentDate} onChange={e=>setAppointmentDate(e.target.value)} required /></div>
              <div className="col-md-2 d-flex align-items-end"><button className="btn btn-danger rounded-pill w-100">Book</button></div>
            </form>
          </div>

          <div className="panel-card mb-4"><h5><FaHistory className="text-danger me-2" />My Appointments</h5><div className="table-responsive mt-3"><table className="table align-middle"><thead><tr><th>Date</th><th>Centre</th><th>City</th><th>Status</th><th></th></tr></thead><tbody>{appointments.length ? appointments.map(a=><tr key={a.appointmentId}><td>{a.appointmentDate}</td><td>{a.bloodBank?.name || "-"}</td><td>{a.bloodBank?.city || "-"}</td><td><span className="status-text">{a.status}</span></td><td>{a.status === "booked" && <button className="btn btn-sm btn-outline-danger" onClick={()=>cancel(a.appointmentId)}><FaTimesCircle className="me-1"/>Cancel</button>}</td></tr>) : <tr><td colSpan="5" className="text-center text-muted py-4">No appointments yet.</td></tr>}</tbody></table></div></div>

          <div className="panel-card"><h5>Donation History</h5><div className="table-responsive mt-3"><table className="table align-middle"><thead><tr><th>Date</th><th>Centre</th><th>Status</th></tr></thead><tbody>{history.length ? history.map(a=><tr key={a.appointmentId}><td>{a.appointmentDate}</td><td>{a.bloodBank?.name || "-"}</td><td><span className="badge bg-success-subtle text-success">completed</span></td></tr>) : <tr><td colSpan="3" className="text-center text-muted py-4">Completed donations will appear here.</td></tr>}</tbody></table></div></div>
        </>
      )}
    </div>
  );
}
export default Appointments;
