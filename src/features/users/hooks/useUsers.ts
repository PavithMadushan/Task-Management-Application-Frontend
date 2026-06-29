import { useEffect, useState } from 'react';
import { userApi } from '../services/userApi';
import type { User, UserRole, UserStatus } from '../types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userApi.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const createUser = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ) => {
    try {
      const user = await userApi.createUser({ name, email, password, role });
      setUsers((prev) => [...prev, user]);
      return user;
    } catch (err) {
      console.error('createUser failed', err);
      throw err;
    }
  };

  const deleteUser = async (id: number | string) => {
    const numericId = typeof id === 'string' ? Number(id) : id;
    try {
      await userApi.deleteUser(numericId);
      setUsers((prev) => prev.filter((u) => Number(u.id) !== numericId));
    } catch (err) {
      console.error('deleteUser failed', err);
      throw err;
    }
  };

  const updateUser = async (
    id: number | string,
    updates: { name?: string; role?: UserRole; status?: UserStatus },
  ) => {
    const numericId = typeof id === 'string' ? Number(id) : id;
    try {
      const updated = await userApi.updateUser(numericId, updates);
      setUsers((prev) =>
        prev.map((u) => (Number(u.id) === numericId ? updated : u)),
      );
      return updated;
    } catch (err) {
      console.error('updateUser failed', err);
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    reload: loadUsers,
    createUser,
    deleteUser,
    updateUser,
  };
};