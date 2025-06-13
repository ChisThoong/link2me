'use client';

import Link from "next/link";
import Logo from "./logo";
import ThemeToggle from "./theme-toggle";
import { useTheme } from "next-themes";

export default function Header() {
  const { setTheme } = useTheme();

  return (
    <header className="bg-primary w-full flex items-center justify-between px-4 sm:px-8 py-4">
      <Logo />
      <div className="flex items-center gap-3">
      {/* <ThemeToggle />         */}
      <Link
          href="/login"
          className="text-sm bg-secondary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          Đăng nhập
        </Link>
      </div>
    </header>
  );
}
