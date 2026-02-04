'use client';

import { Task, TaskState } from '../../types/task';
import { TaskCard } from './TaskCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface ColumnProps {
  state: TaskState;
  tasks: Task[];
  refreshTasks?: () => void;
}

export const Column = ({ state, tasks, refreshTasks }: ColumnProps) => {
  const title = state.charAt(0).toUpperCase() + state.slice(1);

  return (
    <div className="flex-1 bg-gray-100 p-4 rounded-md min-h-[300px]">
      <h3 className="font-bold mb-4">{title} ({tasks.length})</h3>

      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} refreshTasks={refreshTasks} />
        ))}
      </SortableContext>

      {tasks.length === 0 && <p className="text-gray-400">No hay tareas</p>}
    </div>
  );
};
