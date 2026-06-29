import type { TaskStatus } from '../../types/common';

export type { TaskStatus };
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  title?: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdBy: number;
  assignedTo: number;
  createdAt: string;
}