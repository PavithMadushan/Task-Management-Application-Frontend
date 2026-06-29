import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { TaskStatus } from '@/types/common';
import type { Task } from '@/features/tasks/types';

interface StatusPieChartProps {
  tasks: Task[];
}

const COLORS = ['#3b82f6', '#f97316', '#eab308', '#22c55e', '#ef4444'];

const STATUS_LABELS: Record<TaskStatus, string> = {
  Open: 'To do',
  'In Progress': 'In Progress',
  Testing: 'Testing',
  Done: 'Done',
  Overdue: 'Overdue',
};

export const StatusPieChart: React.FC<StatusPieChartProps> = ({ tasks }) => {
  const counts: Record<TaskStatus, number> = {
    Open: 0,
    'In Progress': 0,
    Testing: 0,
    Done: 0,
    Overdue: 0,
  };

  tasks.forEach((t) => {
    counts[t.status] += 1;
  });

  const data = (Object.keys(counts) as TaskStatus[])
    .map((status) => ({
      status,
      name: STATUS_LABELS[status],
      value: counts[status],
    }))
    .filter((item) => item.value > 0); // hide slices with zero count

  if (data.length === 0) {
    return (
      <p style={{ fontSize: 13, color: '#6b7280' }}>
        No tasks yet. Create some tasks to see status distribution.
      </p>
    );
  }

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, _name: string, entry: any) => [
              value,
              entry.payload.name,
            ]}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            formatter={(value: string) => (
              <span style={{ fontSize: 12 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};