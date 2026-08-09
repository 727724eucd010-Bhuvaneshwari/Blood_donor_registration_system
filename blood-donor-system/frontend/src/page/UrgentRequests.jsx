import { useState } from "react";
import { FaBolt, FaLock } from "react-icons/fa";
import urgentService from "../services/urgentService";

const empty = {patientName:"",bloodGroup:"",quantityRequired:1,requestingFacility:"",city:"",contactNumber:"",urgency:"HIGH"};
const groups=["A+","A-","B+","B-","AB+","AB-","O+","O-"];

function UrgentRequests() {
  const token=localStorage.getItem("token");
  const [form,setForm]=useState(empty); const [message,setMessage]=useState(""); const [error,setError]=useState("");
  const submit=async(e)=>{e.preventDefault();setMessage("");setError("");if(!token)return setError("Please sign in as a donor before creating an emergency request.");try{await urgentService.createRequest(form);setForm(empty);setMessage("Emergency request submitted to the BloodConnect administration team. It is not displayed publicly.");}catch(err){setError(err.response?.data?.error||"Could not create request.");}};
  return <div className="dashboard-page"><div className="container py-5">
    <div className="emergency-banner mb-4"><div><span className="eyebrow">TIME-SENSITIVE</span><h1>Emergency blood request</h1><p>Submit an urgent blood requirement securely to the administration team.</p></div><FaBolt/></div>
    {message&&<div className="alert alert-success border-0">{message}</div>}{error&&<div className="alert alert-danger border-0">{error}</div>}
    <div className="row justify-content-center"><div className="col-lg-8"><div className="panel-card">
      <div className="d-flex justify-content-between align-items-center"><h5>Create request</h5><small className="text-muted"><FaLock/> Private admin workflow</small></div>
      <p className="text-muted small">Requests are stored securely and are visible only to authorized administrators. Compatible donor details are never exposed on this public page.</p>
      <form onSubmit={submit} className="mt-3">
        <input className="form-control mb-3" placeholder="Patient name" value={form.patientName} onChange={e=>setForm({...form,patientName:e.target.value})} required/>
        <div className="row"><div className="col-md-7"><select className="form-select mb-3" value={form.bloodGroup} onChange={e=>setForm({...form,bloodGroup:e.target.value})} required><option value="">Required blood group</option>{groups.map(g=><option key={g}>{g}</option>)}</select></div><div className="col-md-5"><input type="number" min="1" max="20" className="form-control mb-3" placeholder="Units" value={form.quantityRequired} onChange={e=>setForm({...form,quantityRequired:Number(e.target.value)})}/></div></div>
        <input className="form-control mb-3" placeholder="Hospital / facility name" value={form.requestingFacility} onChange={e=>setForm({...form,requestingFacility:e.target.value})} required/>
        <div className="row"><div className="col-md-6"><input className="form-control mb-3" placeholder="City / district" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} required/></div><div className="col-md-6"><input className="form-control mb-3" placeholder="Contact number" value={form.contactNumber} onChange={e=>setForm({...form,contactNumber:e.target.value})} required/></div></div>
        <select className="form-select mb-3" value={form.urgency} onChange={e=>setForm({...form,urgency:e.target.value})}><option>CRITICAL</option><option>HIGH</option><option>MEDIUM</option></select>
        <button className="btn btn-danger rounded-pill w-100"><FaBolt className="me-2"/>Submit Emergency Request</button>
      </form>
    </div></div></div>
  </div></div>;
}
export default UrgentRequests;
