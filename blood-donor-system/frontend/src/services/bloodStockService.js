import api from "../api/axiosInstance";

const bloodStockService = {

    getAllStock: async () => {

        const response = await api.get("/stock");

        return response.data;

    },

    getStockByRegion: async (region) => {

        const response = await api.get(
            "/stock/region",
            { params: { region } }
        );

        return response.data;

    },

    updateStock: async (stockData) => {

        const response = await api.post(
            "/stock",
            stockData
        );

        return response.data;

    }

};

export default bloodStockService;
