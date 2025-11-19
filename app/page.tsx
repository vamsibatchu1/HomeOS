'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Domain, TaskInstance, TaskHistory } from '@/types';
import { BottomNav } from '@/components/navigation/BottomNav';
import { DomainView } from '@/components/domain/DomainView';
import { Toast } from '@/components/ui/Toast';
import { getTasks, saveTasks, getHistory, addHistoryEntry, updateTask, addTask, deleteTask } from '@/lib/storage';
import { calculateNextDueDate } from '@/lib/dateUtils';
import { initializeDefaultTasks } from '@/lib/initTasks';

export default function Home() {
  const [currentDomain, setCurrentDomain] = useState<Domain>('home');
  const [tasks, setTasks] = useState<TaskInstance[]>([]);
  const [history, setHistory] = useState<TaskHistory[]>([]);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  // Initialize tasks on mount
  useEffect(() => {
    const storedTasks = getTasks();
    const storedHistory = getHistory();

    if (storedTasks.length === 0) {
      // Initialize with default tasks for all domains
      const allDefaultTasks: TaskInstance[] = [];
      (['home', 'car', 'pet', 'life'] as Domain[]).forEach(domain => {
        const domainTasks = initializeDefaultTasks(domain);
        allDefaultTasks.push(...domainTasks);
      });
      saveTasks(allDefaultTasks);
      setTasks(allDefaultTasks);
    } else {
      setTasks(storedTasks);
    }

    setHistory(storedHistory);
  }, []);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleMarkDone = (task: TaskInstance) => {
    const completedDate = new Date();
    const nextDueDate = calculateNextDueDate(task, completedDate);

    // Update task
    const updatedTask: TaskInstance = {
      ...task,
      lastCompleted: completedDate,
      nextDueDate,
    };

    updateTask(updatedTask);
    setTasks(getTasks());

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

    addHistoryEntry(historyEntry);
    setHistory(getHistory());

    showToastMessage(`${task.name} marked as done!`);
  };

  const handleSnooze = (task: TaskInstance) => {
    // Snooze by adding 1 day to next due date
    const snoozedDate = new Date(task.nextDueDate);
    snoozedDate.setDate(snoozedDate.getDate() + 1);

    const updatedTask: TaskInstance = {
      ...task,
      nextDueDate: snoozedDate,
    };

    updateTask(updatedTask);
    setTasks(getTasks());
    showToastMessage(`${task.name} snoozed until ${snoozedDate.toLocaleDateString()}`);
  };

  const handleTaskUpdate = (task: TaskInstance) => {
    updateTask(task);
    setTasks(getTasks());
    showToastMessage(`${task.name} updated`);
  };

  const handleTaskDelete = (taskId: string) => {
    deleteTask(taskId);
    setTasks(getTasks());
    showToastMessage('Task deleted');
  };

  const handleAddTask = (task: TaskInstance) => {
    addTask(task);
    setTasks(getTasks());
    showToastMessage(`${task.name} added!`);
  };

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
