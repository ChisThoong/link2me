'use client';

import { Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SharedLinkProps {
  username: string;
}

export default function SharedLink({ username }: SharedLinkProps) {
  const link = `heylink.me/${username}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    toast.success('Đã sao chép liên kết!');
  };

  return (
    <div className="flex items-center justify-between w-full max-w-lg bg-white rounded-xl border shadow-sm px-2 py-2">
      {/* Text */}
      <div className="text-sm font-medium text-gray-800 truncate px-2">
        {link}
      </div>

      {/* Share Button */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 text-xs sm:text-sm text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md transition font-semibold"
      >
        Share Page
        <Copy size={14} strokeWidth={2} />
      </button>
    </div>
  );
}
