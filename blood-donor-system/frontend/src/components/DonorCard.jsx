import { FaPhone, FaMapMarkerAlt, FaTint } from "react-icons/fa";

function DonorCard({ donor }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">

      <div
        className="card border-0 shadow h-100"
        style={{ borderRadius: "15px" }}
      >

        <div className="card-body">

          <div className="d-flex justify-content-between">

            <h4 className="fw-bold">{donor.name}</h4>

            <span className="badge bg-danger fs-6">
              {donor.bloodGroup}
            </span>

          </div>

          <hr />

          <p>

            <FaPhone className="text-danger me-2" />

            {donor.phone}

          </p>

          <p>

            <FaMapMarkerAlt className="text-danger me-2" />

            {donor.city}

          </p>

          <p>

            <FaTint className="text-danger me-2" />

            {donor.available ? (
              <span className="badge bg-success">
                Available
              </span>
            ) : (
              <span className="badge bg-secondary">
                Not Available
              </span>
            )}

          </p>

        </div>

      </div>

    </div>
  );
}

export default DonorCard;