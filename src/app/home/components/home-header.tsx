'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import AvatarInitials from './avatar-initials';
import { Menu, MenuItem } from '@/components/ui/dropdown';
import UserDropdown from './user-dropdown';
import HomeNavTabs from './home-nav-tabs';
import SharedLink from './shareable-link';
import Logo from '@/components/logo';
import { Link as LinkIcon } from 'lucide-react';

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
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md gap-4 flex-wrap">
    {/* Logo */}
    <div className="flex items-center gap-2 shrink-0">
      <LinkIcon size={32} className="text-indigo-600" />
      <span className="text-2xl md:text-3xl font-extrabold text-indigo-600 font-[Inter]">
        Link2me
      </span>
    </div>
  
    {/* Tabs */}
    <div className="flex-1 justify-center hidden md:flex">
      <HomeNavTabs />
    </div>
  
    {/* Shared Link + Avatar */}
    <div className="flex items-center gap-4 shrink-0">
      <SharedLink username={userData?.username || 'yourname'} />
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
