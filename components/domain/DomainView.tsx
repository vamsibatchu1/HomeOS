'use client';

import React, { useState } from 'react';
import { Domain, TaskInstance, TaskHistory } from '@/types';
import { DomainTabs } from '@/components/domain/DomainTabs';
import { TodayPage } from '@/components/pages/TodayPage';
import { AllTasksPage } from '@/components/pages/AllTasksPage';
import { HistoryPage } from '@/components/pages/HistoryPage';
import { TaskDetailModal } from '@/components/tasks/TaskDetailModal';
import { AddTaskModal } from '@/components/tasks/AddTaskModal';
import { FloatingActionButton } from '@/components/tasks/FloatingActionButton';

type TabType = 'today' | 'all' | 'history';

interface DomainViewProps {
  domain: Domain;
  tasks: TaskInstance[];
  history: TaskHistory[];
  onMarkDone: (task: TaskInstance) => void;
  onSnooze: (task: TaskInstance) => void;
  onTaskUpdate: (task: TaskInstance) => void;
  onTaskDelete: (taskId: string) => void;
  onAddTask: (task: TaskInstance) => void;
}

export function DomainView({
  domain,
  tasks,
  history,
  onMarkDone,
  onSnooze,
  onTaskUpdate,
  onTaskDelete,
  onAddTask,
}: DomainViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [selectedTask, setSelectedTask] = useState<TaskInstance | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleTaskClick = (task: TaskInstance) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSave = (task: TaskInstance) => {
    onTaskUpdate(task);
    setSelectedTask(null);
  };

  const handleDelete = (taskId: string) => {
    onTaskDelete(taskId);
    setSelectedTask(null);
  };

  const handleAddTask = (task: TaskInstance) => {
    onAddTask(task);
  };

  return (
    <>
      <DomainTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="min-h-screen" style={{ backgroundColor: 'var(--page-background)' }}>
        {activeTab === 'today' && (
          <TodayPage
            tasks={tasks}
            domain={domain}
            onMarkDone={onMarkDone}
            onSnooze={onSnooze}
          />
        )}
        {activeTab === 'all' && (
          <AllTasksPage
            tasks={tasks}
            domain={domain}
            onTaskClick={handleTaskClick}
          />
        )}
        {activeTab === 'history' && (
          <HistoryPage history={history} domain={domain} />
        )}
      </div>

      <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />

      <TaskDetailModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSave}
        onDelete={handleDelete}
      />

      <AddTaskModal
        domain={domain}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTask}
      />
    </>
  );
}

