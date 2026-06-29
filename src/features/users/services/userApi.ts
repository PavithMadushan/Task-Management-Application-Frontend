import { http } from '@/services/httpClient';
import type { User, UserRole, UserStatus } from '../types';

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}

export const userApi = {
  async getUsers(): Promise<User[]> {
    const res = await http('/users', { method: 'GET' });
    return res.json();
  },

  async createUser(payload: CreateUserPayload): Promise<User> {
    const res = await http('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async updateUser(id: number, payload: UpdateUserPayload): Promise<User> {
    const res = await http(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async deleteUser(id: number): Promise<void> {
    await http(`/users/${id}`, { method: 'DELETE' });
  },
};