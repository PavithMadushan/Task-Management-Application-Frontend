import React from 'react';
import type { User } from '../types';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const headerCellStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: 12,
  fontWeight: 600,
  color: '#6b7280',
  textAlign: 'left',
  borderBottom: '1px solid #e5e7eb',
};

const cellStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: 13,
  color: '#111827',
  borderBottom: '1px solid #f3f4f6',
};

const roleBadgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 10px',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 500,
};

const iconButtonStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  padding: 4,
  fontSize: 14,
};

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        background: '#ffffff',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f9fafb' }}>
          <tr>
            <th style={headerCellStyle}>User</th>
            <th style={headerCellStyle}>Email</th>
            <th style={headerCellStyle}>Role</th>
            <th style={{ ...headerCellStyle, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                style={{
                  ...cellStyle,
                  textAlign: 'center',
                  color: '#6b7280',
                  padding: '24px 16px',
                }}
              >
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td style={cellStyle}>{user.name}</td>
                <td style={cellStyle}>{user.email}</td>
                <td style={cellStyle}>
                  <span
                    style={{
                      ...roleBadgeStyle,
                      background: user.role === 'Admin' ? '#eff6ff' : '#f5f5f5',
                      color: user.role === 'Admin' ? '#1d4ed8' : '#374151',
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td
                  style={{
                    ...cellStyle,
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <button
                    onClick={() => onEdit(user)}
                    style={iconButtonStyle}
                    aria-label="Edit user"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    style={iconButtonStyle}
                    aria-label="Delete user"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};