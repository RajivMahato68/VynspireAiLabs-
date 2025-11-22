import { create } from "zustand";

type User = Record<string, unknown>;

interface AuthState {
  loggedIn: boolean;
  token: string | null;
  user: User | null;
  setToken: (token: string, user: User) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  token: null,
  user: null,

  setToken: (token, user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
    }
    set({ token, user, loggedIn: true });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    }
    set({ token: null, user: null, loggedIn: false });
  },

  hydrate: () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    if (token && user) {
      set({ token, user: JSON.parse(user) as User, loggedIn: true });
    }
  },
}));
