import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://backend-project-nwve.onrender.com/api",
    headers: {
        "Accept-Language": "en",
    },
})

export default axiosInstance;