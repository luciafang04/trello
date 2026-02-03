// lib/storage.ts
import { Task, AuditLog } from '../../types/task';

const TASKS_KEY = 'micro-trello-tasks';
const AUDIT_KEY = 'micro-trello-audit';

// =======================
// TAREAS
// =======================
export const getTasks = (): Task[] => {
  const data = localStorage.getItem(TASKS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Task[];
  } catch {
    console.error('Error parsing tasks from localStorage');
    return [];
  }
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

// Añadir/Actualizar/Borrar tareas
export const addTask = (task: Task) => {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
};

export const updateTask = (updatedTask: Task) => {
  const tasks = getTasks().map(task =>
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(tasks);
};

export const deleteTask = (taskId: string) => {
  const tasks = getTasks().filter(task => task.id !== taskId);
  saveTasks(tasks);
};

// =======================
// AUDITORÍA
// =======================
export const getAuditLogs = (): AuditLog[] => {
  const data = localStorage.getItem(AUDIT_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as AuditLog[];
  } catch {
    console.error('Error parsing audit logs from localStorage');
    return [];
  }
};

export const addAuditLog = (log: AuditLog) => {
  const logs = getAuditLogs();
  logs.push(log);
  localStorage.setItem(AUDIT_KEY, JSON.stringify(logs));
};

// =======================
// IMPORT / EXPORT JSON
// =======================
export const exportJSON = () => {
  const data = {
    tasks: getTasks(),
    audit: getAuditLogs(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'micro-trello-export.json';
  link.click();
  URL.revokeObjectURL(url);
};

export const importJSON = (jsonData: string) => {
  try {
    const parsed = JSON.parse(jsonData);
    if (!parsed.tasks || !parsed.audit) {
      throw new Error('Formato inválido: faltan tasks o audit');
    }

    // Validación mínima: IDs únicos
    const taskIds = new Set<string>();
    parsed.tasks.forEach((task: Task) => {
      if (!task.id) throw new Error('Falta ID en una tarea');
      if (taskIds.has(task.id)) {
        // regeneramos id duplicado
        task.id = crypto.randomUUID();
      }
      taskIds.add(task.id);
    });

    saveTasks(parsed.tasks);
    parsed.audit.forEach((log: AuditLog) => addAuditLog(log));
  } catch (e: any) {
    throw new Error('Error al importar JSON: ' + e.message);
  }
};
