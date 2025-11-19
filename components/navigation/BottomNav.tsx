'use client';

import React from 'react';
import { Home, Car, Heart, User } from 'lucide-react';
import { Domain } from '@/types';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  currentDomain: Domain;
  onDomainChange: (domain: Domain) => void;
}

const domains: { id: Domain; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'car', label: 'Car', icon: Car },
  { id: 'pet', label: 'Pet', icon: Heart },
  { id: 'life', label: 'Life', icon: User },
];

export function BottomNav({ currentDomain, onDomainChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t border-[var(--color-gray-200)] z-30">
      <div className="flex items-center justify-around px-2 py-2">
        {domains.map(({ id, label, icon: Icon }) => {
          const isActive = currentDomain === id;
          return (
            <button
              key={id}
              onClick={() => onDomainChange(id)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-[var(--radius-md)] transition-colors',
                isActive
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)]'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'fill-current')} />
              <span className={cn('text-xs font-medium', isActive && 'font-semibold')}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

