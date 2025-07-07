"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { timerConfigs } from "../lib/timer-config";
import type { TimerState, TimerType } from "../types/timer";
import { useTimerEvents } from "./use-timer-events";

export function usePomodoroTimer() {
  const [currentTimer, setCurrentTimer] = useState<TimerType | null>(
    "pomodoro"
  );
  const [timeLeft, setTimeLeft] = useState<string>("25:00");
  const [isRunning, setIsRunning] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const { events, currentEvent, startEvent, completeEvent, cancelEvent } =
    useTimerEvents();

  // Update display time when timer type changes
  useEffect(() => {
    if (currentTimer) {
      setTimeLeft(timerConfigs[currentTimer].displayTime);
      setProgress(0);
    }
  }, [currentTimer]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const playAlarmSound = useCallback(() => {
    const alarm = new Audio(
      "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav"
    );
    alarm.play().catch(console.error);
  }, []);

  const startTimer = useCallback(() => {
    if (!currentTimer) {
      setShowMessage(true);
      return;
    }

    setShowMessage(false);
    setIsRunning(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const duration = timerConfigs[currentTimer].duration * 60 * 1000;
    const endTimestamp = Date.now() + duration;
    startTimeRef.current = Date.now();

    // Start tracking the event
    startEvent(currentTimer, timerConfigs[currentTimer].duration);

    intervalRef.current = setInterval(() => {
      const timeRemaining = endTimestamp - Date.now();
      const elapsed = Date.now() - startTimeRef.current;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);

      setProgress(progressPercent);

      if (timeRemaining <= 0) {
        clearInterval(intervalRef.current!);
        setTimeLeft("00:00");
        setIsRunning(false);
        setProgress(100);
        completeEvent();
        playAlarmSound();

        // Auto-reset to initial state after completion
        setTimeout(() => {
          if (currentTimer) {
            setTimeLeft(timerConfigs[currentTimer].displayTime);
            setProgress(0);
          }
        }, 2000); // Show "00:00" for 2 seconds, then reset
      } else {
        const minutes = Math.floor(timeRemaining / 60000);
        const seconds = Math.floor((timeRemaining % 60000) / 1000);
        const formattedTime = `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`;
        setTimeLeft(formattedTime);
      }
    }, 1000);
  }, [currentTimer, startEvent, completeEvent, playAlarmSound]);

  const resetTimer = useCallback(() => {
    // Clear the interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Cancel the current event if running
    if (isRunning && currentEvent) {
      cancelEvent();
    }

    // Reset all states
    setIsRunning(false);
    setProgress(0);
    setShowMessage(false);

    // Reset display time
    if (currentTimer) {
      setTimeLeft(timerConfigs[currentTimer].displayTime);
    }
  }, [currentTimer, isRunning, currentEvent, cancelEvent]);

  const selectTimer = useCallback(
    (timerType: TimerType) => {
      // If currently running, cancel the session first
      if (isRunning) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (currentEvent) {
          cancelEvent();
        }
      }

      setIsRunning(false);
      setProgress(0);
      setCurrentTimer(timerType);
      setShowMessage(false);
    },
    [isRunning, currentEvent, cancelEvent]
  );

  const state: TimerState & { progress: number } = {
    currentTimer,
    timeLeft,
    isRunning,
    currentEvent,
    events,
    progress,
  };

  return {
    state,
    actions: {
      startTimer,
      resetTimer,
      selectTimer,
    },
    showMessage,
  };
}
