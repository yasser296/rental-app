import { create } from "zustand";
import { loginDemo, registerDemo } from "@/api/auth.api";
import { Role, User } from "@/types/models";

type AuthState = {
  user: User | null;
  token: string | null;
  selectedRole: Role;
  loading: boolean;
  setSelectedRole: (role: Role) => void;
  loginAs: (role?: Role) => Promise<void>;
  registerAs: (data: { nom: string; email: string; role: Role }) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  selectedRole: "client",
  loading: false,
  setSelectedRole: (role) => set({ selectedRole: role }),
  loginAs: async (role = get().selectedRole) => {
    set({ loading: true });
    const session = await loginDemo(role);
    set({ ...session, selectedRole: role, loading: false });
  },
  registerAs: async ({ nom, email, role }) => {
    set({ loading: true });
    const session = await registerDemo(role, nom, email);
    set({ ...session, selectedRole: role, loading: false });
  },
  logout: () => set({ user: null, token: null, selectedRole: "client" })
}));
