import { TaskInstance, Domain } from '@/types';
import { taskTemplates } from '@/data/templates';
import { calculateNextDueDate } from './dateUtils';

export function initializeDefaultTasks(domain: Domain): TaskInstance[] {
  const templates = taskTemplates.filter(t => t.domain === domain);
  
  return templates.map(template => {
    const nextDueDate = calculateNextDueDate({
      id: '',
      templateId: template.id,
      name: template.name,
      description: template.description,
      icon: template.icon,
      category: template.category,
      domain: template.domain,
      frequency: template.defaultFrequency,
      cost: template.defaultCost,
      notes: template.defaultNotes,
      nextDueDate: new Date(),
      createdAt: new Date(),
    });

    return {
      id: `${template.domain}-${template.id}-${Date.now()}`,
      templateId: template.id,
      name: template.name,
      description: template.description,
      icon: template.icon,
      category: template.category,
      domain: template.domain,
      frequency: template.defaultFrequency,
      cost: template.defaultCost,
      notes: template.defaultNotes,
      nextDueDate,
      createdAt: new Date(),
    };
  });
}

