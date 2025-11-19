'use client';

import React, { useMemo } from 'react';
import { TaskHistory, Domain } from '@/types';
import { Card } from '@/components/ui/Card';
import { differenceInDays, startOfDay } from 'date-fns';

interface HistoryPageProps {
  history: TaskHistory[];
  domain: Domain;
}

export function HistoryPage({ history, domain }: HistoryPageProps) {
  const domainHistory = useMemo(() => {
    return history
      .filter(item => item.domain === domain)
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
  }, [history, domain]);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, TaskHistory[]> = {};
    
    domainHistory.forEach(item => {
      const dateKey = item.completedAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });

    return groups;
  }, [domainHistory]);

  if (domainHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center">
          <p className="text-[var(--color-gray-500)] text-lg mb-2">No history yet</p>
          <p className="text-[var(--color-gray-400)] text-sm">Complete tasks to see them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {Object.entries(groupedByDate).map(([dateKey, items]) => (
        <div key={dateKey} className="mb-6 px-4">
          <h2 className="text-sm font-semibold text-[var(--color-gray-700)] uppercase tracking-wide mb-3">
            {dateKey}
          </h2>
          {items.map((item, index) => {
            const daysSince = differenceInDays(
              startOfDay(new Date()),
              startOfDay(item.completedAt)
            );
            
            return (
              <Card key={`${item.id}-${index}`} className="mb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--color-gray-900)] mb-1">
                      {item.taskName}
                    </h3>
                    <p className="text-sm text-[var(--color-gray-600)] mb-1">
                      {item.category}
                    </p>
                    {item.notes && (
                      <p className="text-sm text-[var(--color-gray-500)] mt-1">
                        {item.notes}
                      </p>
                    )}
                    {item.cost && (
                      <p className="text-sm font-medium text-[var(--color-gray-700)] mt-1">
                        ${item.cost.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-[var(--color-gray-500)]">
                      {daysSince === 0 ? 'Today' : daysSince === 1 ? 'Yesterday' : `${daysSince} days ago`}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ))}
    </div>
  );
}

