import React, { useState } from 'react';
import { TaskBoard } from '../components/TaskBoard';
import { NewTaskModal } from '../components/NewTaskModal';
import { useAuth } from '@/context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import type { TaskPriority } from '../types';
import type { TaskStatus } from '@/types/common';

interface NewTaskForm {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assignedTo: number;
}

export const BoardPage: React.FC = () => {
  const { user } = useAuth();
  const { createTask } = useTasks();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const defaultStatus: TaskStatus = 'Open';

  const handleNewTaskClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleCreateTask = async (form: NewTaskForm) => {
    const title =
      typeof form.title === 'string' ? form.title.trim() : '';
    const description =
      typeof form.description === 'string'
        ? form.description.trim()
        : '';
    const priority = form.priority;
    const dueDate = form.dueDate;
    const assignedTo = form.assignedTo;

    if (!title || !description) {
      alert('Please enter both title and description for the task.');
      return;
    }

    if (!user) {
      alert('You must be logged in to create tasks.');
      return;
    }

    if (!assignedTo) {
      alert('Please select a user to assign this task to.');
      return;
    }

    try {
      await createTask({
        title,
        description,
        priority,
        status: defaultStatus,
        dueDate,
        assignedTo,
      });

      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Failed to create task from BoardPage', err);
      alert(
        err instanceof Error
          ? err.message
          : 'Failed to create task. Please try again.',
      );
    }
  };

  const isLoggedIn = !!user;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            margin: 0,
          }}
        >
          Board
        </h1>

        {isLoggedIn && (
          <button
            type="button"
            onClick={handleNewTaskClick}
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
            + New Task
          </button>
        )}
      </header>

      <TaskBoard />

      {isAddModalOpen && (
        <NewTaskModal
          status={defaultStatus}
          onClose={handleAddModalClose}
          onCreate={handleCreateTask}
        />
      )}
    </div>
  );
};