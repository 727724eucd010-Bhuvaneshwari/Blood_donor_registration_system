import { useEffect, useState } from "react";
import { FaSearch, FaCheckCircle, FaClock } from "react-icons/fa";
import bloodBankService from "../services/bloodBankService";

function BloodBanks() {

  const [centers, setCenters] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCenters();
  }, []);

  const loadCenters = async () => {
    setLoading(true);
    try {
      const data = await bloodBankService.getAllCenters();
      setCenters(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) { loadCenters(); return; }
    setLoading(true);
    try {
      const data = await bloodBankService.searchByCity(city);
      setCenters(data);
    } catch (error) {
      setCenters([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="gov-section-title">
        <h2>Blood Bank Directory</h2>
        <p>Government-recognized and voluntary blood donation centers</p>
      </div>

      <form className="gov-search-panel" onSubmit={handleSearch}>
        <div className="row g-3 align-items-end">
          <div className="col-md-8">
            <label>Search by City / District</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Coimbatore"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-danger w-100 rounded-1">
              <FaSearch className="me-2" /> Search Directory
            </button>
          </div>
        </div>
      </form>

      {loading && <p className="text-muted">Loading directory...</p>}

      <div className="gov-table-wrap">
        <table className="gov-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Blood Bank / Center Name</th>
              <th>City</th>
              <th>Pincode</th>
              <th>Contact Number</th>
              <th>Operating Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {centers.length > 0 ? (
              centers.map((center, index) => (
                <tr key={center.centerId}>
                  <td>{index + 1}</td>
                  <td className="fw-semibold">{center.name}</td>
                  <td>{center.city}</td>
                  <td>{center.pincode || "-"}</td>
                  <td>{center.contactNumber || "-"}</td>
                  <td><FaClock className="me-1 text-muted" />{center.operatingHours || "-"}</td>
                  <td>
                    {center.verified ? (
                      <span className="gov-status-badge gov-status-verified"><FaCheckCircle className="me-1" />Verified</span>
                    ) : (
                      <span className="gov-status-badge gov-status-pending">Pending Verification</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No blood banks found{city ? ` for "${city}"` : ""}.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <p className="text-muted small mt-3">
        Showing {centers.length} center{centers.length !== 1 ? "s" : ""}. Contact the center directly to confirm current stock before visiting.
      </p>
    </div>
  );
}

export default BloodBanks;
