// hooks/use-timer-engine.ts
import { useRef } from "react";
import { timerConfigs } from "../../config/timer-config";
import {
  formatTime,
  getNextTimer,
  playAlarmSound,
  showNotification,
} from "../../lib/timer-utils";
import type { TimerType } from "../../types/timer";

export function useTimerEngine({
  currentTimer,
  setTimeLeft,
  setIsRunning,
  setProgress,
  completeEvent,
  startEvent,
  setCurrentTimer,
  startTimerCallback,
}: {
  currentTimer: TimerType;
  setTimeLeft: (val: string) => void;
  setIsRunning: (val: boolean) => void;
  setProgress: (val: number) => void;
  completeEvent: () => void;
  startEvent: (type: TimerType, duration: number) => void;
  setCurrentTimer: (val: TimerType) => void;
  startTimerCallback: () => void;
}) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const loopStartRef = useRef<number | null>(null);
  const pomodoroCountRef = useRef<number>(0);
  const currentTimerRef = useRef(currentTimer);
  currentTimerRef.current = currentTimer;

  console.log(currentTimerRef.current);

  const start = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const durationMs =
      timerConfigs[currentTimerRef.current].duration * 60 * 1000;
    const endTimestamp = Date.now() + durationMs;
    startTimeRef.current = Date.now();

    if (currentTimerRef.current === "pomodoro" && !loopStartRef.current) {
      loopStartRef.current = Date.now();
    }

    startEvent(
      currentTimerRef.current,
      timerConfigs[currentTimerRef.current].duration
    );
    setIsRunning(true);

    if (Notification.permission === "granted") {
      showNotification(
        "Timer Started",
        `${timerConfigs[currentTimerRef.current].label} started`
      );
    }

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const remaining = endTimestamp - now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min((elapsed / durationMs) * 100, 100);
      setProgress(progress);

      if (remaining <= 0) {
        clearInterval(intervalRef.current!);
        setIsRunning(false);
        setTimeLeft("00:00");
        setProgress(100);
        completeEvent();
        playAlarmSound(currentTimerRef.current);

        showNotification(
          "Timer Finished",
          `${timerConfigs[currentTimerRef.current].label} completed`
        );

        if (currentTimerRef.current === "pomodoro") {
          pomodoroCountRef.current += 1;
        }

        const next = getNextTimer(
          currentTimerRef.current,
          loopStartRef.current,
          pomodoroCountRef.current
        );
        if (next) {
          setTimeout(() => {
            currentTimerRef.current = next;
            setCurrentTimer(next);
            setTimeLeft(timerConfigs[next].displayTime);
            setProgress(0);
            startTimerCallback(); // Re-invoke from outside
          }, 2000);
        } else {
          loopStartRef.current = null;
          pomodoroCountRef.current = 0;
        }
      } else {
        setTimeLeft(formatTime(remaining));
      }
    }, 1000);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    loopStartRef.current = null;
    pomodoroCountRef.current = 0;
    currentTimerRef.current = currentTimer;
  };

  return { start, reset };
}
