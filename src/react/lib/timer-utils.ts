import type { TimerType } from "../types/timer";

export function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function playAlarmSound() {
  const alarm = new Audio(
    "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav"
  );
  alarm.play().catch(console.error);
}

export function showNotification(title: string, body: string) {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

export function getNextTimer(
  currentTimer: TimerType,
  loopStart: number | null,
  pomodoroCount: number
): TimerType | null {
  const now = Date.now();
  const loopDuration = now - (loopStart ?? now);
  const loopFinished = loopDuration >= 2 * 60 * 60 * 1000; // 2 hours

  if (loopFinished) return "long";

  if (currentTimer === "pomodoro") {
    // After every 4 pomodoros, take a long break
    return pomodoroCount > 0 && pomodoroCount % 4 === 0 ? "long" : "short";
  }

  return "pomodoro";
}
