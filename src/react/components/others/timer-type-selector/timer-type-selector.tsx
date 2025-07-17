"use client";
import { Brain, Coffee, Pause } from "lucide-react";
import { timerConfigs } from "../../../config/timer-config";
import type { TimerType } from "../../../types/timer";
import { Badge, Button } from "../../ui";

interface TimerTypeSelectorProps {
  currentTimer: TimerType | null;
  onSelectTimer: (timerType: TimerType) => void;
  disabled?: boolean;
}

const timerIcons = {
  pomodoro: Brain,
  short: Coffee,
  long: Pause,
};

const timerColors = {
  pomodoro:
    "from-red-500/20 to-orange-500/20 border-red-500/30 dark:from-red-500/30 dark:to-orange-500/30 dark:border-red-500/40",
  short:
    "from-green-500/20 to-emerald-500/20 border-green-500/30 dark:from-green-500/30 dark:to-emerald-500/30 dark:border-green-500/40",
  long: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 dark:from-blue-500/30 dark:to-cyan-500/30 dark:border-blue-500/40",
};

export function TimerTypeSelector({
  currentTimer,
  onSelectTimer,
  disabled = false,
}: TimerTypeSelectorProps) {
  const timerTypes: TimerType[] = ["pomodoro", "short", "long"];

  return (
    <div className="flex justify-center gap-6 w-full ">
      {timerTypes.map((timerType) => {
        const Icon = timerIcons[timerType];
        const isActive = currentTimer === timerType;
        // console.log(timerConfigs[timerType].label);

        return (
          <div
            key={timerType}
            className={`relative flex-1 group ${
              isActive ? "scale-105" : ""
            } transition-all duration-300`}
          >
            <Button
              variant="ghost"
              size="sm"
              className={`
                w-full h-auto p-3 flex flex-col items-center gap-2
                backdrop-blur-xl border-2 transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? `bg-gradient-to-br ${timerColors[timerType]} shadow-lg glow-effect`
                    : "bg-white/10 dark:bg-white/5 border-gray-300/30 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 hover:border-gray-300/50 dark:hover:border-white/20"
                }
                ${
                  disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                }
              `}
              onClick={() => onSelectTimer(timerType)}
              disabled={disabled}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive
                    ? "text-gray-700 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                } transition-colors duration-300`}
              />
              <div className="text-center">
                <div
                  className={`font-semibold text-xs ${
                    isActive
                      ? "text-gray-700 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {timerConfigs[timerType].label}
                </div>
                <div
                  className={`text-xs ${
                    isActive
                      ? "text-gray-500 dark:text-gray-200"
                      : "text-gray-500 dark:text-gray-500"
                  }`}
                >
                  {timerConfigs[timerType].duration} min
                </div>
              </div>
              {isActive && (
                <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5">
                  Active
                </Badge>
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
