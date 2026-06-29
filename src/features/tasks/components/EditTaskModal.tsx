import React, { useState } from 'react';
import type { Task, TaskPriority } from '../types';
import type { TaskStatus } from '@/types/common';
import { useUsers } from '@/features/users/hooks/useUsers';

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (updates: {
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: string;
    assignedTo: number;
  }) => Promise<void> | void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  onClose,
  onSave,
}) => {
  const { users } = useUsers();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.slice(0, 10) : '',
  );
  const [assignedTo, setAssignedTo] = useState<number>(task.assignedTo);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      alert('Please provide both title and description.');
      return;
    }

    if (!assignedTo) {
      alert('Please select a user to assign this task to.');
      return;
    }

    setSubmitting(true);
    try {
      await onSave({
        title: trimmedTitle,
        description: trimmedDescription,
        priority,
        status,
        dueDate,
        assignedTo,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 60,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 440,
          maxWidth: '95%',
          background: '#ffffff',
          borderRadius: 18,
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.30)',
          padding: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 600,
              color: '#0f172a',
            }}
          >
            Edit task
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: 18,
              cursor: 'pointer',
              color: '#9ca3af',
            }}
            aria-label="Close edit task modal"
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 500,
                  marginBottom: 4,
                }}
              >
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  borderRadius: 10,
                  border: '1px solid #e5e7eb',
                  padding: '8px 10px',
                  fontSize: 13,
                }}
                placeholder="Task title"
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 500,
                  marginBottom: 4,
                }}
              >
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  borderRadius: 10,
                  border: '1px solid #e5e7eb',
                  padding: '8px 10px',
                  fontSize: 13,
                  minHeight: 80,
                  resize: 'vertical',
                }}
                placeholder="Describe the task details"
              />
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as TaskPriority)
                  }
                  style={{
                    width: '100%',
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    padding: '8px 10px',
                    fontSize: 13,
                  }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as TaskStatus)
                  }
                  style={{
                    width: '100%',
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    padding: '8px 10px',
                    fontSize: 13,
                  }}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Testing">Testing</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Due date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{
                    width: '100%',
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    padding: '8px 10px',
                    fontSize: 13,
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Assign to
                </label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(Number(e.target.value))}
                  style={{
                    width: '100%',
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    padding: '8px 10px',
                    fontSize: 13,
                  }}
                >
                  <option value={0} disabled>
                    Select a user
                  </option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <footer
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 8,
              marginTop: 20,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                border: '1px solid #e5e7eb',
                background: '#ffffff',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                border: 'none',
                background: '#2563eb',
                color: '#ffffff',
                fontSize: 13,
                fontWeight: 500,
                cursor: submitting ? 'default' : 'pointer',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? 'Saving…' : 'Save changes'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};