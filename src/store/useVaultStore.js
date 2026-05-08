import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useVaultStore = create(
  persist(
    (set) => ({
      masterPassword: "",
      setMasterPassword: (password) => set({ masterPassword: password }),
      clearMasterPassword: () => set({ masterPassword: "" }),
    }),
    {
      name: "vault-storage",
      storage: createJSONStorage(() => sessionStorage),
      
    }
  )
);

export default useVaultStore;