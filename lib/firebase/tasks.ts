import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  Timestamp,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from './config';
import { TaskInstance, TaskHistory } from '@/types';

// Helper to ensure db is available (client-side only)
const getDb = () => {
  if (typeof window === 'undefined' || !db) {
    throw new Error('Firestore is only available on the client side');
  }
  return db;
};

const TASKS_COLLECTION = 'tasks';
const HISTORY_COLLECTION = 'history';

// Helper to convert Firestore Timestamp to Date
const timestampToDate = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  if (timestamp instanceof Date) {
    return timestamp;
  }
  if (typeof timestamp === 'string') {
    return new Date(timestamp);
  }
  return new Date();
};

// Helper to convert Date to Firestore Timestamp
const dateToTimestamp = (date: Date | undefined): Timestamp | null => {
  if (!date) return null;
  return Timestamp.fromDate(date instanceof Date ? date : new Date(date));
};

// Convert Firestore document to TaskInstance
const docToTask = (docData: DocumentData, id: string): TaskInstance => {
  return {
    id,
    templateId: docData.templateId || '',
    name: docData.name,
    description: docData.description,
    icon: docData.icon,
    category: docData.category,
    domain: docData.domain,
    frequency: docData.frequency,
    cost: docData.cost,
    notes: docData.notes,
    brandModel: docData.brandModel,
    lastCompleted: docData.lastCompleted ? timestampToDate(docData.lastCompleted) : undefined,
    nextDueDate: timestampToDate(docData.nextDueDate),
    createdAt: timestampToDate(docData.createdAt),
    notificationEnabled: docData.notificationEnabled || false,
    customFields: docData.customFields || {},
  };
};

// Helper to remove undefined values from object
const removeUndefined = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return null;
  }
  if (Array.isArray(obj)) {
    return obj.map(removeUndefined);
  }
  if (typeof obj === 'object') {
    const cleaned: any = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        cleaned[key] = removeUndefined(obj[key]);
      }
    }
    return cleaned;
  }
  return obj;
};

// Convert TaskInstance to Firestore document
const taskToDoc = (task: TaskInstance): any => {
  const doc: any = {
    templateId: task.templateId,
    name: task.name,
    description: task.description ?? null,
    icon: task.icon ?? null,
    category: task.category,
    domain: task.domain,
    frequency: task.frequency,
    cost: task.cost ?? null,
    notes: task.notes ?? null,
    brandModel: task.brandModel ?? null,
    lastCompleted: dateToTimestamp(task.lastCompleted),
    nextDueDate: dateToTimestamp(task.nextDueDate)!,
    createdAt: dateToTimestamp(task.createdAt)!,
    notificationEnabled: task.notificationEnabled ?? false,
  };

  // Only include customFields if it exists and has values
  if (task.customFields && Object.keys(task.customFields).length > 0) {
    doc.customFields = removeUndefined(task.customFields);
  }

  return removeUndefined(doc);
};

// Get all tasks
export async function getTasks(): Promise<TaskInstance[]> {
  try {
    if (typeof window === 'undefined') return [];
    const tasksRef = collection(getDb(), TASKS_COLLECTION);
    const q = query(tasksRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => docToTask(doc.data(), doc.id));
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
}

// Get tasks by domain
export async function getTasksByDomain(domain: string): Promise<TaskInstance[]> {
  try {
    if (typeof window === 'undefined') return [];
    const tasksRef = collection(getDb(), TASKS_COLLECTION);
    const q = query(tasksRef, where('domain', '==', domain), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => docToTask(doc.data(), doc.id));
  } catch (error) {
    console.error('Error getting tasks by domain:', error);
    return [];
  }
}

// Get a single task by ID
export async function getTask(taskId: string): Promise<TaskInstance | null> {
  try {
    if (typeof window === 'undefined') return null;
    const taskRef = doc(getDb(), TASKS_COLLECTION, taskId);
    const taskSnap = await getDoc(taskRef);
    
    if (taskSnap.exists()) {
      return docToTask(taskSnap.data(), taskSnap.id);
    }
    return null;
  } catch (error) {
    console.error('Error getting task:', error);
    return null;
  }
}

// Add a new task
export async function addTask(task: Omit<TaskInstance, 'id'>): Promise<string> {
  try {
    if (typeof window === 'undefined') throw new Error('Cannot add task on server side');
    const tasksRef = collection(getDb(), TASKS_COLLECTION);
    const docRef = await addDoc(tasksRef, taskToDoc(task as TaskInstance));
    return docRef.id;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

// Update a task
export async function updateTask(task: TaskInstance): Promise<void> {
  try {
    if (typeof window === 'undefined') throw new Error('Cannot update task on server side');
    const taskRef = doc(getDb(), TASKS_COLLECTION, task.id);
    await updateDoc(taskRef, taskToDoc(task));
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

// Delete a task
export async function deleteTask(taskId: string): Promise<void> {
  try {
    if (typeof window === 'undefined') throw new Error('Cannot delete task on server side');
    const taskRef = doc(getDb(), TASKS_COLLECTION, taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

// Get all history
export async function getHistory(): Promise<TaskHistory[]> {
  try {
    if (typeof window === 'undefined') return [];
    const historyRef = collection(getDb(), HISTORY_COLLECTION);
    const q = query(historyRef, orderBy('completedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        taskInstanceId: data.taskInstanceId,
        taskName: data.taskName,
        category: data.category,
        domain: data.domain,
        completedAt: timestampToDate(data.completedAt),
        notes: data.notes || undefined,
        cost: data.cost || undefined,
      };
    });
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
}

// Get history by domain
export async function getHistoryByDomain(domain: string): Promise<TaskHistory[]> {
  try {
    if (typeof window === 'undefined') return [];
    const historyRef = collection(getDb(), HISTORY_COLLECTION);
    const q = query(
      historyRef, 
      where('domain', '==', domain),
      orderBy('completedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        taskInstanceId: data.taskInstanceId,
        taskName: data.taskName,
        category: data.category,
        domain: data.domain,
        completedAt: timestampToDate(data.completedAt),
        notes: data.notes || undefined,
        cost: data.cost || undefined,
      };
    });
  } catch (error) {
    console.error('Error getting history by domain:', error);
    return [];
  }
}

// Add history entry
export async function addHistoryEntry(entry: Omit<TaskHistory, 'id'>): Promise<string> {
  try {
    if (typeof window === 'undefined') throw new Error('Cannot add history on server side');
    const historyRef = collection(getDb(), HISTORY_COLLECTION);
    const docRef = await addDoc(historyRef, {
      taskInstanceId: entry.taskInstanceId,
      taskName: entry.taskName,
      category: entry.category,
      domain: entry.domain,
      completedAt: dateToTimestamp(entry.completedAt)!,
      notes: entry.notes || null,
      cost: entry.cost || null,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding history entry:', error);
    throw error;
  }
}

