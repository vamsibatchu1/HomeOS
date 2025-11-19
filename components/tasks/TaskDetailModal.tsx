'use client';

import React, { useState, useEffect } from 'react';
import { TaskInstance, Frequency, FrequencyType } from '@/types';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { formatFrequency } from '@/lib/dateUtils';

interface TaskDetailModalProps {
  task: TaskInstance | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: TaskInstance) => void;
  onDelete?: (taskId: string) => void;
}

export function TaskDetailModal({ task, isOpen, onClose, onSave, onDelete }: TaskDetailModalProps) {
  const [editedTask, setEditedTask] = useState<TaskInstance | null>(null);

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  if (!editedTask) return null;

  const handleFrequencyChange = (field: keyof Frequency, value: any) => {
    if (!editedTask) return;
    setEditedTask({
      ...editedTask,
      frequency: {
        ...editedTask.frequency,
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    if (editedTask) {
      onSave(editedTask);
      onClose();
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={editedTask.name}>
      <div className="p-[var(--spacing-lg)] space-y-4">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
            Description
          </label>
          <textarea
            value={editedTask.description || ''}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)] resize-none"
            rows={3}
            placeholder="Add description..."
          />
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
            Frequency
          </label>
          <select
            value={editedTask.frequency.type}
            onChange={(e) => handleFrequencyChange('type', e.target.value as FrequencyType)}
            className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom</option>
          </select>
          {editedTask.frequency.type === 'custom' && (
            <div className="mt-2 flex gap-2">
              <input
                type="number"
                value={editedTask.frequency.value || 1}
                onChange={(e) => handleFrequencyChange('value', parseInt(e.target.value) || 1)}
                className="flex-1 px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
                placeholder="Every"
                min="1"
              />
              <select
                value={editedTask.frequency.unit || 'days'}
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
        </div>

        {/* Cost */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
            Cost (optional)
          </label>
          <input
            type="number"
            value={editedTask.cost || ''}
            onChange={(e) => setEditedTask({ ...editedTask, cost: e.target.value ? parseFloat(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
            placeholder="0.00"
            step="0.01"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
            Notes (optional)
          </label>
          <textarea
            value={editedTask.notes || ''}
            onChange={(e) => setEditedTask({ ...editedTask, notes: e.target.value })}
            className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)] resize-none"
            rows={2}
            placeholder="Add notes..."
          />
        </div>

        {/* Brand/Model */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
            Brand/Model (optional)
          </label>
          <input
            type="text"
            value={editedTask.brandModel || ''}
            onChange={(e) => setEditedTask({ ...editedTask, brandModel: e.target.value })}
            className="w-full px-3 py-2 border border-[var(--color-gray-200)] rounded-[var(--radius-md)]"
            placeholder="e.g., Filter size, model number..."
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-[var(--color-gray-200)]">
          {onDelete && (
            <Button
              variant="danger"
              onClick={() => {
                if (editedTask && onDelete) {
                  onDelete(editedTask.id);
                  onClose();
                }
              }}
              className="flex-1"
            >
              Delete
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex-1"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}

