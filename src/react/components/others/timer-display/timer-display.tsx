"use client";
import { CheckCircle, Clock, Play } from "lucide-react";
import { Badge, Card } from "../../ui";
import { Progress } from "../../ui/progress/progress";

interface TimerDisplayProps {
  timeLeft: string;
  isRunning: boolean;
  currentTimer: string | null;
  progress?: number;
}

export function TimerDisplay({
  timeLeft,
  isRunning,
  currentTimer,
  progress = 0,
}: TimerDisplayProps) {
  const isCompleted = timeLeft === "00:00" && progress === 100;

  const getStatusInfo = () => {
    if (isCompleted) {
      return {
        icon: CheckCircle,
        text: "Session Complete!",
        color:
          "bg-green-500/20 border-green-500/50 text-green-400 dark:text-green-300",
      };
    }
    if (isRunning) {
      return {
        icon: Clock,
        text: "Focus Time",
        color:
          "bg-blue-500/20 border-blue-500/50 text-blue-400 dark:text-blue-300 pulse-glow-animation",
      };
    }
    return {
      icon: Play,
      text: "Ready to Focus",
      color:
        "bg-gray-500/20 border-gray-500/50 text-gray-600 dark:text-gray-300",
    };
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="relative flex flex-col items-center space-y-6">
      {/* Status Badge */}
      <Badge
        variant="outline"
        className={`px-3 py-1 text-xs font-medium backdrop-blur-xl border-2 transition-all duration-300 ${statusInfo.color}`}
      >
        <div className="flex items-center gap-1.5">
          <StatusIcon className="w-3 h-3" />
          {statusInfo.text}
        </div>
      </Badge>

      {/* Main Timer Circle */}
      <div className="relative">
        <Card
          className={`
          relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full
          flex items-center justify-center backdrop-blur-xl border-2 shadow-xl
          bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5
          border-white/30 dark:border-white/20
          ${isRunning ? "timer-glow float-animation" : "glow-effect"}
          ${isCompleted ? "timer-glow" : ""}
          transition-all duration-500
        `}
        >
          {/* Outer Ring Progress */}
          <div className="absolute inset-0 rounded-full">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(148,163,184,0.3)"
                className="dark:stroke-white/10"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke={
                  isCompleted ? "url(#completedGradient)" : "url(#gradient)"
                }
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${progress * 2.83} 283`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient
                  id="completedGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Inner Content */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-slate-100/80 to-slate-200/60 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 flex items-center justify-center">
            <div className="text-center space-y-1">
              <div
                className={`
                font-mono font-bold transition-all duration-300
                ${isRunning ? "animate-pulse" : ""}
                ${
                  isCompleted
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-800 dark:text-white"
                }
                text-2xl sm:text-3xl lg:text-4xl xl:text-5xl
                drop-shadow-2xl
              `}
              >
                {timeLeft}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">
                {currentTimer
                  ? currentTimer.charAt(0).toUpperCase() + currentTimer.slice(1)
                  : "Select Timer"}
              </div>
              {isCompleted && (
                <div className="text-green-600 dark:text-green-400 text-xs font-medium animate-pulse">
                  Great job! 🎉
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs space-y-1">
        <Progress
          value={progress}
          className={`h-1.5 backdrop-blur-xl transition-all duration-300 ${
            isCompleted
              ? "bg-green-200/50 dark:bg-green-900/20"
              : "bg-gray-200/50 dark:bg-white/10"
          }`}
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
