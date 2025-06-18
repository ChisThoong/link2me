'use client';

import React from 'react';
import { PROFILE_TEMPLATES, ProfileTemplate } from '@/lib/templates';

export default function TemplateSelector({
  onApply,
}: {
  onApply: (template: ProfileTemplate) => void;
}) {
  return (
    <div className="mb-6">
      <label className="text-sm font-semibold block mb-2">Chọn giao diện có sẵn:</label>
      <div className="flex flex-wrap gap-3">
        {PROFILE_TEMPLATES.map((template, index) => (
          <button
            key={index}
            onClick={() => onApply(template)}
            className="px-4 py-2 bg-gray-100 hover:bg-indigo-100 border rounded-md text-sm font-medium transition"
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
}
