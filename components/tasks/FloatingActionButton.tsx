'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

export function FloatingActionButton({ onClick, className }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-20 right-4 z-20 w-14 h-14 rounded-full bg-[var(--color-primary)] text-white',
        'shadow-[var(--shadow-lg)] flex items-center justify-center',
        'hover:bg-[var(--color-primary-dark)] active:scale-95 transition-all',
        'max-w-[480px] mx-auto',
        className
      )}
      aria-label="Add Task"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}

