import { create } from "zustand";

interface User {
  id: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
