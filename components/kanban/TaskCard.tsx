'use client';

import { Task } from '../../types/task';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskCardProps {
  task: Task;
  refreshTasks?: () => void;
}

export const TaskCard = ({ task, refreshTasks }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border p-3 rounded-md mb-2 bg-white shadow-sm cursor-grab"
    >
      <h4 className="font-bold">{task.title}</h4>
      {task.description && <p className="text-sm">{task.description}</p>}

      <div className="flex gap-1 mt-1 flex-wrap">
        {task.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 text-xs bg-gray-200 rounded-full">{tag}</span>
        ))}
        <span className="px-2 py-0.5 text-xs bg-blue-200 rounded-full">{task.priority}</span>
      </div>
    </div>
  );
};
