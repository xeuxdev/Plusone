import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  name: string;
  email: string;
}

interface UserState {
  user: User | null;

  setUser: (user: User) => void;
  logout: () => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      error: null,

      setUser(user) {
        set({ user });
      },

      logout: () => set({ user: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
