import type { TimerConfig, TimerType } from "../types/timer";

export const timerConfigs: Record<TimerType, TimerConfig> = {
  pomodoro: { duration: 25, label: "Pomodoro", displayTime: "25:00" },
  short: { duration: 5, label: "Short Break", displayTime: "5:00" },
  long: { duration: 10, label: "Long Break", displayTime: "10:00" },
};
