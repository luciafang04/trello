'use client';

import { useEffect, useState } from 'react';
import { Task, TaskState } from '../../types/task';
import { getTasks } from '../../lib/storage';
import { TaskForm } from '../forms/TaskForm';
import { Column } from './Column';

const columns: TaskState[] = ['todo', 'doing', 'done'];

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const refreshTasks = () => setTasks(getTasks());

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <div className="flex gap-4">
      {columns.map(col => (
        <Column
          key={col}
          state={col}
          tasks={tasks.filter(task => task.state === col)}
          refreshTasks={refreshTasks}
        />
      ))}

      <div className="flex-1 p-4">
        <TaskForm onCreated={refreshTasks} />
      </div>
    </div>
  );
};
