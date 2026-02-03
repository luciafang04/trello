'use client';

import { useState, useEffect } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { Task, TaskState } from '../../../types/task';
import { Column } from '../../components/kanban/Column';
import { getTasks, updateTask } from '../../lib/storage';

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => setTasks(getTasks()), []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const task = tasks.find(t => t.id === active.id);
    if (!task) return;

    // Detectamos nueva columna por el id del over
    const newColumnState = (tasks.find(t => t.id === over.id)?.state ?? task.state) as TaskState;

    const newTasks = tasks.map(t =>
      t.id === task.id ? { ...t, state: newColumnState } : t
    );

    setTasks(newTasks);
    newTasks.forEach(updateTask);
  };

  const columns: Record<TaskState, Task[]> = {
    todo: tasks.filter(t => t.state === 'todo'),
    doing: tasks.filter(t => t.state === 'doing'),
    done: tasks.filter(t => t.state === 'done'),
  };

  return (
    <div className="flex gap-4 p-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {(['todo','doing','done'] as TaskState[]).map(col => (
          <Column key={col} state={col} tasks={columns[col]} />
        ))}
      </DndContext>
    </div>
  );
}
