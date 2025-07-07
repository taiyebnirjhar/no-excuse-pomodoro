"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../contexts/theme-context";
import { Button } from "../../ui";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="
          group relative overflow-hidden backdrop-blur-xl border-2 bg-transparent
          transition-all duration-300 shadow-md hover:shadow-lg
          w-8 h-8 rounded-xl border-none cursor-pointer
        "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center justify-center">
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
          ) : (
            <Moon className="w-4 h-4 text-blue-600 transition-transform duration-500" />
          )}
        </div>
      </Button>
    </div>
  );
}
