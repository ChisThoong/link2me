'use client';

const themes = [
  { name: 'Classic', image: '/images/theme-classic.png' },
  { name: 'Card', image: '/images/theme-card.png' },
  { name: 'Minimal', image: '/images/theme-minimal.png' },
];

export default function ThemePreview() {
  return (
    <div className="mt-16 max-w-4xl w-full">
      <h2 className="text-2xl font-semibold mb-4 text-secondary dark:text-indigo-300">
        Các giao diện mẫu
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.name}
            className="border rounded-lg p-4 text-center shadow-md bg-white dark:bg-gray-800 hover:scale-105 transition-transform"
          >
            <img
              src={theme.image}
              alt={theme.name}
              className="w-full h-48 object-cover rounded mb-2 border"
            />
            <p className="font-medium text-gray-800 dark:text-white">{theme.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
