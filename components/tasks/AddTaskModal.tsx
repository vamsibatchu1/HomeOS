'use client';

import React, { useState } from 'react';
import { Domain, TaskInstance, Frequency, FrequencyType } from '@/types';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { taskTemplates } from '@/data/templates';
import { calculateNextDueDate } from '@/lib/dateUtils';

interface AddTaskModalProps {
  domain: Domain;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: TaskInstance) => void;
}

export function AddTaskModal({ domain, isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [frequency, setFrequency] = useState<Frequency>({ type: 'monthly', value: 1 });

  const availableTemplates = taskTemplates.filter(t => t.domain === domain);

  const handleAdd = () => {
    let newTask: TaskInstance;

    if (selectedTemplate) {
      const template = availableTemplates.find(t => t.id === selectedTemplate);
      if (!template) return;

      newTask = {
        id: `${domain}-${template.id}-${Date.now()}`,
        templateId: template.id,
        name: template.name,
        description: template.description,
        icon: template.icon,
        category: template.category,
        domain: template.domain,
        frequency: template.defaultFrequency,
        cost: template.defaultCost,
        notes: template.defaultNotes,
        nextDueDate: calculateNextDueDate({
          id: '',
          templateId: template.id,
          name: template.name,
          category: template.category,
          domain: template.domain,
          frequency: template.defaultFrequency,
          nextDueDate: new Date(),
          createdAt: new Date(),
        }),
        createdAt: new Date(),
      };
    } else if (customName && customCategory) {
      newTask = {
        id: `${domain}-custom-${Date.now()}`,
        templateId: 'custom',
        name: customName,
        category: customCategory,
        domain,
        frequency,
        nextDueDate: calculateNextDueDate({
          id: '',
          templateId: 'custom',
          name: customName,
          category: customCategory,
          domain,
          frequency,
          nextDueDate: new Date(),
          createdAt: new Date(),
        }),
        createdAt: new Date(),
      };
    } else {
      return;
    }

    onAdd(newTask);
    onClose();
    // Reset form
    setSelectedTemplate('');
    setCustomName('');
    setCustomCategory('');
    setFrequency({ type: 'monthly', value: 1 });
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Add Task">
      <div className="p-[var(--spacing-lg)] space-y-4">
        {/* Template Selection */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
            Choose from templates
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableTemplates.map(template => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`w-full text-left px-3 py-2 rounded-[var(--radius-md)] border transition-colors ${
                  selectedTemplate === template.id
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
                    : 'border-[var(--color-gray-200)] hover:bg-[var(--color-gray-50)]'
                }`}
              >
                <div className="font-medium text-[var(--color-gray-900)]">{template.name}</div>
                <div className="text-xs text-[var(--color-gray-500)]">{template.category}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-[var(--color-gray-500)]">OR</div>

        {/* Custom Task */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
            Create custom task
          </label>
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Task name"
            className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)] mb-2"
          />
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="Category"
            className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)] mb-2"
          />
          
          {/* Frequency */}
          <div className="mt-2">
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Frequency
            </label>
            <select
              value={frequency.type}
              onChange={(e) => setFrequency({ ...frequency, type: e.target.value as FrequencyType })}
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom</option>
            </select>
            {frequency.type === 'custom' && (
              <div className="mt-2 flex gap-2">
                <input
                  type="number"
                  value={frequency.value || 1}
                  onChange={(e) => setFrequency({ ...frequency, value: parseInt(e.target.value) || 1 })}
                  className="flex-1 px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
                  placeholder="Every"
                  min="1"
                />
                <select
                  value={frequency.unit || 'days'}
                  onChange={(e) => setFrequency({ ...frequency, unit: e.target.value as any })}
                  className="flex-1 px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-[var(--color-gray-200)]">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAdd}
            className="flex-1"
            disabled={!selectedTemplate && (!customName || !customCategory)}
          >
            Add Task
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}

