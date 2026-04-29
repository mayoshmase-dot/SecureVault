import { create } from "zustand";
import { persist } from "zustand/middleware";

const useVaultStore = create(
  persist(
    (set) => ({
      masterPassword: "",

      setMasterPassword: (password) =>
        set({ masterPassword: password }),

      clearMasterPassword: () =>
        set({ masterPassword: "" }),
    }),
    {
      name: "vault-storage",
    }
  )
);

export default useVaultStore;