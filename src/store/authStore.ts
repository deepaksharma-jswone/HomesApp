import { create } from 'zustand';
import type { User } from '../types/users';

type AuthStatus = 'guest' | 'loading' | 'authenticated';

type AuthStore = {
  status: AuthStatus;
  user: User | null;
  setLoading: () => void;
  setGuest: () => void;
  setAuthenticated: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>(set => ({
  status: 'loading',
  user: null,
  setLoading: () => set({ status: 'loading', user: null }),
  setGuest: () => set({ status: 'guest', user: null }),
  setAuthenticated: user => set({ status: 'authenticated', user }),
  logout: () => set({ status: 'guest', user: null }),
}));
