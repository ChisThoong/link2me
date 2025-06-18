'use client';

import { Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SharedLinkProps {
  username: string;
}

export default function SharedLink({ username }: SharedLinkProps) {
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/${username}`;
  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    toast.success('Đã sao chép liên kết!');
  };

  return (
    <div className="flex items-center justify-between w-full max-w-lg bg-white rounded-md border shadow-sm px-1 py-1">
      {/* Text */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-indigo-700 underline truncate px-2 hover:text-indigo-900 transition"
      >
        {link}
      </a>

      {/* Share Button */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 text-xs sm:text-sm text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md transition font-semibold"
      >
        Sao chép
        <Copy size={14} strokeWidth={2} />
      </button>
    </div>
  );
}
