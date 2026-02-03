'use client';

import { Task } from '../../../types/task';

interface TaskCardProps {
  task: Task;
  refreshTasks?: () => void;
}

export const TaskCard = ({ task, refreshTasks }: TaskCardProps) => {
  return (
    <div className="border p-3 rounded-md mb-2 bg-white shadow-sm">
      <h4 className="font-bold">{task.title}</h4>
      {task.description && <p className="text-sm">{task.description}</p>}

      <div className="flex gap-1 mt-1 flex-wrap">
        {task.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 text-xs bg-gray-200 rounded-full">
            {tag}
          </span>
        ))}
        <span className="px-2 py-0.5 text-xs bg-blue-200 rounded-full">
          {task.priority}
        </span>
      </div>
    </div>
  );
};
