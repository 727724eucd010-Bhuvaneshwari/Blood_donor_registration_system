import api from "../api/axiosInstance";

const bloodBankService = {

    getAllCenters: async () => {

        const response = await api.get("/centers");

        return response.data;

    },

    searchByCity: async (city) => {

        const response = await api.get(
            "/centers/search",
            { params: { city } }
        );

        return response.data;

    }

};

export default bloodBankService;
