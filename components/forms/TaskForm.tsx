'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Task, Priority } from '../../types/task';
import { addTask, addAuditLog } from '../../lib/storage';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { v4 as uuidv4 } from 'uuid';

// ---------------------------
// Esquema de validación Zod
// ---------------------------
const taskSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  tags: z.string().optional(),
  estimationMin: z.number().min(1, 'Debe ser mayor que 0'),
  dueDate: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onCreated?: () => void;
}

export const TaskForm = ({ onCreated }: TaskFormProps) => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    const newTask: Task = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      priority: data.priority as Priority,
      tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
      estimationMin: data.estimationMin,
      createdAt: new Date().toISOString(),
      state: 'todo',
    };

    addTask(newTask);

    addAuditLog({
      timestamp: new Date().toISOString(),
      action: 'CREATE',
      taskId: newTask.id,
      diff: { after: newTask },
      userLabel: 'Alumno/a',
    });

    reset();
    onCreated?.();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Nueva tarea</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear nueva tarea</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">
          {/* Título */}
          <div>
            <label>Título</label>
            <Input {...register('title')} placeholder="Escribe el título" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Descripción */}
          <div>
            <label>Descripción</label>
            <Input {...register('description')} placeholder="Descripción opcional" />
          </div>

          {/* Prioridad */}
<div>
  <label>Prioridad</label>
  <Controller
    name="priority"
    control={control}
    defaultValue="medium" // muy importante para que RHF lo inicialice
    render={({ field }) => (
      <Select
        value={field.value || 'medium'} // asegura que siempre haya valor
        onValueChange={(value) => field.onChange(value as Priority)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecciona prioridad" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    )}
  />
  {errors.priority && (
    <p className="text-red-500 text-sm">{errors.priority.message}</p>
  )}
</div>


          {/* Tags */}
          <div>
            <label>Tags (separados por coma)</label>
            <Input {...register('tags')} placeholder="ej: urgente, react" />
          </div>

          {/* Estimación */}
          <div>
            <label>Estimación (minutos)</label>
            <Input type="number" {...register('estimationMin', { valueAsNumber: true })} placeholder="60" />
            {errors.estimationMin && <p className="text-red-500 text-sm">{errors.estimationMin.message}</p>}
          </div>

          {/* Fecha límite */}
          <div>
            <label>Fecha límite</label>
            <Input type="date" {...register('dueDate')} />
          </div>

          <DialogFooter>
            <Button type="submit">Crear tarea</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
