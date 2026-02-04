// types/task.ts

export type Priority = 'low' | 'medium' | 'high';
export type TaskState = 'todo' | 'doing' | 'done';

export interface Task {
  id: string;                   // uuid
  title: string;                // mínimo 3 caracteres
  description?: string;         // opcional
  priority: Priority;           
  tags: string[];               
  estimationMin: number;        // duración estimada en minutos
  createdAt: string;            // ISO string
  dueDate?: string;             // ISO string opcional
  state: TaskState;             // 'todo' | 'doing' | 'done'
  
  // Modo Dios (opcional)
  godMode?: {
    rubric?: number;            // 0-10
    comments?: string;          
  };
}

// Auditoría
export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'MOVE';

export interface AuditLog {
  timestamp: string;            // ISO string
  action: AuditAction;
  taskId: string;
  diff: Partial<{ before: Task; after: Task }>; // cambios antes/después
  userLabel: string;            // fijo: "Alumno/a"
}
