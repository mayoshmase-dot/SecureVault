import axios from 'axios'

const AuthAxiosInstance = axios.create({
    baseURL: "https://backend-project-nwve.onrender.com/api",
    headers: {
        "Accept-Language": "en",
    }
})

AuthAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default AuthAxiosInstance;