import { useState } from "react";
import { FaStar, FaRegStar, FaComments } from "react-icons/fa";
import feedbackService from "../services/feedbackService";

function StarRating({ label, value, onChange }) {
  return <div className="mb-3"><label className="d-block">{label}</label>{[1,2,3,4,5].map(n=><button type="button" key={n} className="star-button" onClick={()=>onChange(n)}>{n<=value?<FaStar/>:<FaRegStar/>}</button>)}</div>;
}

function Feedback() {
  const [form, setForm] = useState({ donorId:"", centerId:"", appointmentId:"", ratingStaff:0, ratingFacility:0, ratingWaitTime:0, comments:"", isAnonymous:false });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault(); setMessage(""); setError("");
    try {
      await feedbackService.submitFeedback({
        donor:{id:Number(form.donorId)}, bloodBank:{centerId:Number(form.centerId)},
        appointment:form.appointmentId?{appointmentId:Number(form.appointmentId)}:null,
        ratingStaff:form.ratingStaff, ratingFacility:form.ratingFacility, ratingWaitTime:form.ratingWaitTime,
        comments:form.comments, anonymous:form.isAnonymous
      });
      setMessage("Thank you. Your feedback has been submitted to the BloodConnect administration team.");
      setForm({ donorId:"", centerId:"", appointmentId:"", ratingStaff:0, ratingFacility:0, ratingWaitTime:0, comments:"", isAnonymous:false });
    } catch (err) { setError(err.response?.data?.error || "Failed to submit feedback."); }
  };

  const set = (name, value) => setForm({...form,[name]:value});
  return <div className="container py-5">
    <div className="gov-section-title"><h2><FaComments className="me-2"/>Share Your Feedback</h2><p>Your feedback is submitted privately for administrative review.</p></div>
    {message && <div className="alert alert-success border-0">{message}</div>}{error && <div className="alert alert-danger border-0">{error}</div>}
    <div className="panel-card mx-auto" style={{maxWidth:850}}>
      <form onSubmit={submit}>
        <div className="row g-3">
          <div className="col-md-4"><label>Donor ID</label><input type="number" className="form-control" value={form.donorId} onChange={e=>set("donorId",e.target.value)} required/></div>
          <div className="col-md-4"><label>Centre ID</label><input type="number" className="form-control" value={form.centerId} onChange={e=>set("centerId",e.target.value)} required/></div>
          <div className="col-md-4"><label>Appointment ID <span className="text-muted fw-normal">(optional)</span></label><input type="number" className="form-control" value={form.appointmentId} onChange={e=>set("appointmentId",e.target.value)}/></div>
        </div>
        <div className="mt-4"><StarRating label="Staff experience" value={form.ratingStaff} onChange={v=>set("ratingStaff",v)}/><StarRating label="Facility" value={form.ratingFacility} onChange={v=>set("ratingFacility",v)}/><StarRating label="Waiting time" value={form.ratingWaitTime} onChange={v=>set("ratingWaitTime",v)}/></div>
        <label>Comments</label><textarea className="form-control" rows="4" value={form.comments} onChange={e=>set("comments",e.target.value)} placeholder="Tell us about your donation experience..."/>
        <label className="screening-row mt-3"><input type="checkbox" checked={form.isAnonymous} onChange={e=>set("isAnonymous",e.target.checked)}/><span>Submit anonymously to administrators</span></label>
        <button className="btn btn-danger rounded-pill mt-4 px-4">Submit Feedback</button>
      </form>
    </div>
  </div>;
}
export default Feedback;
