'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function BottomSheet({ isOpen, onClose, title, children, className }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[var(--radius-xl)] shadow-[var(--shadow-lg)]',
          'max-w-[480px] mx-auto animate-in slide-in-from-bottom duration-300',
          className
        )}
        style={{ maxHeight: '90vh' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-[var(--color-gray-300)] rounded-full" />
        </div>
        
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-[var(--spacing-lg)] pb-[var(--spacing-md)] border-b border-[var(--color-gray-200)]">
            <h2 className="text-lg font-semibold text-[var(--color-gray-900)]">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[var(--color-gray-100)] transition-colors"
            >
              <X className="w-5 h-5 text-[var(--color-gray-600)]" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {children}
        </div>
      </div>
    </>
  );
}

