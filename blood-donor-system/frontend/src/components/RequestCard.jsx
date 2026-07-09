import { FaHospital, FaMapMarkerAlt, FaTint } from "react-icons/fa";

function RequestCard({ request, onViewMatches }) {
  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center">
          <h4>{request.requestingFacility}</h4>

          <span className="badge bg-danger fs-6">
            {request.bloodGroup}
          </span>
        </div>

        <hr />

        <p>
          <FaHospital className="text-danger me-2" />
          Hospital: {request.requestingFacility}
        </p>

        <p>
          <FaMapMarkerAlt className="text-danger me-2" />
          City: {request.city}
        </p>

        <p>
          <strong>Units Required:</strong> {request.quantityRequired}
        </p>

        <button
          className="btn btn-danger"
          onClick={() => onViewMatches(request.requestId)}
        >
          <FaTint className="me-2" />
          View Matching Donors
        </button>

      </div>
    </div>
  );
}

export default RequestCard;