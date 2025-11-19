'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type TabType = 'today' | 'all' | 'history';

interface DomainTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function DomainTabs({ activeTab, onTabChange }: DomainTabsProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: 'all', label: 'All Tasks' },
    { id: 'history', label: 'History' },
  ];

  return (
    <div className="sticky top-0 z-10 my-4" style={{ backgroundColor: 'var(--page-background)' }}>
      <div className="flex gap-2 justify-start pl-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'py-2.5 px-4 text-sm font-medium rounded-full transition-all',
                isActive
                  ? 'bg-[var(--color-gray-900)] text-white'
                  : 'bg-white text-[var(--color-gray-700)] border border-[var(--color-gray-300)] hover:bg-[var(--color-gray-100)]'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
