import { http } from '@/services/httpClient';
import type { Task, TaskPriority, TaskFilters, TaskStatus } from '../types';

interface CreateTaskPayload {
  title: string;
  description: string;
  priority: TaskPriority;
  status?: TaskStatus;
  dueDate: string;
  assignedTo: number;
}

interface UpdateTaskPayload {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
  assignedTo?: number;
}

export const taskApi = {
  async getTasks(filters?: TaskFilters): Promise<Task[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.title) params.append('title', filters.title);

    const query = params.toString();
    const res = await http(`/tasks${query ? `?${query}` : ''}`, { method: 'GET' });
    return res.json();
  },

  async getTaskById(id: number): Promise<Task> {
    const res = await http(`/tasks/${id}`, { method: 'GET' });
    return res.json();
  },

  async createTask(payload: CreateTaskPayload): Promise<Task> {
    const res = await http('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async updateTask(id: number, payload: UpdateTaskPayload): Promise<Task> {
    const res = await http(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async deleteTask(id: number): Promise<void> {
    await http(`/tasks/${id}`, { method: 'DELETE' });
  },
};