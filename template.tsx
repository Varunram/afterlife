"use client";

import { animatePageIn } from "@/utils/animations";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function Template({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme(); // Get the resolved theme

  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      <div
        id="banner-1"
        className={`min-h-screen z-10 fixed top-0 left-0 w-1/4 transition-colors duration-300 ${
          resolvedTheme === "dark" ? "bg-white" : "bg-neutral-950"
        }`}
      />
      <div
        id="banner-2"
        className={`min-h-screen z-10 fixed top-0 left-1/4 w-1/4 transition-colors duration-300 ${
          resolvedTheme === "dark" ? "bg-white" : "bg-neutral-950"
        }`}
      />
      <div
        id="banner-3"
        className={`min-h-screen z-10 fixed top-0 left-2/4 w-1/4 transition-colors duration-300 ${
          resolvedTheme === "dark" ? "bg-white" : "bg-neutral-950"
        }`}
      />
      <div
        id="banner-4"
        className={`min-h-screen z-10 fixed top-0 left-3/4 w-1/4 transition-colors duration-300 ${
          resolvedTheme === "dark" ? "bg-white" : "bg-neutral-950"
        }`}
      />
      {children}
    </div>
  );
}
