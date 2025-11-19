'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { TaskInstance, Domain } from '@/types';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { getIconComponent } from '@/lib/iconHelper';

interface AllTasksPageProps {
  tasks: TaskInstance[];
  domain: Domain;
  onTaskClick: (task: TaskInstance) => void;
}

export function AllTasksPage({ tasks, domain, onTaskClick }: AllTasksPageProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const tasksByCategory = useMemo(() => {
    const domainTasks = tasks.filter(t => t.domain === domain);
    const grouped: Record<string, TaskInstance[]> = {};
    
    domainTasks.forEach(task => {
      if (!grouped[task.category]) {
        grouped[task.category] = [];
      }
      grouped[task.category].push(task);
    });

    return grouped;
  }, [tasks, domain]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  if (Object.keys(tasksByCategory).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center">
          <p className="text-[var(--color-gray-500)] text-lg mb-2">No tasks found</p>
          <p className="text-[var(--color-gray-400)] text-sm">Add a task to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {Object.entries(tasksByCategory)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([category, categoryTasks]) => {
          const isExpanded = expandedCategories.has(category);
          const firstTask = categoryTasks[0];
          const IconComponent = getIconComponent(firstTask.icon);

          return (
            <div key={category} className="mb-2 px-4">
              <Card
                onClick={() => toggleCategory(category)}
                className="cursor-pointer"
              >
                {/* Category Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <IconComponent className="w-5 h-5 text-[var(--color-gray-600)] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--color-gray-900)]">{category}</h3>
                      <p className="text-sm text-[var(--color-gray-500)]">
                        {categoryTasks.length} {categoryTasks.length === 1 ? 'task' : 'tasks'}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-[var(--color-gray-400)] flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[var(--color-gray-400)] flex-shrink-0" />
                  )}
                </div>

                {/* Task Rows - Inside the same card */}
                {isExpanded && categoryTasks.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[var(--color-gray-200)]">
                    {categoryTasks.map((task, index) => (
                      <div key={task.id}>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            onTaskClick(task);
                          }}
                          className="flex items-center justify-between py-2 cursor-pointer hover:bg-[var(--color-gray-50)] px-2 -mx-2"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-[var(--color-gray-900)]">
                              {task.name}
                            </h4>
                            {task.description && (
                              <p className="text-sm text-[var(--color-gray-500)] line-clamp-1 mt-0.5">
                                {task.description}
                              </p>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-[var(--color-gray-400)] flex-shrink-0 ml-2" />
                        </div>
                        {index !== categoryTasks.length - 1 && categoryTasks.length > 1 && (
                          <div className="border-b border-[var(--color-gray-200)] mx-2 py-1" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          );
        })}
    </div>
  );
}
