import { useEffect, useState } from "react";
import DonorCard from "../components/DonorCard";
import donorService from "../services/donorService";

function Donors() {

  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {

      const response = await donorService.getAllDonors();

      setDonors(response);
      setFilteredDonors(response);

    } catch (error) {

      console.error(error);
      alert("Failed to load donors.");

    }
  };

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    const filtered = donors.filter((donor) =>

      donor.name?.toLowerCase().includes(value.toLowerCase()) ||

      donor.city?.toLowerCase().includes(value.toLowerCase()) ||

      donor.bloodGroup?.toLowerCase().includes(value.toLowerCase())

    );

    setFilteredDonors(filtered);

  };

  return (

    <div className="container py-5">

      <div className="text-center mb-5">

        <h1 className="fw-bold text-danger">

          Blood Donor Directory

        </h1>

        <p className="text-muted">

          Search registered blood donors by
          name, city or blood group.

        </p>

      </div>

      <div className="row justify-content-center mb-5">

        <div className="col-lg-6">

          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            placeholder="🔍 Search by Name, City or Blood Group"
            value={search}
            onChange={handleSearch}
          />

        </div>

      </div>

      <div className="row">

        {

          filteredDonors.length > 0 ?

            filteredDonors.map((donor) => (

              <DonorCard

                key={donor.id}

                donor={donor}

              />

            ))

            :

            (

              <div className="text-center">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486800.png"
                  width="180"
                  alt="No Donors"
                />

                <h4 className="mt-4 text-secondary">

                  No Donors Found

                </h4>

              </div>

            )

        }

      </div>

    </div>

  );

}

export default Donors;