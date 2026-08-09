import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import authService from "../services/authService";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const data = await authService.login(form);
      if (data.role !== "ADMIN") {
        authService.logout();
        setError("This portal is for administrator accounts only.");
        return;
      }
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || "Unable to sign in as administrator.");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page admin-login-page">
      <div className="container py-5">
        <div className="row justify-content-center align-items-center min-vh-75">
          <div className="col-lg-9">
            <div className="auth-shell">
              <div className="auth-side admin-side">
                <span className="auth-logo"><FaShieldAlt /></span>
                <span className="eyebrow">RESTRICTED ACCESS</span>
                <h1>Administration<br/>Console</h1>
                <p>Authorized staff can review emergency blood requests, donor matching, centre verification and feedback.</p>
                <div className="auth-points"><span>✓ Role-based administrator access</span><span>✓ Emergency requests remain private</span><span>✓ Feedback is visible to administrators</span></div>
              </div>
              <div className="auth-form">
                <span className="eyebrow dark">ADMIN LOGIN</span>
                <h2>Sign in to the operations console</h2>
                {error && <div className="alert alert-danger border-0">{error}</div>}
                <form onSubmit={submit}>
                  <label>Administrator email</label>
                  <div className="input-icon"><FaEnvelope /><input type="email" placeholder="admin@bloodconnect.gov.in" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></div>
                  <label>Password</label>
                  <div className="input-icon"><FaLock /><input type="password" placeholder="Administrator password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required /></div>
                  <button className="btn btn-danger btn-lg w-100 rounded-pill mt-3" disabled={loading}>{loading ? "Signing in..." : <>Open Admin Console <FaArrowRight className="ms-2" /></>}</button>
                </form>
                <p className="text-muted mt-4 mb-0"><Link to="/login">← Back to Donor Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;
