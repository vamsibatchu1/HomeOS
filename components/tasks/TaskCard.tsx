'use client';

import React, { useMemo } from 'react';
import { TaskInstance } from '@/types';
import { formatDate, formatFrequency, getTaskUrgency } from '@/lib/dateUtils';
import { cn } from '@/lib/utils';
import { getIconComponent } from '@/lib/iconHelper';
import { differenceInDays, startOfDay } from 'date-fns';

interface TaskCardProps {
  task: TaskInstance;
  onMarkDone: (task: TaskInstance) => void;
  onSnooze: (task: TaskInstance) => void;
}

export function TaskCard({ task, onMarkDone, onSnooze }: TaskCardProps) {
  const urgency = getTaskUrgency(task);
  const IconComponent = useMemo(() => getIconComponent(task.icon), [task.icon]);

  const urgencyColors = {
    overdue: 'text-[var(--color-danger)]',
    'due-today': 'text-[var(--color-warning)]',
    'due-soon': 'text-[var(--color-warning)]',
    'due-week': 'text-[var(--color-info)]',
    future: 'text-[var(--color-gray-600)]',
  };

  const renderIcon = () => {
    const Icon = IconComponent;
    return <Icon className={cn('w-8 h-8', urgencyColors[urgency])} />;
  };

  // Calculate days until due
  const daysUntilDue = differenceInDays(startOfDay(task.nextDueDate), startOfDay(new Date()));
  const dueText = daysUntilDue < 0 
    ? `Overdue by ${Math.abs(daysUntilDue)} days`
    : daysUntilDue === 0 
    ? 'Due today'
    : daysUntilDue === 1
    ? 'Due tomorrow'
    : `Due in ${daysUntilDue} days`;

  // Get "Today" or last completed date
  const lastDoneText = task.lastCompleted 
    ? formatDate(task.lastCompleted)
    : 'Today';

  return (
    <div className="mb-3 bg-white rounded-[24px] p-5 border border-[var(--color-gray-200)]">
      {/* Row 1: Icon and Task Name */}
      <div className="flex items-center gap-4 mb-4">
        {/* Icon - no background */}
        <div className="flex-shrink-0">
          {renderIcon()}
        </div>
        {/* Task Name */}
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-[var(--color-gray-900)]">{task.name}</h3>
        </div>
      </div>

      {/* Row 2: Today, Frequency, Due Date - Horizontal Columns */}
      <div className="mb-4 flex items-center gap-1">
        <div className="text-sm text-[var(--color-gray-700)]">
          {lastDoneText}
        </div>
        <div className="text-sm text-[var(--color-gray-700)]">
          {formatFrequency(task.frequency)}
        </div>
        <div className={cn('text-sm font-medium', urgencyColors[urgency])}>
          {dueText}
        </div>
      </div>

      {/* Row 3: Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onSnooze(task)}
          className="flex-1 px-4 py-3 bg-[var(--color-gray-200)] text-[var(--color-gray-900)] rounded-[var(--radius-md)] font-medium text-sm hover:bg-[var(--color-gray-300)] active:scale-95 transition-all"
        >
          Snooze
        </button>
        <button
          onClick={() => onMarkDone(task)}
          className="flex-1 px-4 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium text-sm hover:bg-[var(--color-primary-dark)] active:scale-95 transition-all"
        >
          Mark as Done
        </button>
      </div>
    </div>
  );
}
