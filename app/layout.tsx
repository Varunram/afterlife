"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { animatePageIn } from "@/utils/animations";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { resolvedTheme } = useTheme();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      animatePageIn();
      setHasLoaded(true);
    }
  }, [hasLoaded]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/tinywarp.svg" />
        <title>Warp</title>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div>
            <div
              id="banner-1"
              className="min-h-screen z-10 fixed top-0 left-0 w-1/4 transition-colors duration-300 bg-banner"
            />
            <div
              id="banner-2"
              className="min-h-screen z-10 fixed top-0 left-1/4 w-1/4 transition-colors duration-300 bg-banner"
            />
            <div
              id="banner-3"
              className="min-h-screen z-10 fixed top-0 left-2/4 w-1/4 transition-colors duration-300 bg-banner"
            />
            <div
              id="banner-4"
              className="min-h-screen z-10 fixed top-0 left-3/4 w-1/4 transition-colors duration-300 bg-banner"
            />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
