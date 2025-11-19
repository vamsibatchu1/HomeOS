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
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [cost, setCost] = useState<string>('');
  const [brandModel, setBrandModel] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [frequency, setFrequency] = useState<Frequency>({ type: 'monthly', value: 1 });
  const [nextDue, setNextDue] = useState<string>('');
  const [lastCompleted, setLastCompleted] = useState<string>('');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [useTemplate, setUseTemplate] = useState(true);

  const availableTemplates = taskTemplates.filter(t => t.domain === domain);

  const handleFrequencyChange = (field: keyof Frequency, value: any) => {
    setFrequency(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAdd = () => {
    let newTask: TaskInstance;

    if (useTemplate && selectedTemplate) {
      const template = availableTemplates.find(t => t.id === selectedTemplate);
      if (!template) return;

      const nextDueDate = nextDue ? new Date(nextDue) : calculateNextDueDate({
        id: '',
        templateId: template.id,
        name: template.name,
        category: template.category,
        domain: template.domain,
        frequency: template.defaultFrequency,
        nextDueDate: new Date(),
        createdAt: new Date(),
      });

      newTask = {
        id: `${domain}-${template.id}-${Date.now()}`,
        templateId: template.id,
        name: template.name,
        description: description || template.description,
        icon: template.icon,
        category: template.category,
        domain: template.domain,
        frequency: template.defaultFrequency,
        cost: cost ? parseFloat(cost) : template.defaultCost,
        notes: notes || template.defaultNotes,
        brandModel: brandModel || undefined,
        nextDueDate: nextDueDate,
        lastCompleted: lastCompleted ? new Date(lastCompleted) : undefined,
        createdAt: new Date(),
        notificationEnabled: notificationEnabled,
        customFields: {
          tags: tags ? tags.split(',').map(t => t.trim()) : undefined,
          location: location || undefined,
        },
      };
    } else if (name && category) {
      const nextDueDate = nextDue ? new Date(nextDue) : calculateNextDueDate({
        id: '',
        templateId: 'custom',
        name,
        category,
        domain,
        frequency,
        nextDueDate: new Date(),
        createdAt: new Date(),
      });

      newTask = {
        id: `${domain}-custom-${Date.now()}`,
        templateId: 'custom',
        name,
        description: description || undefined,
        category,
        domain,
        frequency,
        cost: cost ? parseFloat(cost) : undefined,
        notes: notes || undefined,
        brandModel: brandModel || undefined,
        nextDueDate: nextDueDate,
        lastCompleted: lastCompleted ? new Date(lastCompleted) : undefined,
        createdAt: new Date(),
        notificationEnabled: notificationEnabled,
        customFields: {
          tags: tags ? tags.split(',').map(t => t.trim()) : undefined,
          location: location || undefined,
        },
      };
    } else {
      return;
    }

    onAdd(newTask);
    onClose();
    // Reset form
    setSelectedTemplate('');
    setName('');
    setCategory('');
    setDescription('');
    setNotes('');
    setCost('');
    setBrandModel('');
    setTags('');
    setLocation('');
    setFrequency({ type: 'monthly', value: 1 });
    setNextDue('');
    setLastCompleted('');
    setNotificationEnabled(false);
    setUseTemplate(true);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = availableTemplates.find(t => t.id === templateId);
    if (template) {
      setName(template.name);
      setCategory(template.category);
      setDescription(template.description || '');
      setFrequency(template.defaultFrequency);
      setCost(template.defaultCost?.toString() || '');
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Add Task">
      <div className="p-[var(--spacing-lg)] space-y-4 max-h-[80vh] overflow-y-auto">
        {/* Template vs Custom Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setUseTemplate(true)}
            className={`flex-1 py-2 px-4 rounded-[var(--radius-md)] text-sm font-medium transition-all ${
              useTemplate
                ? 'bg-[var(--color-gray-900)] text-white'
                : 'bg-white text-[var(--color-gray-700)] border border-[var(--color-gray-300)]'
            }`}
          >
            From Template
          </button>
          <button
            onClick={() => setUseTemplate(false)}
            className={`flex-1 py-2 px-4 rounded-[var(--radius-md)] text-sm font-medium transition-all ${
              !useTemplate
                ? 'bg-[var(--color-gray-900)] text-white'
                : 'bg-white text-[var(--color-gray-700)] border border-[var(--color-gray-300)]'
            }`}
          >
            Custom Task
          </button>
        </div>

        {/* Template Selection */}
        {useTemplate && (
          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Choose from templates
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
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
        )}

        {/* Required Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Task Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter task name"
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
              required
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Frequency <span className="text-red-500">*</span>
            </label>
            <select
              value={frequency.type}
              onChange={(e) => handleFrequencyChange('type', e.target.value as FrequencyType)}
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)] mb-2"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom</option>
            </select>
            {frequency.type === 'custom' && (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={frequency.value || 1}
                  onChange={(e) => handleFrequencyChange('value', parseInt(e.target.value) || 1)}
                  className="flex-1 px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
                  placeholder="Every"
                  min="1"
                />
                <select
                  value={frequency.unit || 'days'}
                  onChange={(e) => handleFrequencyChange('unit', e.target.value)}
                  className="flex-1 px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            )}
            {frequency.type === 'weekly' && (
              <select
                value={frequency.dayOfWeek?.toString() || ''}
                onChange={(e) => handleFrequencyChange('dayOfWeek', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)] mt-2"
              >
                <option value="">Every week</option>
                <option value="0">Every Sunday</option>
                <option value="1">Every Monday</option>
                <option value="2">Every Tuesday</option>
                <option value="3">Every Wednesday</option>
                <option value="4">Every Thursday</option>
                <option value="5">Every Friday</option>
                <option value="6">Every Saturday</option>
              </select>
            )}
            {frequency.type === 'monthly' && (
              <input
                type="number"
                value={frequency.dayOfMonth || ''}
                onChange={(e) => handleFrequencyChange('dayOfMonth', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)] mt-2"
                placeholder="Day of month (1-31)"
                min="1"
                max="31"
              />
            )}
          </div>

          {/* Next Due Date */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Next Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={nextDue}
              onChange={(e) => setNextDue(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
              required
            />
          </div>
        </div>

        {/* Optional Fields */}
        <div className="space-y-4 pt-4 border-t border-[var(--color-gray-200)]">
          <h3 className="text-sm font-semibold text-[var(--color-gray-700)]">Optional Fields</h3>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)] resize-none"
              rows={3}
              placeholder="Add description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)] resize-none"
              rows={2}
              placeholder="Add notes..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Cost
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
              placeholder="0.00"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Brand/Model
            </label>
            <input
              type="text"
              value={brandModel}
              onChange={(e) => setBrandModel(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
              placeholder="e.g., Filter size, model number..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
              placeholder="e.g., urgent, maintenance, recurring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
              placeholder="e.g., Garage, Kitchen, Office"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
              Last Completed (if known)
            </label>
            <input
              type="date"
              value={lastCompleted}
              onChange={(e) => setLastCompleted(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="notifications"
              checked={notificationEnabled}
              onChange={(e) => setNotificationEnabled(e.target.checked)}
              className="w-4 h-4 text-[var(--color-primary)] border-[var(--color-gray-300)] rounded"
            />
            <label htmlFor="notifications" className="text-sm text-[var(--color-gray-700)]">
              Enable notifications for this task
            </label>
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
            disabled={!name || !category || !nextDue}
          >
            Add Task
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
