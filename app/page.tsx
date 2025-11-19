'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Domain, TaskInstance, TaskHistory } from '@/types';
import { BottomNav } from '@/components/navigation/BottomNav';
import { DomainView } from '@/components/domain/DomainView';
import { Toast } from '@/components/ui/Toast';
import { getTasks, getHistory, addHistoryEntry, updateTask, addTask, deleteTask } from '@/lib/storage';
import { calculateNextDueDate } from '@/lib/dateUtils';
import { initializeDefaultTasks } from '@/lib/initTasks';
import { migrateTaskDescriptions } from '@/lib/migrateDescriptions';

export default function Home() {
  const [currentDomain, setCurrentDomain] = useState<Domain>('home');
  const [tasks, setTasks] = useState<TaskInstance[]>([]);
  const [history, setHistory] = useState<TaskHistory[]>([]);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize tasks on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [storedTasks, storedHistory] = await Promise.all([
          getTasks(),
          getHistory(),
        ]);

        if (storedTasks.length === 0) {
          // Initialize with default tasks for all domains
          const allDefaultTasks: TaskInstance[] = [];
          (['home', 'car', 'pet', 'life'] as Domain[]).forEach(domain => {
            const domainTasks = initializeDefaultTasks(domain);
            allDefaultTasks.push(...domainTasks);
          });
          
          // Add all default tasks to Firebase
          for (const task of allDefaultTasks) {
            await addTask(task);
          }
          
          // Reload tasks after adding defaults
          const updatedTasks = await getTasks();
          setTasks(updatedTasks);
        } else {
          setTasks(storedTasks);
          // Migrate descriptions for existing tasks (runs once)
          try {
            await migrateTaskDescriptions();
            // Reload tasks after migration
            const migratedTasks = await getTasks();
            setTasks(migratedTasks);
          } catch (error) {
            console.error('Migration error (non-critical):', error);
          }
        }

        setHistory(storedHistory);
      } catch (error) {
        console.error('Error loading data:', error);
        showToastMessage('Error loading tasks. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleMarkDone = async (task: TaskInstance) => {
    try {
      const completedDate = new Date();
      const nextDueDate = calculateNextDueDate(task, completedDate);

      // Update task
      const updatedTask: TaskInstance = {
        ...task,
        lastCompleted: completedDate,
        nextDueDate,
      };

      await updateTask(updatedTask);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);

      // Add to history
      const historyEntry: TaskHistory = {
        id: `history-${Date.now()}-${task.id}`,
        taskInstanceId: task.id,
        taskName: task.name,
        category: task.category,
        domain: task.domain,
        completedAt: completedDate,
        notes: task.notes,
        cost: task.cost,
      };

      await addHistoryEntry(historyEntry);
      const updatedHistory = await getHistory();
      setHistory(updatedHistory);

      showToastMessage(`${task.name} marked as done!`);
    } catch (error) {
      console.error('Error marking task as done:', error);
      showToastMessage('Error updating task. Please try again.');
    }
  };

  const handleSnooze = async (task: TaskInstance) => {
    try {
      // Snooze by adding 1 day to next due date
      const snoozedDate = new Date(task.nextDueDate);
      snoozedDate.setDate(snoozedDate.getDate() + 1);

      const updatedTask: TaskInstance = {
        ...task,
        nextDueDate: snoozedDate,
      };

      await updateTask(updatedTask);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
      showToastMessage(`${task.name} snoozed until ${snoozedDate.toLocaleDateString()}`);
    } catch (error) {
      console.error('Error snoozing task:', error);
      showToastMessage('Error snoozing task. Please try again.');
    }
  };

  const handleTaskUpdate = async (task: TaskInstance) => {
    try {
      await updateTask(task);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
      showToastMessage(`${task.name} updated`);
    } catch (error) {
      console.error('Error updating task:', error);
      showToastMessage('Error updating task. Please try again.');
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
      showToastMessage('Task deleted');
    } catch (error) {
      console.error('Error deleting task:', error);
      showToastMessage('Error deleting task. Please try again.');
    }
  };

  const handleAddTask = async (task: TaskInstance) => {
    try {
      await addTask(task);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
      showToastMessage(`${task.name} added!`);
    } catch (error) {
      console.error('Error adding task:', error);
      showToastMessage('Error adding task. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center" style={{ backgroundColor: 'var(--page-background)' }}>
        <div className="text-center">
          <p className="text-[var(--color-gray-500)]">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--page-background)' }}>
      <div className="sticky top-0 z-20" style={{ backgroundColor: 'var(--page-background)' }}>
        <div className="max-w-[480px] mx-auto px-4 py-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <h1 className="text-2xl font-bold text-[var(--color-gray-900)]">
              Today, {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
            </h1>
            <ChevronDown className="w-4 h-4 text-[var(--color-gray-400)]" />
          </div>
        </div>
      </div>

      <DomainView
        domain={currentDomain}
        tasks={tasks}
        history={history}
        onMarkDone={handleMarkDone}
        onSnooze={handleSnooze}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onAddTask={handleAddTask}
      />

      <BottomNav currentDomain={currentDomain} onDomainChange={setCurrentDomain} />

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
