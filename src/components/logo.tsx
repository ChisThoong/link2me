'use client';
import { Link2 } from 'lucide-react';
import { Inter } from 'next/font/google';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link2 size={28} className="text-white dark:text-white" /> 
      <span className="text-2xl md:text-3xl font-extrabold text-white dark:text-white font-[Inter]">
        Link2me
      </span>
    </div>
  );
}
