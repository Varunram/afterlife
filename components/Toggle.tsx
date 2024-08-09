"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const Toggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

  if (!mounted) {
    return <Button size="icon" disabled={true}></Button>;
  }

  const light = theme === "light";
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(`${light ? "dark" : "light"}`)}
    >
      {light ? (
        <Moon className="hover:cursor-pointer hover:text-primary" />
      ) : (
        <Sun className="hover:cursor-pointer hover:text-primary" />
      )}
    </Button>
  );
};

export default Toggle;
