'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import ThemeToggle from "@/components/theme-toggle";
import Logo from "@/components/logo";
import FeatureSection from "@/components/feature-section";
import ThemePreview from "@/components/theme-preview";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import PricingSection from "@/components/pricing";

export default function HomePage() {
  const { setTheme } = useTheme();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-100 dark:from-[#0e0f1d] dark:via-[#191a2d] dark:to-[#0a0a0f] text-foreground">
      <Header />
      <Hero />
      <FeatureSection/>
      <PricingSection/>
      <Footer/>
    </main>
  );
}
