'use client';

import { useState, useEffect } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskState } from '../../../types/task';
import { Column } from '../../components/kanban/Column';
import { getTasks, updateTask } from '../../lib/storage';

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(t => t.id === active.id);
    const newIndex = tasks.findIndex(t => t.id === over.id);

    const newTasks = arrayMove(tasks, oldIndex, newIndex);
    setTasks(newTasks);

    // Persistimos los cambios
    newTasks.forEach(t => updateTask(t));
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
          <SortableContext
            key={col}
            items={columns[col].map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <Column state={col} tasks={columns[col]} />
          </SortableContext>
        ))}
      </DndContext>
    </div>
  );
}
