import axios from 'axios'

const token = localStorage.getItem("token")
const AuthAxiosInstance = axios.create({
    baseURL: "https://backend-project-nwve.onrender.com/api",
    headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${token}`

    }
})
export default AuthAxiosInstance;