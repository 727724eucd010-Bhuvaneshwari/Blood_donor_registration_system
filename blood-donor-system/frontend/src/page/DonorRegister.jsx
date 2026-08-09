import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import donorService from "../services/donorService";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function DonorRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
    phoneNumber: "",
    bloodGroup: "",
    city: "",
    gender: "",
    age: ""
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSubmitting(true);

    try {

      const payload = {
        ...formData,
        age: formData.age ? Number(formData.age) : null
      };

      await donorService.registerDonor(payload);

      alert("Thank you! You're now listed as a blood donor.");

      navigate("/donors");

    } catch (error) {

      console.error(error);
      alert("Failed to register as donor.");

    } finally {

      setSubmitting(false);

    }

  };

  return (

    <div className="container py-5">

      <div className="text-center mb-5">

        <h1 className="fw-bold text-danger">
          <FaUserPlus className="me-2" />
          Become a Blood Donor
        </h1>

        <p className="text-muted">
          Register your profile so patients can find you when it matters most.
        </p>

      </div>

      <div
        className="card shadow-lg border-0 mx-auto"
        style={{ maxWidth: "650px", borderRadius: "20px" }}
      >

        <div className="card-body p-5">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Full Name</label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

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

              <div className="col-md-6 mb-3">

                <label>Phone Number</label>

                <input
                  type="tel"
                  className="form-control"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label>Blood Group</label>

                <select
                  className="form-select"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                >

                  <option value="">Select Blood Group</option>

                  {
                    BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))
                  }

                </select>

              </div>

              <div className="col-md-6 mb-3">

                <label>City</label>

                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-4">

                <label>Gender</label>

                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >

                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>

                </select>

              </div>

              <div className="col-md-6 mb-4">

                <label>Age</label>

                <input
                  type="number"
                  className="form-control"
                  name="age"
                  min="18"
                  max="65"
                  value={formData.age}
                  onChange={handleChange}
                />

              </div>

            </div>

            <button className="btn btn-danger w-100" disabled={submitting}>
              {submitting ? "Submitting..." : "Register as Donor"}
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default DonorRegister;
