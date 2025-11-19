import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated';
}

export function Card({ children, className, onClick, variant = 'default' }: CardProps) {
  const baseStyles = 'bg-white rounded-[var(--radius-lg)] p-[var(--spacing-lg)]';
  const variants = {
    default: 'border border-[var(--color-gray-200)]',
    elevated: 'shadow-[var(--shadow-md)]',
  };
  
  return (
    <div
      className={cn(baseStyles, variants[variant], onClick && 'cursor-pointer active:scale-[0.98]', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

