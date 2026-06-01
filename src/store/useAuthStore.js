import { create } from 'zustand'

const useAuthStore = create((set) => ({
    token: localStorage.getItem("token"),
    tempToken: localStorage.getItem("tempToken"),

    setToken: (newToken) => {
        set({
            token: newToken
        })

        localStorage.setItem('token', newToken)
    },

    setTempToken: (token) => {
        set({
            tempToken: token
        })

        localStorage.setItem('tempToken', token)
    },

    clearTempToken: () => {
        set({
            tempToken: null
        })

        localStorage.removeItem('tempToken')
    },

    logout: () => {
        set({
            token: null,
            tempToken: null
        })

        localStorage.removeItem('token')
        localStorage.removeItem('tempToken')
    }

}))

export default useAuthStore