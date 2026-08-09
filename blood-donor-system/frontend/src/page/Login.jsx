import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import authService from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const data = await authService.login(form);
      if (data.role === "ADMIN") {
        authService.logout();
        setError("Administrator accounts must use the separate Admin Login.");
        return;
      }
      const target = location.state?.from || "/dashboard";
      navigate(target, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || "Unable to sign in. Check your credentials.");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="container py-5">
        <div className="row justify-content-center align-items-center min-vh-75">
          <div className="col-lg-10">
            <div className="auth-shell">
              <div className="auth-side">
                <span className="auth-logo"><FaShieldAlt /></span>
                <span className="eyebrow">SECURE ACCESS</span>
                <h1>Welcome back.</h1>
                <p>Your account gives you access to appointments, emergency workflows and personalized donor activity.</p>
                <div className="auth-points"><span>✓ JWT session protection</span><span>✓ BCrypt password hashing</span><span>✓ Role-based access</span></div>
              </div>
              <div className="auth-form">
                <span className="eyebrow dark">ACCOUNT LOGIN</span>
                <h2>Sign in to BloodConnect</h2>
                {error && <div className="alert alert-danger border-0">{error}</div>}
                <form onSubmit={submit}>
                  <label>Email address</label>
                  <div className="input-icon"><FaEnvelope /><input type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></div>
                  <label>Password</label>
                  <div className="input-icon"><FaLock /><input type="password" placeholder="Minimum 8 characters" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required /></div>
                  <button className="btn btn-danger btn-lg w-100 rounded-pill mt-3" disabled={loading}>{loading ? "Signing in..." : <>Sign in <FaArrowRight className="ms-2" /></>}</button>
                </form>
                <p className="text-muted mt-4 mb-0">New to BloodConnect? <Link to="/register">Create an account</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
