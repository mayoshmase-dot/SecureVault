import axios from 'axios'
import useAuthStore from '../store/useAuthStore'

const AuthAxiosInstance = axios.create({
    baseURL: "https://backend-project-nwve.onrender.com/api",
    headers: {
        "Accept-Language": "en",
    },
})

AuthAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

AuthAxiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem("refreshToken")

                const refreshResponse = await axios.post(
                    'https://backend-project-nwve.onrender.com/api/auth/refresh-token',
                    { refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )

                const newAccessToken = refreshResponse.data.accessToken

                useAuthStore.getState().setToken(newAccessToken)

                localStorage.setItem("token", newAccessToken)

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`

                return AuthAxiosInstance(originalRequest)
            }

            catch (err) {
                localStorage.removeItem("token")
                localStorage.removeItem("refreshToken")

                useAuthStore.getState().logout?.()

                window.location.href = "/login"

                return Promise.reject(err)
            }
        }

        return Promise.reject(error)
    }
)

export default AuthAxiosInstance