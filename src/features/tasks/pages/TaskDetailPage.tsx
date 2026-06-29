import { useParams } from 'react-router-dom';

export const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-2">Task detail</h1>
      <p className="text-sm text-slate-600">
        Task ID from URL: {id}
      </p>
      
    </div>
  );
};