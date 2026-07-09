import api from "../api/axiosInstance";

const donorService = {

    getAllDonors: async () => {

        const response = await api.get("/test");

        return response.data;

    }

};

export default donorService;