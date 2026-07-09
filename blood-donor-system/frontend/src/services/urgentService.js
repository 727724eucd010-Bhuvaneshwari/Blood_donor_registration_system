import api from "../api/axiosInstance";

const urgentService = {

    getAllRequests: async () => {

        const response = await api.get("/urgent-requests");

        return response.data;

    },

    createRequest: async (requestData) => {

        const response = await api.post(

            "/urgent-requests",

            requestData

        );

        return response.data;

    },

    getMatchingDonors: async (requestId) => {

        const response = await api.get(

            `/urgent-requests/${requestId}/matches`

        );

        return response.data;

    }

};

export default urgentService;