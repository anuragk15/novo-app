/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface UserType {
  username: string;
  email: string;
  createdAt: string;
  photo: string;
  id: string;
}

interface Type {
  user: null | UserType;
  setUser: (data: any) => void;
}
export const useUserStore = create<Type>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
