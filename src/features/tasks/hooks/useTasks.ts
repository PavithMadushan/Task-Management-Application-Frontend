import { useEffect, useState } from 'react';
import { taskApi } from '../services/taskApi';
import type { Task, TaskFilters } from '../types';

export const useTasks = (filters?: TaskFilters) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async (activeFilters?: TaskFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskApi.getTasks(activeFilters);
      setTasks(data);
    } catch (err) {
      console.error('Failed to load tasks', err);
      setError(err instanceof Error ? err.message : 'Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTasks(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  const createTask = async (payload: Partial<Task>) => {
    const created = await taskApi.createTask(payload as Parameters<typeof taskApi.createTask>[0]);
    setTasks((prev) => [...prev, created]);
    return created;
  };

  const updateTask = async (id: number, payload: Partial<Task>) => {
    const updated = await taskApi.updateTask(id, payload);
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
    return updated;
  };

  const deleteTask = async (id: number) => {
    await taskApi.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    tasks,
    loading,
    error,
    reload: () => loadTasks(filters),
    createTask,
    updateTask,
    deleteTask,
  };
};