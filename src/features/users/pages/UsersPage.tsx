import React, { useState } from 'react';
import type { User, UserRole } from '../types';
import { UserTable } from '../components/UserTable';
import { useUsers } from '../hooks/useUsers';
import { AddUserModal } from '../components/AddUserModal';
import { EditUserModal } from '../components/EditUserModal';

export const UsersPage: React.FC = () => {
  const { users, loading, error, createUser, deleteUser, updateUser } = useUsers();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  const handleAddUserClick = () => {
    setCreateError(null);
    setIsAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setCreateError(null);
    setIsAddModalOpen(false);
  };

  const handleCreateUser = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ) => {
    try {
      setCreateError(null);
      await createUser(name, email, password, role);
      setIsAddModalOpen(false);
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : 'Failed to create user',
      );
    }
  };

  const handleEditUser = (user: User) => {
    setEditError(null);
    setEditingUser(user);
  };

  const handleEditModalClose = () => {
    setEditError(null);
    setEditingUser(null);
  };

  const handleSaveUser = async (
    id: number,
    updates: { name: string; role: UserRole },
  ) => {
    try {
      setEditError(null);
      await updateUser(id, updates);
      setEditingUser(null);
    } catch (err) {
      setEditError(
        err instanceof Error ? err.message : 'Failed to update user',
      );
    }
  };

  const handleDeleteUser = async (user: { id: number; name?: string }) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name ?? 'this user'}?`,
    );
    if (!confirmed) return;

    try {
      await deleteUser(user.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Users</h1>
        <button
          onClick={handleAddUserClick}
          style={{
            padding: '8px 18px',
            borderRadius: 999,
            border: 'none',
            background: '#2563eb',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          + Add User
        </button>
      </header>

      {loading && (
        <p style={{ fontSize: 13, color: '#6b7280' }}>Loading users...</p>
      )}
      {error && (
        <p style={{ fontSize: 13, color: '#dc2626' }}>{error}</p>
      )}

      <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />

      {isAddModalOpen && (
        <AddUserModal onClose={handleAddModalClose} onCreate={handleCreateUser} />
      )}

      {createError && (
        <p style={{ fontSize: 13, color: '#dc2626' }}>{createError}</p>
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={handleEditModalClose}
          onSave={handleSaveUser}
        />
      )}

      {editError && (
        <p style={{ fontSize: 13, color: '#dc2626' }}>{editError}</p>
      )}
    </div>
  );
};