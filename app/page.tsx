"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Nav from "../components/Nav";
import Footer from "../components/Footer"
import { animatePageIn } from "@/utils/animations";
import { Terminal } from "lucide-react";
import TerminalMain from "@/components/TerminalMain";

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setMounted(true);

    const hasAnimatedBefore = localStorage.getItem("hasAnimated");

    if (!hasAnimatedBefore) {
      // Play the initial animation before the welcome screen
      animatePageIn();
      localStorage.setItem("hasAnimated", "true");
    }

    // Display the welcome screen for 2 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(welcomeTimer);
  }, []);

  if (!mounted) {
    return null; // Render nothing until the component is mounted
  }

  if (showWelcome) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img
            src="/tinywarp.svg"
            alt="Loading"
            className={`w-20 h-20 mx-auto animate-spin ${
              resolvedTheme === "dark" ? "invert" : ""
            }`}
          />
          <h1 className="mt-4 text-2xl font-bold">Warp Developers</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <Nav />
      <TerminalMain />
      <Footer />
    </div>
  );
};

export default Page;
