import { TaskInstance, TaskHistory } from '@/types';
import * as firebaseTasks from './firebase/tasks';

// Re-export Firebase functions as the storage interface
export const getTasks = firebaseTasks.getTasks;
export const getTasksByDomain = firebaseTasks.getTasksByDomain;
export const getTask = firebaseTasks.getTask;

// Add task - Firebase will generate the ID
export const addTask = async (task: TaskInstance): Promise<string> => {
  const { id, ...taskWithoutId } = task;
  const newId = await firebaseTasks.addTask(taskWithoutId);
  return newId;
};

export const updateTask = firebaseTasks.updateTask;
export const deleteTask = firebaseTasks.deleteTask;

export const getHistory = firebaseTasks.getHistory;
export const getHistoryByDomain = firebaseTasks.getHistoryByDomain;

// Add history entry - Firebase will generate the ID
export const addHistoryEntry = async (entry: TaskHistory): Promise<void> => {
  const { id, ...entryWithoutId } = entry;
  await firebaseTasks.addHistoryEntry(entryWithoutId);
};

// Legacy localStorage functions for backward compatibility (if needed)
// These are kept but will be replaced by Firebase
const STORAGE_KEYS = {
  TASKS: 'homeos_tasks',
  HISTORY: 'homeos_history',
} as const;

export function getTasksLocal(): TaskInstance[] {
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

export function saveTasksLocal(tasks: TaskInstance[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
}

export function getHistoryLocal(): TaskHistory[] {
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

export function saveHistoryLocal(history: TaskHistory[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}
