"use client";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "../../ui";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onReset: () => void;
  currentTimer: string | null;
}

export function TimerControls({
  isRunning,
  onStart,
  onReset,
  currentTimer,
}: TimerControlsProps) {
  if (isRunning) {
    // When running, only show RESET button
    return (
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="
            group px-4 py-2 text-sm font-semibold backdrop-blur-xl
            bg-red-500/10 dark:bg-red-500/20 border-2 border-red-500/30 dark:border-red-500/40
            hover:bg-red-500/20 dark:hover:bg-red-500/30 hover:border-red-500/50 dark:hover:border-red-500/60
            text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300
            transform hover:scale-105 transition-all duration-300 min-w-[120px]
            shadow-md hover:shadow-lg
          "
        >
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            CANCEL
          </div>
        </Button>
      </div>
    );
  }

  // When not running, only show START button
  return (
    <div className="flex justify-center">
      <Button
        size="sm"
        onClick={onStart}
        disabled={!currentTimer}
        className={`
          group relative overflow-hidden px-4 py-2 text-sm font-semibold
          bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500
          border-0 shadow-md hover:shadow-lg transform hover:scale-105
          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:scale-100 min-w-[120px]
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <div className="relative flex items-center gap-2">
          <Play className="w-4 h-4" />
          START
        </div>
      </Button>
    </div>
  );
}
