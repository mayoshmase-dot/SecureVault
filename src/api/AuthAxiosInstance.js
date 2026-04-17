import axios from 'axios'

const AuthAxiosInstance = axios.create({
    baseURL: "https://backend-project-nwve.onrender.com/api",
    headers: {
        "Accept-Language": "en",
    }
})

// interceptor بياخذ التوكن دايماً من localStorage وقت الطلب مش وقت الـ import
AuthAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default AuthAxiosInstance