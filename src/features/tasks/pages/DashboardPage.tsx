import { Card } from '@/components/ui/Card/Card';
import { StatusPieChart } from '@/features/tasks/components/StatusPieChart';
import { PriorityPieChart } from '@/features/tasks/components/PriorityPieChart';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import type { TaskStatus } from '@/types/common';

// const STATUS_ORDER: TaskStatus[] = ['Open', 'In Progress', 'Testing', 'Done'];

export const DashboardPage = () => {
  const { tasks, loading, error } = useTasks(); // already scoped by backend to current user

  const total = tasks.length;

  const counts: Record<TaskStatus, number> = {
    Open: 0,
    'In Progress': 0,
    Testing: 0,
    Done: 0,    
  };

  tasks.forEach((t) => {
    counts[t.status] += 1;
  });

  const todoCount = counts.Open;
  const inProgressCount = counts['In Progress'];
  const testingCount = counts.Testing;
  const doneCount = counts.Done;
  const overdueCount = /*counts.Overdue */ 0; 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Dashboard</h1>
      </header>

      {loading && (
        <p style={{ fontSize: 13, color: '#6b7280' }}>Loading tasks...</p>
      )}
      {error && (
        <p style={{ fontSize: 13, color: '#dc2626' }}>{error}</p>
      )}

      {/* Stats row — 6 columns */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
          gap: 16,
        }}
      >
        <Card title="Total Tasks">
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              margin: '4px 0',
            }}
          >
            {total}
          </p>
          <p
            style={{
              fontSize: 12,
              color: '#16a34a',
              margin: 0,
            }}
          >
            {/* placeholder trend text */}
            vs last week
          </p>
        </Card>

        <Card title="To do">
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              margin: '4px 0',
            }}
          >
            {todoCount}
          </p>
          <p
            style={{
              fontSize: 12,
              color: '#16a34a',
              margin: 0,
            }}
          >
            Tasks in Open status
          </p>
        </Card>

        <Card title="In Progress">
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              margin: '4px 0',
            }}
          >
            {inProgressCount}
          </p>
          <p
            style={{
              fontSize: 12,
              color: '#16a34a',
              margin: 0,
            }}
          >
            Currently being worked on
          </p>
        </Card>

        <Card title="Testing">
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              margin: '4px 0',
            }}
          >
            {testingCount}
          </p>
          <p
            style={{
              fontSize: 12,
              color: '#f97316',
              margin: 0,
            }}
          >
            In QA / verification
          </p>
        </Card>

        <Card title="Done">
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              margin: '4px 0',
            }}
          >
            {doneCount}
          </p>
          <p
            style={{
              fontSize: 12,
              color: '#16a34a',
              margin: 0,
            }}
          >
            Completed tasks
          </p>
        </Card>

        <Card title="Overdue">
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#dc2626',
              margin: '4px 0',
            }}
          >
            {overdueCount}
          </p>
          <p
            style={{
              fontSize: 12,
              color: '#dc2626',
              margin: 0,
            }}
          >
            Past due date
          </p>
        </Card>
      </section>

      {/* Charts row — 3 columns */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}
      >
        <Card title="Tasks by Status">
          <StatusPieChart tasks={tasks} />
        </Card>
        <Card title="Tasks by Priority">
          <PriorityPieChart />
        </Card>
        <Card title="Upcoming Due Tasks">
          {/* you can later compute this from tasks sorted by dueDate */}
          <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
            Upcoming tasks list will be implemented next.
          </p>
        </Card>
      </section>
    </div>
  );
};