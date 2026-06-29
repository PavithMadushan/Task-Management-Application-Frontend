import React, { useState } from 'react';
import type { Task } from '../types';
import type { User } from '@/features/users/types';
import type { TaskStatus } from '@/types/common';

interface TaskCardProps {
  task: Task;
  assignedUser?: User;
  onClick?: () => void;
  onChangeStatus?: (status: TaskStatus) => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  assignedUser,
  onClick,
  onChangeStatus,
  onDelete,
  onEdit,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const initial =
    assignedUser && assignedUser.name
      ? assignedUser.name.trim().charAt(0).toUpperCase()
      : null;

  const assigneeLabel = assignedUser
    ? `Assigned to ${assignedUser.name}`
    : 'Unassigned task';

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleStatusClick = (status: TaskStatus) => {
    setMenuOpen(false);
    onChangeStatus?.(status);
  };

  const handleDeleteClick = () => {
    setMenuOpen(false);
    onDelete?.();
  };

  const handleEditClick = () => {
    setMenuOpen(false);
    onEdit?.();
  };

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        position: 'relative',
        width: '100%',
        textAlign: 'left',
        background: '#ffffff',
        borderRadius: 16,
        padding: 16,
        boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 600,
            color: '#0f172a',
          }}
        >
          {task.title}
        </h3>

        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Task actions"
          style={{
            border: 'none',
            background: 'transparent',
            padding: 0,
            cursor: 'pointer',
            fontSize: 18,
            color: '#9ca3af',
            lineHeight: 1,
          }}
        >
          ···
        </button>
      </div>

      <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
        {task.description}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              fontSize: 11,
              padding: '2px 8px',
              borderRadius: 999,
              background:
                task.priority === 'High'
                  ? '#fee2e2'
                  : task.priority === 'Medium'
                  ? '#fef3c7'
                  : '#e0f2fe',
              color:
                task.priority === 'High'
                  ? '#b91c1c'
                  : task.priority === 'Medium'
                  ? '#92400e'
                  : '#1d4ed8',
            }}
          >
            {task.priority}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {initial ? (
            <button
              type="button"
              title={assigneeLabel}
              aria-label={assigneeLabel}
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                border: 'none',
                background: '#dbeafe',
                color: '#1d4ed8',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'default',
              }}
            >
              {initial}
            </button>
          ) : (
            <span
              style={{
                fontSize: 11,
                color: '#9ca3af',
              }}
            >
              Unassigned
            </span>
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 32,
            right: 12,
            background: '#ffffff',
            borderRadius: 12,
            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.18)',
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            zIndex: 20,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {(['Open', 'In Progress', 'Testing', 'Done'] as TaskStatus[])
            .filter((status) => status !== task.status)
            .map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleStatusClick(status)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: '6px 10px',
                  textAlign: 'left',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                Move to {status}
              </button>
            ))}

          <button
            type="button"
            onClick={handleEditClick}
            style={{
              border: 'none',
              background: 'transparent',
              padding: '6px 10px',
              textAlign: 'left',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Edit task
          </button>

          <hr
            style={{
              border: 'none',
              borderTop: '1px solid #e5e7eb',
              margin: '4px 0',
            }}
          />

          <button
            type="button"
            onClick={handleDeleteClick}
            style={{
              border: 'none',
              background: 'transparent',
              padding: '6px 10px',
              textAlign: 'left',
              fontSize: 12,
              color: '#b91c1c',
              cursor: 'pointer',
            }}
          >
            Delete task
          </button>
        </div>
      )}
    </div>
  );
};