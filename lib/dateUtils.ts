import { addDays, addWeeks, addMonths, addYears, isBefore, isToday, differenceInDays, startOfDay } from 'date-fns';
import { Frequency, TaskInstance } from '@/types';

export function calculateNextDueDate(task: TaskInstance, completedDate: Date = new Date()): Date {
  const { frequency } = task;
  const baseDate = startOfDay(completedDate);

  switch (frequency.type) {
    case 'daily':
      return addDays(baseDate, 1);

    case 'weekly':
      if (frequency.dayOfWeek !== undefined) {
        // Calculate next occurrence of specific day of week
        const daysUntilNext = (frequency.dayOfWeek - baseDate.getDay() + 7) % 7 || 7;
        return addDays(baseDate, daysUntilNext);
      }
      return addWeeks(baseDate, frequency.value || 1);

    case 'monthly':
      if (frequency.dayOfMonth !== undefined) {
        // Calculate next occurrence of specific day of month
        let nextDate = addMonths(baseDate, 1);
        nextDate = new Date(nextDate.getFullYear(), nextDate.getMonth(), frequency.dayOfMonth);
        if (isBefore(nextDate, baseDate)) {
          nextDate = addMonths(nextDate, 1);
        }
        return nextDate;
      }
      return addMonths(baseDate, frequency.value || 1);

    case 'yearly':
      return addYears(baseDate, frequency.value || 1);

    case 'custom':
      if (frequency.unit === 'days') {
        return addDays(baseDate, frequency.value || 1);
      } else if (frequency.unit === 'weeks') {
        return addWeeks(baseDate, frequency.value || 1);
      } else if (frequency.unit === 'months') {
        return addMonths(baseDate, frequency.value || 1);
      } else if (frequency.unit === 'years') {
        return addYears(baseDate, frequency.value || 1);
      }
      return addDays(baseDate, frequency.value || 1);

    default:
      return addDays(baseDate, 1);
  }
}

export function getTaskUrgency(task: TaskInstance): 'overdue' | 'due-today' | 'due-soon' | 'due-week' | 'future' {
  const today = startOfDay(new Date());
  const dueDate = startOfDay(task.nextDueDate);
  const daysUntilDue = differenceInDays(dueDate, today);

  if (daysUntilDue < 0) {
    return 'overdue';
  } else if (daysUntilDue === 0) {
    return 'due-today';
  } else if (daysUntilDue <= 3) {
    return 'due-soon';
  } else if (daysUntilDue <= 7) {
    return 'due-week';
  } else {
    return 'future';
  }
}

export function formatDate(date: Date): string {
  if (isToday(date)) {
    return 'Today';
  }
  const daysDiff = differenceInDays(startOfDay(date), startOfDay(new Date()));
  if (daysDiff === -1) return 'Yesterday';
  if (daysDiff === 1) return 'Tomorrow';
  if (daysDiff < 0) return `${Math.abs(daysDiff)} days ago`;
  if (daysDiff <= 7) return `In ${daysDiff} days`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined });
}

export function formatFrequency(frequency: Frequency): string {
  switch (frequency.type) {
    case 'daily':
      return 'Daily';
    case 'weekly':
      if (frequency.dayOfWeek !== undefined) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `Every ${days[frequency.dayOfWeek]}`;
      }
      return frequency.value && frequency.value > 1 ? `Every ${frequency.value} weeks` : 'Weekly';
    case 'monthly':
      if (frequency.dayOfMonth !== undefined) {
        return `Monthly on day ${frequency.dayOfMonth}`;
      }
      return frequency.value && frequency.value > 1 ? `Every ${frequency.value} months` : 'Monthly';
    case 'yearly':
      return frequency.value && frequency.value > 1 ? `Every ${frequency.value} years` : 'Yearly';
    case 'custom':
      if (frequency.value && frequency.unit) {
        return `Every ${frequency.value} ${frequency.unit}`;
      }
      return 'Custom';
    default:
      return 'Custom';
  }
}

