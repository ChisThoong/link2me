'use client';

import { useState } from 'react';
import { Menu, MenuItem } from '@/components/ui/dropdown';
import AvatarInitials from './avatar-initials';
import {
  LogOut,
  Star,
  HelpCircle,
  Crown,
  Mail,
} from 'lucide-react'; 

interface Props {
  email?: string;
  name?: string;
  isPro?: boolean;
  expiredAt?: string; 
  onLogout: () => void;
  onUpgrade?: () => void;
  onSupport?: () => void;
}

export default function UserDropdown({
  email = '',
  name = '',
  isPro = false,
  expiredAt,
  onLogout,
  onUpgrade,
  onSupport,
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="relative">
      <button onClick={() => setOpenMenu(!openMenu)}>
        <AvatarInitials email={email} className="w-10 h-10" />
      </button>

      {openMenu && (
        <Menu className="absolute right-0 mt-2 w-64 bg-white border shadow-md rounded-xl overflow-hidden text-sm z-50">
          <div className="px-4 py-3 border-b bg-gray-50">
            <div className="font-semibold text-gray-800">{name}</div>
            <div className="text-xs text-gray-500">{email}</div>
          </div>

          {isPro ? (
            <div className="px-4 py-2 text-xs text-green-600 flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Tài khoản Pro
              <span className="ml-auto text-gray-500">({formatDate(expiredAt)})</span>
            </div>
          ) : (
            <MenuItem onClick={onUpgrade} className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Nâng cấp Pro
            </MenuItem>
          )}

          <MenuItem onClick={onSupport} className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            Hỗ trợ
          </MenuItem>

          <MenuItem onClick={onLogout} className="flex items-center gap-2 text-red-500">
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}
