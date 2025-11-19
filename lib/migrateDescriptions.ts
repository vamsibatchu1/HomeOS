import { getTasks, updateTask } from './storage';
import { taskTemplates } from '@/data/templates';
import { TaskInstance } from '@/types';

/**
 * Migration script to add descriptions to existing tasks in Firebase
 * Run this once to update all existing tasks with descriptions from templates
 */
export async function migrateTaskDescriptions(): Promise<void> {
  try {
    if (typeof window === 'undefined') return; // Only run on client side
    console.log('Starting description migration...');
    const tasks = await getTasks();
    const templateMap = new Map(taskTemplates.map(t => [t.id, t]));
    
    let updated = 0;
    let skipped = 0;

    for (const task of tasks) {
      // Only update if task has no description and matches a template
      if (!task.description && task.templateId && templateMap.has(task.templateId)) {
        const template = templateMap.get(task.templateId)!;
        const updatedTask: TaskInstance = {
          ...task,
          description: template.description,
        };
        
        await updateTask(updatedTask);
        updated++;
        console.log(`Updated: ${task.name}`);
      } else {
        skipped++;
      }
    }

    console.log(`Migration complete! Updated: ${updated}, Skipped: ${skipped}`);
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
}

