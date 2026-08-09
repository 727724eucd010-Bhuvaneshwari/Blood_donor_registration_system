import { FaMapMarkerAlt, FaTint, FaUser, FaCalendarCheck } from "react-icons/fa";

function DonorCard({ donor }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">

      <div className="donor-card card border-0 shadow h-100">

        <div className="donor-card-header">

          <span className="donor-blood-badge">
            {donor.bloodGroup}
          </span>

          {
            donor.available ? (
              <span className="badge bg-success">Available</span>
            ) : (
              <span className="badge bg-secondary">
                Not Available
              </span>
            )
          }

        </div>

        <div className="card-body">

          <h4 className="fw-bold mb-1">
            <FaUser className="text-danger me-2" />
            {donor.name}
          </h4>

          {
            (donor.age || donor.gender) && (

              <p className="text-muted small mb-3">
                {donor.gender || ""}{donor.age ? ` · ${donor.age} yrs` : ""}
              </p>

            )
          }

          <hr />

          <p className="mb-2">
            <FaMapMarkerAlt className="text-danger me-2" />
            {donor.city || "N/A"}
          </p>

          <p className="mb-2 text-muted small">🔒 Contact details are shared only through authorized workflows.</p>

          {
            donor.nextEligibleDate && (

              <p className="mb-0">
                <FaCalendarCheck className="text-danger me-2" />
                Next eligible: {donor.nextEligibleDate}
              </p>

            )
          }

        </div>

      </div>

    </div>
  );
}

export default DonorCard;
