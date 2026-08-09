import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import authService from "../services/authService";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName:"", email:"", phoneNumber:"", password:"", confirmPassword:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) return setError("Password must contain at least 8 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    setError(""); setLoading(true);
    try {
      await authService.register({ fullName:form.fullName, email:form.email, phoneNumber:form.phoneNumber, password:form.password });
      navigate("/dashboard", { replace:true });
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    } finally { setLoading(false); }
  };

  const field = (name, icon, type="text", placeholder="") => (
    <div className="input-icon"><span>{icon}</span><input type={type} placeholder={placeholder} value={form[name]} onChange={e=>setForm({...form,[name]:e.target.value})} required /></div>
  );

  return (
    <div className="auth-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="auth-shell">
              <div className="auth-side register-side">
                <span className="auth-logo">🩸</span>
                <span className="eyebrow">JOIN THE NETWORK</span>
                <h1>One account.<br/>More ways to help.</h1>
                <p>Register once and manage your donor journey, appointments and emergency responses from one secure dashboard.</p>
                <div className="donor-quote">“The easiest donation is the one you were ready for.”</div>
              </div>
              <div className="auth-form">
                <span className="eyebrow dark">CREATE ACCOUNT</span>
                <h2>Become part of the network</h2>
                {error && <div className="alert alert-danger border-0">{error}</div>}
                <form onSubmit={submit}>
                  <label>Full name</label>{field("fullName", <FaUser />, "text", "Your full name")}
                  <label>Email</label>{field("email", <FaEnvelope />, "email", "you@example.com")}
                  <label>Phone number</label>{field("phoneNumber", <FaPhone />, "tel", "10-digit mobile number")}
                  <div className="row">
                    <div className="col-md-6"><label>Password</label>{field("password", <FaLock />, "password", "At least 8 characters")}</div>
                    <div className="col-md-6"><label>Confirm password</label>{field("confirmPassword", <FaLock />, "password", "Repeat password")}</div>
                  </div>
                  <div className="security-note mt-3">🔒 Your password is stored using BCrypt. Public registration can only create a DONOR account; administrator access is never self-selectable.</div>
                  <button className="btn btn-danger btn-lg w-100 rounded-pill mt-3" disabled={loading}>{loading ? "Creating account..." : <>Create account <FaArrowRight className="ms-2" /></>}</button>
                </form>
                <p className="text-muted mt-4 mb-0">Already registered? <Link to="/login">Sign in</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
