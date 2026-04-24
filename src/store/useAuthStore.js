import { create } from 'zustand'

const useAuthStore = create((set) => ({
    token: localStorage.getItem("token"),
    setToken: (newToken) => {
        set({
            token: newToken
        })
        localStorage.setItem('token', newToken)
    },
    logout: () => {
        set({
            token: null
        })
        localStorage.removeItem('token')
    }

}))

export default useAuthStore;