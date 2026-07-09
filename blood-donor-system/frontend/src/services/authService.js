import api from "../api/axiosInstance";

const authService = {

    register: async (userData) => {

        const response = await api.post("/auth/register", userData);

        return response.data;

    },

    login: async (loginData) => {

        const response = await api.post("/auth/login", loginData);

        /*
           If your backend returns a JWT token,
           it will be stored automatically.
        */

        if (response.data.token) {

            localStorage.setItem("token", response.data.token);

        }

        /*
           Save username for profile display.
           If backend doesn't return name,
           email will be shown.
        */

        localStorage.setItem(

            "userName",

            response.data.name || loginData.email

        );

        return response.data;

    },

    logout: () => {

        localStorage.removeItem("token");

        localStorage.removeItem("userName");

    }

};

export default authService;