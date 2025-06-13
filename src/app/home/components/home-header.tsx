'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import AvatarInitials from './avatar-initials';
import { Menu, MenuItem } from '@/components/ui/dropdown';
import UserDropdown from './user-dropdown';

interface UserData {
  username: string;
  email: string;
  isPro: boolean;
  expiredAt?: string;
}

export default function HomeHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me');
        const data = await res.json();
        setUserData(data.user);
      } catch (err) {
        console.error('Lỗi khi lấy user:', err);
      }
    };

    if (session?.user?.id) {
      fetchUser();
    }
  }, [session]);

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="text-xl font-bold">LOGO</div>

      <div className="flex items-center gap-4">
        <div className="bg-gray-100 px-4 py-2 rounded-md text-sm text-gray-700">
          heylink.me/<span className="font-medium">{userData?.username || '...'}</span>
        </div>

        <UserDropdown
          email={session?.user?.email || ''}
          name={session?.user?.username || ''}
          isPro={userData?.isPro}
          expiredAt={userData?.expiredAt}
          onLogout={handleLogout}
          onUpgrade={() => alert("Nâng cấp Pro")}
          onSupport={() => alert("Hỗ trợ")}
        />
      </div>
    </div>
  );
}
