'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[480px] w-full px-4">
      <div
        className={cn(
          'bg-[var(--color-primary)] text-white px-4 py-3 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)]',
          'flex items-center gap-2 animate-in slide-in-from-top fade-in duration-300'
        )}
      >
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}

