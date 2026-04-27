// src/services/authService.ts
import type { User } from '../types/user';

// Simulates network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Fake user database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'test@test.com': {
    password: 'password123',
    user: {
      id: '1',
      name: 'Deepak Sharma',
      email: 'test@test.com',
      avatarUrl: undefined,
    },
  },
};

export const authService = {
  async login(email: string, password: string): Promise<User> {
    await delay(1000); // simulate network
    const record = MOCK_USERS[email.toLowerCase()];
    if (!record || record.password !== password) {
      throw new Error('Invalid email or password');
    }
    return record.user;
  },

  async signup(name: string, email: string, password: string): Promise<User> {
    await delay(1000);
    if (MOCK_USERS[email.toLowerCase()]) {
      throw new Error('An account with this email already exists');
    }
    const user: User = { id: Date.now().toString(), name, email };
    MOCK_USERS[email.toLowerCase()] = { password, user };
    return user;
  },

  async logout(): Promise<void> {
    await delay(300);
  },
};
