import { useEffect, useState } from "react";
import { FaTint, FaMapMarkerAlt } from "react-icons/fa";
import bloodStockService from "../services/bloodStockService";

const statusColor = (level) => {

  switch ((level || "").toLowerCase()) {
    case "low":
      return "bg-danger";
    case "medium":
      return "bg-warning text-dark";
    case "high":
      return "bg-success";
    default:
      return "bg-secondary";
  }

};

function BloodStock() {

  const [stock, setStock] = useState([]);
  const [region, setRegion] = useState("");

  const [formData, setFormData] = useState({
    bloodGroup: "",
    region: "",
    statusLevel: "medium"
  });

  useEffect(() => {
    loadStock();
  }, []);

  const loadStock = async () => {

    try {

      const data = await bloodStockService.getAllStock();

      setStock(data);

    } catch (error) {

      console.error(error);
      alert("Failed to load blood stock.");

    }

  };

  const handleFilter = async (e) => {

    e.preventDefault();

    if (!region.trim()) {
      loadStock();
      return;
    }

    try {

      const data = await bloodStockService.getStockByRegion(region);

      setStock(data);

    } catch (error) {

      console.error(error);
      alert("Failed to filter stock.");

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

      await bloodStockService.updateStock(formData);

      alert("Stock updated successfully.");

      setFormData({
        bloodGroup: "",
        region: "",
        statusLevel: "medium"
      });

      loadStock();

    } catch (error) {

      console.error(error);
      alert("Failed to update stock.");

    }

  };

  return (

    <div className="container py-5">

      <div className="text-center mb-5">

        <h1 className="fw-bold text-danger">
          🩸 Blood Stock Status
        </h1>

        <p className="text-muted">
          Track blood availability by group and region.
        </p>

      </div>

      {/* Update Stock */}

      <div className="card shadow border-0 mb-5">

        <div className="card-body p-4">

          <h4 className="mb-4">Update Stock</h4>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-4 mb-3">

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

              <div className="col-md-4 mb-3">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-4 mb-3">

                <select
                  className="form-select"
                  name="statusLevel"
                  value={formData.statusLevel}
                  onChange={handleChange}
                >

                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>

                </select>

              </div>

            </div>

            <button className="btn btn-danger px-4">
              Update Stock
            </button>

          </form>

        </div>

      </div>

      {/* Filter */}

      <form
        className="row justify-content-center mb-5"
        onSubmit={handleFilter}
      >

        <div className="col-lg-5 mb-2">

          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            placeholder="Filter by region..."
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />

        </div>

        <div className="col-lg-2 mb-2">

          <button className="btn btn-danger btn-lg w-100">
            Filter
          </button>

        </div>

      </form>

      {/* Stock Table */}

      <div className="table-responsive">

        <table className="table table-hover align-middle shadow-sm">

          <thead className="table-danger">

            <tr>
              <th>Blood Group</th>
              <th>Region</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {
              stock.length > 0 ?

                stock.map((item) => (

                  <tr key={item.statusId}>

                    <td>
                      <FaTint className="text-danger me-2" />
                      {item.bloodGroup}
                    </td>

                    <td>
                      <FaMapMarkerAlt className="text-danger me-2" />
                      {item.region}
                    </td>

                    <td>
                      <span className={`badge ${statusColor(item.statusLevel)}`}>
                        {item.statusLevel}
                      </span>
                    </td>

                  </tr>

                ))

                :

                (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      No stock records found.
                    </td>
                  </tr>
                )
            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default BloodStock;
