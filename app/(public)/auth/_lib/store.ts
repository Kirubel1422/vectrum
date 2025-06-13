import { User } from "@/lib/types/user.types";
import { create } from "zustand";

type TUser = Omit<User, "password"> & {
  created_at: string;
  updated_at: string;
};

interface UserState {
  user: TUser | null;
  setUser: (user: TUser) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user: TUser) => set({ user }),
  removeUser: () => set({ user: null }),
}));
