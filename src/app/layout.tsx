// src/app/layout.tsx

import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Poppins } from 'next/font/google';
import { Metadata } from "next";

import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Minishop",
  description: "Tạo link bio bán hàng mini",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable}`}>
        <Providers> 
          {children}
        </Providers>
      </body>
    </html>
  );
}
