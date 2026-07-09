import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await authService.login(loginData);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid Email or Password");

    }

  };

  return (

    <div
      className="container-fluid"
      style={{
        minHeight: "90vh",
        background: "#f8f9fa"
      }}
    >

      <div className="row h-100">

        <div
          className="col-lg-6 d-flex flex-column justify-content-center text-white"
          style={{
            background:
              "linear-gradient(to right,#dc3545,#b71c1c)"
          }}
        >

          <div className="p-5">

            <h1 className="display-4 fw-bold">

              Welcome Back ❤️

            </h1>

            <p className="lead mt-4">

              Login to access BloodConnect and
              help save lives.

            </p>

          </div>

        </div>

        <div className="col-lg-6 d-flex align-items-center">

          <div
            className="card shadow-lg border-0 mx-auto"
            style={{
              width: "450px",
              borderRadius: "20px"
            }}
          >

            <div className="card-body p-5">

              <h2 className="text-center text-danger mb-4">

                Login

              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-4">

                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <button
                  className="btn btn-danger w-100"
                >

                  Login

                </button>

              </form>

              <p className="text-center mt-4">

                New User?

                <Link
                  to="/register"
                  className="ms-2"
                >
                  Register
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;