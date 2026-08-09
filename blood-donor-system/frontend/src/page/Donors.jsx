import { useEffect, useState } from "react";
import { FaSearch, FaTint, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import DonorCard from "../components/DonorCard";
import donorService from "../services/donorService";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const PAGE_SIZE = 9;
const COMPATIBLE = {
  "O-": ["O-"], "O+": ["O+", "O-"], "A-": ["A-", "O-"],
  "A+": ["A+", "A-", "O+", "O-"], "B-": ["B-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"], "AB-": ["AB-", "A-", "B-", "O-"],
  "AB+": ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"]
};

function Donors() {

  const [city, setCity] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const [donors, setDonors] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    runSearch(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runSearch = async (pageNumber) => {

    setLoading(true);

    try {

      const data = await donorService.searchDonors(
        city,
        bloodGroup,
        pageNumber,
        PAGE_SIZE
      );

      setDonors(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
      setPage(pageNumber);
      setSearched(true);

    } catch (error) {

      console.error(error);
      alert("Failed to search donors.");

    } finally {

      setLoading(false);

    }

  };

  const handleSearch = (e) => {

    e.preventDefault();

    runSearch(0);

  };

  const handlePageClick = (n) => {

    if (n < 0 || n >= totalPages) return;

    runSearch(n);

    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (

    <div>

      {/* Hero / Search Panel */}

      <div className="search-hero text-center">

        <h1 className="display-5">Search Blood Donors</h1>

        <p className="mb-0 fs-5">
          A Drop of Water Makes an Ocean. A Unit of Blood Saves a Life.
        </p>

      </div>

      <div className="container">

        <div className="search-panel">

          <form className="row g-3 align-items-end" onSubmit={handleSearch}>

            <div className="col-md-5">

              <label className="fw-semibold mb-1">
                <FaMapMarkerAlt className="text-danger me-1" />
                City / District
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="e.g. Coimbatore"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

            </div>

            <div className="col-md-4">

              <label className="fw-semibold mb-1">
                <FaTint className="text-danger me-1" />
                Blood Group
              </label>

              <select
                className="form-select"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >

                <option value="">All Groups</option>

                {
                  BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))
                }

              </select>

            </div>

            <div className="col-md-3">

              <button className="btn btn-danger w-100" style={{ height: "50px" }}>
                <FaSearch className="me-2" />
                Search
              </button>

            </div>

          </form>

        </div>

        {bloodGroup && (
          <div className="compatibility-note mt-4">
            <strong>Compatibility for a {bloodGroup} recipient:</strong> donors with {COMPATIBLE[bloodGroup].join(", ")} blood group(s) can be considered for this demo matching workflow.
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center flex-wrap mt-5 mb-3">

          <h4 className="fw-bold mb-0">
            {searched ? `${totalElements} Donor${totalElements === 1 ? "" : "s"} Found` : "Blood Donors List"}
          </h4>

          <Link to="/donor-register" className="btn btn-outline-danger btn-sm">
            + Register as Donor
          </Link>

        </div>

        {loading && <p className="text-center text-muted">Searching donors...</p>}

        <div className="row">

          {
            !loading && donors.length > 0 ?

              donors.map((donor) => (
                <DonorCard key={donor.id} donor={donor} />
              ))

              :

              !loading && (

                <div className="text-center py-5">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/7486/7486800.png"
                    width="140"
                    alt="No Donors"
                  />

                  <h4 className="mt-4 text-secondary">No Donors Found</h4>

                  <p className="text-muted">
                    Try a different city or blood group, or be the first to
                    {" "}
                    <Link to="/donor-register" className="text-danger fw-semibold">
                      register as a donor
                    </Link>.
                  </p>

                </div>

              )
          }

        </div>

        {/* Pagination */}

        {
          totalPages > 1 && (

            <nav className="d-flex justify-content-center my-5">

              <ul className="pagination custom-pagination">

                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => handlePageClick(page - 1)}>
                    Prev
                  </button>
                </li>

                {
                  pageNumbers.map((n) => (

                    <li className={`page-item ${n === page ? "active" : ""}`} key={n}>
                      <button className="page-link" onClick={() => handlePageClick(n)}>
                        {n + 1}
                      </button>
                    </li>

                  ))
                }

                <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => handlePageClick(page + 1)}>
                    Next
                  </button>
                </li>

              </ul>

            </nav>

          )
        }

      </div>

    </div>

  );

}

export default Donors;
