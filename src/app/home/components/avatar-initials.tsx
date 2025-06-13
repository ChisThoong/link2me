'use client';

import React from 'react';

const colors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-emerald-500',
];

function stringToColorIndex(str: string) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }
  return sum % colors.length;
}

interface Props {
  email?: string;
  className?: string;
}

export default function AvatarInitials({ email = '', className = '' }: Props) {
  const initial = email.charAt(0).toUpperCase();
  const color = colors[stringToColorIndex(email)];

  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-semibold ${color} ${className}`}
    >
      {initial}
    </div>
  );
}
