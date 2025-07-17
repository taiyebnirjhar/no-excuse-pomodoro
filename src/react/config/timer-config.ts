import type { TimerConfig, TimerType } from "../types/timer";

// export const timerConfigs: Record<TimerType, TimerConfig> = {
//   pomodoro: { duration: 25, label: "Pomodoro", displayTime: "25:00" },
//   short: { duration: 5, label: "Short Break", displayTime: "5:00" },
//   long: { duration: 10, label: "Long Break", displayTime: "10:00" },
// };

export const timerConfigs: Record<TimerType, TimerConfig> = {
  pomodoro: { duration: 0.1, label: "Pomodoro", displayTime: "00:06" }, // 6 seconds
  short: { duration: 0.05, label: "Short Break", displayTime: "00:03" }, // 3 seconds
  long: { duration: 0.15, label: "Long Break", displayTime: "00:09" }, // 9 seconds
};
