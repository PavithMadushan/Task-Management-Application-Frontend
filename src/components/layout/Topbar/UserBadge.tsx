import React from 'react';

interface UserBadgeProps {
  name: string;
  role: string;
  avatarUrl?: string;
}

const COLORS = ['#f97316', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#facc15'];

function getColorForName(name: string): string {
  if (!name) return '#e5e7eb';
  const codePoints = Array.from(name);
  const hash = codePoints.reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
}

export const UserBadge: React.FC<UserBadgeProps> = ({ name, role, avatarUrl }) => {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() ?? '?';
  const bgColor = avatarUrl ? 'transparent' : getColorForName(name);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '4px 8px',
        borderRadius: 999,
        background: '#ffffff',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {!avatarUrl && initial}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{name}</span>
        <span style={{ fontSize: 11, color: '#6b7280' }}>{role}</span>
      </div>

      <span style={{ fontSize: 12, color: '#6b7280' }}>▾</span>
    </div>
  );
};