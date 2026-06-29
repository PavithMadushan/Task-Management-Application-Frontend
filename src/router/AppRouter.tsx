import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout/Layout';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { DashboardPage } from '@/features/tasks/pages/DashboardPage';
import { BoardPage } from '@/features/tasks/pages/BoardPage';
import { TaskDetailPage } from '@/features/tasks/pages/TaskDetailPage';
import { UsersPage } from '@/features/users/pages/UsersPage';
import { RequireAuth } from '@/context/RequireAuth';

export const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route element={<RequireAuth />}>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>
    </Route>
  </Routes>
);