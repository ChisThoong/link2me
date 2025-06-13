import React, { HTMLAttributes } from 'react';

type MenuProps = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Menu: React.FC<MenuProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-md shadow-lg p-1 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

type MenuItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const MenuItem: React.FC<MenuItemProps> = ({ children, onClick, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 rounded ${className}`}
    >
      {children}
    </div>
  );
};
