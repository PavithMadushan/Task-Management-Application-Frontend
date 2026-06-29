import React, { useState } from 'react';
import { Card } from '@/components/ui/Card/Card';
import { TaskCard } from './TaskCard';
import { EditTaskModal } from './EditTaskModal';
import { useTasks } from '../hooks/useTasks';
import { useUsers } from '@/features/users/hooks/useUsers';
import type { TaskStatus } from '@/types/common';
import type { Task } from '../types';

const columns: TaskStatus[] = ['Open', 'In Progress', 'Testing', 'Done'];

export const TaskBoard: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useTasks();
  const { users } = useUsers();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const tasksByStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  const getAssignedUser = (assignedToId: number | null | undefined) =>
  users.find((u) => Number(u.id) === assignedToId);

  const handleEditSave = async (updates: {
    title: string;
    description: string;
    priority: any;
    status: TaskStatus;
    dueDate: string;
    assignedTo: number;
  }) => {
    if (!editingTask) return;

    try {
      await updateTask(editingTask.id, {
        title: updates.title,
        description: updates.description,
        priority: updates.priority,
        status: updates.status,
        dueDate: updates.dueDate,
        assignedTo: updates.assignedTo,
      });
      setEditingTask(null);
    } catch (err) {
      console.error('Failed to update task', err);
      alert(
        err instanceof Error
          ? err.message
          : 'Failed to update task. Please try again.',
      );
    }
  };

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 16,
        }}
      >
        {columns.map((status) => (
          <Card key={status} title={status}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {tasksByStatus(status).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  assignedUser={getAssignedUser(task.assignedTo)}
                  onClick={undefined}
                  onChangeStatus={async (newStatus) => {
                    await updateTask(task.id, { status: newStatus });
                  }}
                  onDelete={async () => {
                    await deleteTask(task.id);
                  }}
                  onEdit={() => setEditingTask(task)}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleEditSave}
        />
      )}
    </>
  );
};