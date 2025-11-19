import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Clock } from 'lucide-react';

export function getIconComponent(iconName?: string): React.ElementType {
  if (!iconName) return Clock;
  
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
  return IconComponent || Clock;
}

