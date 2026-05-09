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

// import { create } from "zustand"

// const useAuthStore = create((set) => ({
//   token: localStorage.getItem("token"),
//   tempToken: null,

//   setTempToken: (tempToken) => set({ tempToken }),

//   setToken: (token) => {
//     set({ token })
//     localStorage.setItem("token", token)
//   },

//   logout: () => {
//     set({ token: null, tempToken: null })
//     localStorage.removeItem("token")
//   }
// }))

// export default useAuthStore