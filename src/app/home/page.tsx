'use client';

import HomeHeader from './components/home-header';
export default function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-neutral-900">
      <div className="flex-1 flex flex-col">
        <HomeHeader />
      </div>
    </div>
  );
}
