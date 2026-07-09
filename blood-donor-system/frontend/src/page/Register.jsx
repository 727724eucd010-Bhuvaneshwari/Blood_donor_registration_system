import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    password: "",

    role: "USER"

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await authService.register(formData);

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      alert("Registration Failed");

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

      <div className="row">

        <div
          className="col-lg-5 text-white d-flex align-items-center"
          style={{
            background:
              "linear-gradient(to bottom,#dc3545,#b71c1c)"
          }}
        >

          <div className="p-5">

            <h1 className="display-5 fw-bold">

              Become a Donor ❤️

            </h1>

            <p className="lead mt-4">

              Register yourself and become
              part of our BloodConnect family.

            </p>

          </div>

        </div>

        <div className="col-lg-7">

          <div
            className="card shadow-lg border-0 mx-auto mt-5"
            style={{
              maxWidth: "600px",
              borderRadius: "20px"
            }}
          >

            <div className="card-body p-5">

              <h2 className="text-center text-danger mb-4">

                Register

              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label>Name</label>

                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-4">

                  <label>Role</label>

                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >

                    <option value="USER">

                      USER

                    </option>

                    <option value="ADMIN">

                      ADMIN

                    </option>

                  </select>

                </div>

                <button
                  className="btn btn-danger w-100"
                >

                  Register

                </button>

              </form>

              <p className="text-center mt-4">

                Already have an account?

                <Link
                  to="/login"
                  className="ms-2"
                >
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;