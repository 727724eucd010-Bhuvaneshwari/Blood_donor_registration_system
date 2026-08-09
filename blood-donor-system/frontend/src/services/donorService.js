import api from "../api/axiosInstance";

const donorService = {

  getAllDonors: async () => {
    const response = await api.get("/test");
    return response.data;
  },

  searchDonors: async (city, bloodGroup, page = 0, size = 9) => {
    const response = await api.get("/donors/search", {
      params: {
        city,
        bloodGroup,
        page,
        size
      }
    });

    return response.data;
  },

  getCities: async () => {
    const response = await api.get("/donors/cities");
    return response.data;
  },

  getMyProfile: async () => {
    const response = await api.get("/donors/me");

    return {
      ...response.data,
      available: response.data.available === true
    };
  },

  registerDonor: async (donorData) => {
    const response = await api.post("/donors/register", donorData);
    return response.data;
  }

};

export default donorService;