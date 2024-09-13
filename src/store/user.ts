/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface Type {
  user: null | JSON;
  setUser: (data: any) => void;
}
export const useUserStore = create<Type>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
