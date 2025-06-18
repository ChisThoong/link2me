'use client';

import {
  Link,
  GalleryHorizontalEnd,
  ListFilter,
  Users,
} from 'lucide-react';

const tabs = [
  { id: 'links', label: 'Liên kết', icon: Link },
  { id: 'social', label: 'Mạng xã hội', icon: Users },
  { id: 'products', label: 'Sản phẩm', icon: GalleryHorizontalEnd },
  // { id: 'menu', label: 'Thực đơn', icon: ListFilter },
];

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  variant?: 'inline' | 'bottom';
}

export default function HomeNavTabs({ activeTab, setActiveTab }: Props) {
  return (
    <>
      {/* PC & Tablet (>= md): Menu trên top */}
      <div className="hidden md:flex justify-center gap-4 py-4 bg-white">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`group flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 
                ${isActive
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              <span className="text-sm">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile (< md): Menu dưới cùng */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t shadow-md flex justify-around items-center py-2 md:hidden">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center text-xs ${
                isActive ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{label}</span>
            </button>
          );
        })}
      </div>     
    </>
  );
}
