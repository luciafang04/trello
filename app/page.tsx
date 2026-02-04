// page.tsx
'use client';

import { useState, useEffect } from 'react';
import { TaskForm } from '../components/forms/TaskForm';
import { getTasks } from '../lib/storage';
import type { Task } from '../types/task';

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = () => setTasks(getTasks());

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Micro-Trello</h1>

      <TaskForm onCreated={loadTasks} />

      <div className="mt-6 space-y-2">
        {tasks.length === 0 && <p>No hay tareas aún.</p>}
        {tasks.map(task => (
          <div key={task.id} className="p-2 border rounded">
            <strong>{task.title}</strong> - <em>{task.priority}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
