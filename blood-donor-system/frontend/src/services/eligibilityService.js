import api from "../api/axiosInstance";

const eligibilityService = {

    checkEligibility: async (screeningData) => {

        const response = await api.post(
            "/eligibility/check",
            screeningData
        );

        return response.data;

    }

};

export default eligibilityService;
