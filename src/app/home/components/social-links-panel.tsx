'use client';

import { useState } from 'react';
import {
  Pencil,
  Trash2,
} from 'lucide-react';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import { SOCIAL_OPTIONS } from '@/lib/social';
import { SOCIAL_ICONS } from '@/lib/social';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface SocialItem {
  type: string;
  url: string;
  active: boolean;
  displayAs?: 'icon' | 'button';
}

interface Props {
  socials: SocialItem[];
  setSocials: (value: SocialItem[]) => void;
  isPro?: boolean;
}

export default function SocialLinksPanel({ socials, setSocials, isPro }: Props) {
  const [selectedType, setSelectedType] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const router = useRouter();

  const handleAdd = () => {
    if (!selectedType || !inputUrl) return;
    if (!isPro && socials.length >= 3) {
      toast.error('Bạn cần nâng cấp Pro để thêm nhiều liên kết hơn!');
      return;
    }
    if (socials.some((s) => s.type === selectedType)) return;

    setSocials([...socials, {
      type: selectedType,
      url: inputUrl,
      active: true,
      displayAs: 'button',
    }]);
    setSelectedType('');
    setInputUrl('');
  };

  const handleDelete = (index: number) => {
    const updated = [...socials];
    updated.splice(index, 1);
    setSocials(updated);
  };

  const handleToggle = (index: number) => {
    const updated = [...socials];
    updated[index].active = !updated[index].active;
    setSocials(updated);
  };

  const handleEdit = (index: number) => {
    const current = socials[index];
    setSelectedType(current.type);
    setInputUrl(current.url);
    handleDelete(index);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Mạng xã hội</h2>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-full md:w-1/3"
        >
          <option value="">Chọn...</option>
          {SOCIAL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-full"
          placeholder="https://..."
        />

        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-4 py-1 rounded-md text-sm"
        >
          Thêm
        </button>
      </div>

      <div className="space-y-3">
        {socials.map((social, index) => {
          const iconKey = social.type as keyof typeof SOCIAL_ICONS;
          const Icon = SOCIAL_ICONS[iconKey];
          const label = SOCIAL_OPTIONS.find((s) => s.value === social.type)?.label || social.type;

          return (
            <div
              key={index}
              className="flex items-center justify-between border p-4 rounded-md shadow-sm"
            >
              <div className="flex items-center gap-3">
                {Icon && <Icon className="w-6 h-6 text-blue-500" />}
                <div>
                  <div className="text-sm font-medium text-gray-700">My {label}</div>
                  <div className="text-sm text-indigo-700 truncate overflow-hidden whitespace-nowrap max-w-[220px]">{social.url}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Hiển thị:
                    <select
                      value={social.displayAs || 'button'}
                      onChange={(e) => {
                        const updated = [...socials];
                        updated[index].displayAs = e.target.value as 'icon' | 'button';
                        setSocials(updated);
                      }}
                      className="ml-2 border rounded px-1 py-0.5 text-xs"
                    >
                      <option value="button">Button</option>
                      <option value="icon">Icon</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="cursor-move text-gray-400">⋮⋮</div>
                <button
                  onClick={() => handleEdit(index)}
                  className="p-1 bg-gray-800 text-white rounded-md"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
                <Switch
                  checked={social.active}
                  onChange={() => handleToggle(index)}
                  className={clsx(
                    'relative inline-flex h-4 w-8 items-center rounded-full transition',
                    social.active ? 'bg-indigo-600' : 'bg-gray-300'
                  )}
                >
                  <span
                    className={clsx(
                      'inline-block h-3 w-3 transform rounded-full bg-white transition',
                      social.active ? 'translate-x-5' : 'translate-x-1'
                    )}
                  />
                </Switch>
              </div>
            </div>
          );
        })}
         {/* Nâng cấp Pro nếu chưa phải Pro */}
         {!isPro && socials.length >= 3 && (
          <div className="p-4 text-center border rounded-md bg-yellow-50 text-yellow-800">
            <p className="text-sm font-medium mb-2">Bạn đang dùng bản miễn phí.</p>
            <button
                 onClick={() => router.push('/upgrade')}
                className="inline-block border border-yellow-500 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-md transition shadow-sm"
              >
                Nâng cấp Pro để thêm nhiều liên kết
              </button>

          </div>
        )}
      </div>
    </div>
  );
}
