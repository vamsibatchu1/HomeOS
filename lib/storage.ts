import { TaskInstance, TaskHistory } from '@/types';

const STORAGE_KEYS = {
  TASKS: 'homeos_tasks',
  HISTORY: 'homeos_history',
} as const;

export function getTasks(): TaskInstance[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
  if (!stored) return [];
  
  try {
    const tasks = JSON.parse(stored);
    return tasks.map((task: any) => ({
      ...task,
      nextDueDate: new Date(task.nextDueDate),
      lastCompleted: task.lastCompleted ? new Date(task.lastCompleted) : undefined,
      createdAt: new Date(task.createdAt),
    }));
  } catch {
    return [];
  }
}

export function saveTasks(tasks: TaskInstance[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
}

export function getHistory(): TaskHistory[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
  if (!stored) return [];
  
  try {
    const history = JSON.parse(stored);
    return history.map((item: any) => ({
      ...item,
      completedAt: new Date(item.completedAt),
    }));
  } catch {
    return [];
  }
}

export function saveHistory(history: TaskHistory[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

export function addHistoryEntry(entry: TaskHistory): void {
  const history = getHistory();
  history.unshift(entry);
  saveHistory(history);
}

export function updateTask(task: TaskInstance): void {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === task.id);
  if (index >= 0) {
    tasks[index] = task;
    saveTasks(tasks);
  }
}

export function addTask(task: TaskInstance): void {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
}

export function deleteTask(taskId: string): void {
  const tasks = getTasks();
  const filtered = tasks.filter(t => t.id !== taskId);
  saveTasks(filtered);
}

