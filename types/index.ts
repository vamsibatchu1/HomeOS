export type Domain = 'home' | 'car' | 'pet' | 'life';

export type FrequencyType = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

export interface Frequency {
  type: FrequencyType;
  value?: number; // For custom: every X days/weeks/months
  unit?: 'days' | 'weeks' | 'months' | 'years';
  dayOfWeek?: number; // 0-6 for weekly (e.g., every Monday)
  dayOfMonth?: number; // 1-31 for monthly
}

export interface TaskTemplate {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category: string;
  domain: Domain;
  defaultFrequency: Frequency;
  defaultCost?: number;
  defaultNotes?: string;
}

export interface TaskInstance {
  id: string;
  templateId: string;
  name: string;
  description?: string;
  icon?: string;
  category: string;
  domain: Domain;
  frequency: Frequency;
  cost?: number;
  notes?: string;
  brandModel?: string;
  lastCompleted?: Date;
  nextDueDate: Date;
  createdAt: Date;
  notificationEnabled?: boolean;
  customFields?: Record<string, any>; // For domain-specific fields (mileage, dosage, etc.)
}

export interface TaskHistory {
  id: string;
  taskInstanceId: string;
  taskName: string;
  category: string;
  domain: Domain;
  completedAt: Date;
  notes?: string;
  cost?: number;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  domain: Domain;
  tasks: TaskInstance[];
}

export type TaskUrgency = 'overdue' | 'due-today' | 'due-soon' | 'due-week' | 'future';

