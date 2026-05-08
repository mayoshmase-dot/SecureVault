import { create } from "zustand"

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  tempToken: null,

  setTempToken: (tempToken) => set({ tempToken }),

  setToken: (token) => {
    set({ token })
    localStorage.setItem("token", token)
  },

  logout: () => {
    set({ token: null, tempToken: null })
    localStorage.removeItem("token")
  }
}))

export default useAuthStore