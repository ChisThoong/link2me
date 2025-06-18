'use client';

import { useState } from 'react';
import { Trash2, Pencil } from 'lucide-react';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import ThumbnailUploader from './thumbnail-uploader';

interface ProductItem {
  name: string;
  price: string;
  imageUrl: string;
  link: string;
  category: string;
  layout: '2-column' | '3-column';
  active: boolean;
}

interface Props {
  products: ProductItem[];
  setProducts: (value: ProductItem[]) => void;
}

export default function ProductLinksPanel({ products, setProducts }: Props) {
  const [form, setForm] = useState<ProductItem>({
    name: '',
    price: '',
    imageUrl: '',
    link: '',
    category: '',
    layout: '2-column',
    active: true,
  });

  const handleAdd = () => {
    if (!form.name || !form.link || !form.imageUrl || !form.price) return;
    setProducts([...products, { ...form }]);
    setForm({
      name: '',
      price: '',
      imageUrl: '',
      link: '',
      category: '',
      layout: '2-column',
      active: true,
    });
  };

  const handleDelete = (index: number) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handleEdit = (index: number) => {
    setForm(products[index]);
    handleDelete(index);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Danh sách sản phẩm</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded-md px-3 py-2 text-sm"
          placeholder="Tên sản phẩm"
        />
        <input
          type="text"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border rounded-md px-3 py-2 text-sm"
          placeholder="Giá"
        />
        <div>
          <label className="text-sm font-medium block mb-1">Ảnh sản phẩm</label>
          <ThumbnailUploader
            currentUrl={form.imageUrl}
            onUploaded={(url) => setForm({ ...form, imageUrl: url })}
          />
        </div>
        <input
          type="text"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="border rounded-md px-3 py-2 text-sm"
          placeholder="Link sản phẩm"
        />
        <input
          type="text"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border rounded-md px-3 py-2 text-sm"
          placeholder="Loại sản phẩm"
        />
        <select
          value={form.layout}
          onChange={(e) =>
            setForm({ ...form, layout: e.target.value as '2-column' | '3-column' })
          }
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="2-column">1 dòng 2 sản phẩm</option>
          <option value="3-column">1 dòng 3 sản phẩm</option>
        </select>

        <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
          Thêm sản phẩm
        </button>
      </div>

      <div className="space-y-4">
        {products.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded-md p-3 shadow-sm"
          >
            <div className="flex gap-4 items-center w-full">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">
                  {item.price} – {item.category}
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  className="text-xs text-blue-600 underline break-all"
                  rel="noopener noreferrer"
                >
                  {item.link}
                </a>
                <div className="text-xs text-gray-400 mt-1">
                  Hiển thị: {item.layout === '2-column' ? '2 sản phẩm/dòng' : '3 sản phẩm/dòng'}
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
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
                checked={item.active ?? false}
                onChange={() => {
                  const updated = [...products];
                  updated[index].active = !updated[index].active;
                  setProducts(updated);
                }}
                className={clsx(
                  'relative inline-flex h-4 w-8 items-center rounded-full transition',
                  item.active ? 'bg-indigo-600' : 'bg-gray-300'
                )}
              >
                <span
                  className={clsx(
                    'inline-block h-3 w-3 transform rounded-full bg-white transition',
                    item.active ? 'translate-x-5' : 'translate-x-1'
                  )}
                />
              </Switch>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
