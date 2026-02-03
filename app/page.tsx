'use client';

import { TaskForm } from '../components/forms/TaskForm';

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Micro-Trello</h1>
      <TaskForm />
    </div>
  );
}
