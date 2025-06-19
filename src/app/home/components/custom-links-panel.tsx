'use client';

import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Switch } from '@headlessui/react';
import ThumbnailUploader from './thumbnail-uploader';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CustomLink {
  title: string;
  url: string;
  active: boolean;
  thumbnailUrl?: string;
  animation?: string;
}

interface Props {
  links: CustomLink[];
  setLinks: (value: CustomLink[]) => void;
  isPro?: boolean;
}

export default function CustomLinksPanel({ links, setLinks, isPro }: Props) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleAddOrUpdate = () => {
    if (!title || !url) return;

    const newLink = { title, url, active: true };

    if (editingIndex !== null) {
      const updated = [...links];
      updated[editingIndex] = { ...updated[editingIndex], ...newLink };
      setLinks(updated);
      setEditingIndex(null);
    } else {
      if (!isPro && links.length >= 3) {
        toast.error('Bạn cần nâng cấp Pro để thêm nhiều liên kết hơn!');
        return;
      }
      setLinks([...links, newLink]);
    }

    setTitle('');
    setUrl('');
  };

  const handleDelete = (index: number) => {
    const updated = [...links];
    updated.splice(index, 1);
    setLinks(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setTitle('');
      setUrl('');
    }
  };

  const handleToggle = (index: number) => {
    const updated = [...links];
    updated[index].active = !updated[index].active;
    setLinks(updated);
  };

  const handleEdit = (index: number) => {
    const current = links[index];
    setTitle(current.title);
    setUrl(current.url);
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setTitle('');
    setUrl('');
    setEditingIndex(null);
  };

  return (
    <div className="">
      <h2 className="text-lg font-bold mb-4">Liên kết tùy chỉnh</h2>

      {/* Form nhập link */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 items-start">
        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-full"
        />
        <div className="flex gap-2">
          <button
            onClick={handleAddOrUpdate}
            className="bg-indigo-600 text-white px-4 py-1 rounded-md text-sm"
          >
            {editingIndex !== null ? 'Cập nhật' : 'Thêm'}
          </button>
          {editingIndex !== null && (
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm"
            >
              Huỷ
            </button>
          )}
        </div>
      </div>

      {/* Danh sách links */}
      <div className="space-y-4">
        {links.map((link, index) => (
          <div
            key={index}
            className="border p-4 rounded-md shadow-sm flex flex-col gap-2"
          >
            <div className="flex gap-4 items-start">
              {/* Cột thumbnail */}
              <div className="w-[90px] flex-shrink-0 flex flex-col items-center gap-1">
                <ThumbnailUploader
                  currentUrl={link.thumbnailUrl}
                  onUploaded={(url) => {
                    const updated = [...links];
                    updated[index].thumbnailUrl = url;
                    setLinks(updated);
                  }}
                />
              </div>

              {/* Cột nội dung chính */}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">{link.title}</div>
                    <div className="text-sm text-indigo-700 truncate overflow-hidden whitespace-nowrap max-w-[180px]">
                      {link.url}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
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
                      checked={link.active}
                      onChange={() => handleToggle(index)}
                      className={clsx(
                        'relative inline-flex h-4 w-8 items-center rounded-full transition',
                        link.active ? 'bg-indigo-600' : 'bg-gray-300'
                      )}
                    >
                      <span
                        className={clsx(
                          'inline-block h-3 w-3 transform rounded-full bg-white transition',
                          link.active ? 'translate-x-5' : 'translate-x-1'
                        )}
                      />
                    </Switch>
                  </div>
                </div>

                {/* Animation chọn */}
                <div className="mt-2 text-sm">
                  Animation:
                  <select
                    value={link.animation || 'none'}
                    onChange={(e) => {
                      const updated = [...links];
                      updated[index].animation = e.target.value;
                      setLinks(updated);
                    }}
                    className="ml-2 border rounded px-2 py-1 text-sm"
                  >
                    <option value="none">None</option>
                    <option value="buzz">Buzz</option>
                    <option value="wobble">Wobble</option>
                    <option value="pop">Pop</option>
                    <option value="blink">Blink</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Nâng cấp Pro nếu chưa phải Pro */}
        {!isPro && links.length >= 3 && (
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
