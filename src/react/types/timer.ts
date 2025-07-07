export type TimerType = "pomodoro" | "short" | "long";

export interface TimerConfig {
  duration: number; // in minutes
  label: string;
  displayTime: string;
}

export interface TimerEvent {
  id: string;
  event: TimerType;
  startTime: number;
  endTime?: number;
  status: "ongoing" | "completed" | "cancelled";
  duration: number; // in minutes
}

export interface TimerState {
  currentTimer: TimerType | null;
  timeLeft: string;
  isRunning: boolean;
  currentEvent: TimerEvent | null;
  events: TimerEvent[];
}
