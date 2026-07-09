import { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";
import urgentService from "../services/urgentService";

function UrgentRequests() {

  const [requests, setRequests] = useState([]);
  const [matches, setMatches] = useState([]);

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    location: ""
  });

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {

      const data = await urgentService.getAllRequests();

      setRequests(data);

    } catch (error) {

      console.error(error);

    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await urgentService.createRequest(formData);

      alert("Blood request created successfully.");

      setFormData({
        patientName: "",
        bloodGroup: "",
        hospital: "",
        location: ""
      });

      loadRequests();

    } catch (error) {

      alert("Unable to create request.");

    }

  };

  const loadMatches = async (id) => {

    try {

      const data = await urgentService.getMatchingDonors(id);

      setMatches(data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="container py-5">

      <div className="text-center mb-5">

        <h1 className="fw-bold text-danger">

          🚨 Urgent Blood Requests

        </h1>

        <p className="text-muted">

          Create emergency blood requests and find matching donors instantly.

        </p>

      </div>

      {/* Request Form */}

      <div className="card shadow border-0 mb-5">

        <div className="card-body p-4">

          <h4 className="mb-4">

            Create Blood Request

          </h4>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Patient Name"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <select
                  className="form-select"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                >

                  <option value="">Select Blood Group</option>

                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>

                </select>

              </div>

              <div className="col-md-6 mb-3">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Hospital Name"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <button
              className="btn btn-danger px-4"
            >
              Submit Request
            </button>

          </form>

        </div>

      </div>

      {/* All Requests */}

      <h3 className="mb-4">

        Recent Blood Requests

      </h3>

      {

        requests.length > 0 ?

          requests.map((request) => (

            <RequestCard

              key={request.id}

              request={request}

              onViewMatches={loadMatches}

            />

          ))

          :

          <div className="alert alert-warning">

            No blood requests available.

          </div>

      }

      {/* Matching Donors */}

      {

        matches.length > 0 && (

          <>

            <hr className="my-5" />

            <h3 className="text-success mb-4">

              Matching Donors

            </h3>

            <div className="row">

              {

                matches.map((donor) => (

                  <div
                    className="col-md-4 mb-4"
                    key={donor.id}
                  >

                    <div className="card shadow border-0">

                      <div className="card-body">

                        <h4>

                          {donor.name}

                        </h4>

                        <span className="badge bg-danger mb-3">

                          {donor.bloodGroup}

                        </span>

                        <p>

                          <strong>📞 Phone :</strong>

                          {" "}

                          {donor.phone}

                        </p>

                        <p>

                          <strong>📍 City :</strong>

                          {" "}

                          {donor.city}

                        </p>

                      </div>

                    </div>

                  </div>

                ))

              }

            </div>

          </>

        )

      }

    </div>

  );

}

export default UrgentRequests;