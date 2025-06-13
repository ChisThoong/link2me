import React from 'react';
import Image from 'next/image';

type AvatarProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export const Avatar: React.FC<AvatarProps> = ({
  src = '/avatar-placeholder.png',
  alt = 'User Avatar',
  className = '',
}) => {
  return (
    <div className={`rounded-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className="object-cover w-full h-full"
      />
    </div>
  );
};
