'use client';

import React, { useMemo } from 'react';
import { TaskInstance, Domain } from '@/types';
import { getTaskUrgency } from '@/lib/dateUtils';
import { TaskCard } from '@/components/tasks/TaskCard';

interface TodayPageProps {
  tasks: TaskInstance[];
  domain: Domain;
  onMarkDone: (task: TaskInstance) => void;
  onSnooze: (task: TaskInstance) => void;
}

export function TodayPage({ tasks, domain, onMarkDone, onSnooze }: TodayPageProps) {
  const sortedTasks = useMemo(() => {
    const urgencyOrder: Record<string, number> = {
      overdue: 0,
      'due-today': 1,
      'due-soon': 2,
      'due-week': 3,
      future: 4,
    };

    return [...tasks]
      .filter(task => task.domain === domain)
      .sort((a, b) => {
        const urgencyA = getTaskUrgency(a);
        const urgencyB = getTaskUrgency(b);
        const orderA = urgencyOrder[urgencyA];
        const orderB = urgencyOrder[urgencyB];
        
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        
        // If same urgency, sort by due date
        return a.nextDueDate.getTime() - b.nextDueDate.getTime();
      });
  }, [tasks, domain]);

  const groupedTasks = useMemo(() => {
    const groups: Record<string, TaskInstance[]> = {
      overdue: [],
      'due-today': [],
      'due-soon': [],
      'due-week': [],
      future: [],
    };

    sortedTasks.forEach(task => {
      const urgency = getTaskUrgency(task);
      groups[urgency].push(task);
    });

    return groups;
  }, [sortedTasks]);

  const getSectionLabel = (urgency: string, count: number): string => {
    if (count === 0) return '';
    
    const taskText = count === 1 ? 'task' : 'tasks';
    
    switch (urgency) {
      case 'overdue':
        return `${count} ${taskText} overdue. Let's get these done!`;
      case 'due-today':
        return `${count} ${taskText} due today. Make sure you check them off!`;
      case 'due-soon':
        return `${count} ${taskText} due in the next 3 days. Stay on top of them!`;
      case 'due-week':
        return `${count} ${taskText} due this week. Make sure you check them off!`;
      case 'future':
        return `${count} ${taskText} upcoming. You've got time!`;
      default:
        return '';
    }
  };

  if (sortedTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 mt-6">
        <div className="text-center">
          <p className="text-[var(--color-gray-500)] text-lg mb-2">No tasks found</p>
          <p className="text-[var(--color-gray-400)] text-sm">Add a task to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 mt-6">
      {Object.entries(groupedTasks).map(([urgency, groupTasks]) => {
        if (groupTasks.length === 0) return null;
        
        return (
          <div key={urgency} className="mb-6">
            <h2 className="text-[20px] font-medium text-[var(--color-gray-700)] mb-6 px-4">
              {getSectionLabel(urgency, groupTasks.length)}
            </h2>
            <div className="px-4">
              {groupTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onMarkDone={onMarkDone}
                  onSnooze={onSnooze}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

