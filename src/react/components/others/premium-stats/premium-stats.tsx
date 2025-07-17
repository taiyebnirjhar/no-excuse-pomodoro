"use client";
import { Clock, Target, Trophy, Zap } from "lucide-react";
import { useMemo } from "react";
import type { TimerEvent } from "../../../types/timer";
import { Card, CardContent } from "../../ui";

interface PremiumStatsProps {
  events: TimerEvent[];
}

export function PremiumStats({ events }: PremiumStatsProps) {
  const today = new Date().toDateString();

  const stats = useMemo(() => {
    const completedSessions = events.filter(
      (e) => e.status === "completed"
    ).length;
    const completedPomodoros = events.filter(
      (e) => e.event === "pomodoro" && e.status === "completed"
    ).length;
    const totalMinutes = events
      .filter((e) => e.status === "completed")
      .reduce((acc, e) => acc + e.duration, 0);
    const todaysSessions = events.filter(
      (e) =>
        new Date(e.startTime).toDateString() === today &&
        e.status === "completed"
    ).length;

    return [
      {
        icon: Trophy,
        label: "Completed",
        value: completedSessions,
        color: "text-yellow-500 dark:text-yellow-400",
        bgColor: "bg-yellow-500/10 dark:bg-yellow-400/10",
      },
      {
        icon: Target,
        label: "Pomodoros",
        value: completedPomodoros,
        color: "text-green-500 dark:text-green-400",
        bgColor: "bg-green-500/10 dark:bg-green-400/10",
      },
      {
        icon: Clock,
        label: "Total Hours",
        value: `${Math.round(totalMinutes / 60)}h`,
        color: "text-blue-500 dark:text-blue-400",
        bgColor: "bg-blue-500/10 dark:bg-blue-400/10",
      },
      {
        icon: Zap,
        label: "Today",
        value: todaysSessions,
        color: "text-purple-500 dark:text-purple-400",
        bgColor: "bg-purple-500/10 dark:bg-purple-400/10",
      },
    ];
  }, [events, today]);

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="cursor-pointer glass-card glow-effect group transition-all duration-300"
        >
          <CardContent className="p-3">
            <div className="flex items-center space-x-4">
              <div
                className={`p-1.5 rounded-lg ${stat.bgColor} transition-transform duration-300`}
              >
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className="min-w-0 flex-1 ">
                <div className=" font-bold text-gray-800 dark:text-white truncate">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {stat.label}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
