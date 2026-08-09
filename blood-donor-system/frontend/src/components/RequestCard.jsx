import { FaMapMarkerAlt, FaTint, FaBolt, FaLock } from "react-icons/fa";

function RequestCard({ request, onViewMatches, isAuthenticated }) {
  return (
    <div className="request-card mb-3">
      <div className="d-flex justify-content-between gap-3">
        <div>
          <span className={`urgency-tag ${request.urgency === "CRITICAL" ? "critical" : ""}`}>
            <FaBolt /> {request.urgency || "HIGH"}
          </span>
          <h5 className="mt-2 mb-1">{request.patientName || "Patient request"}</h5>
          <p className="text-muted mb-0">{request.requestingFacility}</p>
        </div>
        <span className="blood-chip large"><FaTint /> {request.bloodGroup}</span>
      </div>

      <div className="request-meta mt-3">
        <span>{request.quantityRequired} unit(s)</span>
        <span><FaMapMarkerAlt /> {request.city}</span>
      </div>

      <button
        className="btn btn-sm btn-outline-danger rounded-pill mt-3"
        onClick={() => onViewMatches(request.requestId)}
      >
        {isAuthenticated ? "Find compatible donors" : (
          <>
            <FaLock className="me-1" /> Sign in to find compatible donors
          </>
        )}
      </button>
    </div>
  );
}

export default RequestCard;
