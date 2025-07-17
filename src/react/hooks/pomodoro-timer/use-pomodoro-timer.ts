/* eslint-disable @typescript-eslint/no-unused-vars */
// hooks/use-pomodoro-timer.ts
"use client";

import { useCallback, useState } from "react";
import { timerConfigs } from "../../config/timer-config";
import type { TimerState, TimerType } from "../../types/timer";
import { useTimerEngine } from "../engine/use-timer-engine";
import { useTimerEvents } from "../timer-events/use-timer-events";

export function usePomodoroTimer() {
  const [currentTimer, setCurrentTimer] = useState<TimerType>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(
    timerConfigs["pomodoro"].displayTime
  );
  const [isRunning, setIsRunning] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [progress, setProgress] = useState(0);

  const { events, currentEvent, startEvent, completeEvent, cancelEvent } =
    useTimerEvents();

  const engine = useTimerEngine({
    currentTimer,
    setTimeLeft,
    setIsRunning,
    setProgress,
    completeEvent,
    startEvent,
    setCurrentTimer,
    startTimerCallback: () => startTimer(true),
  });

  const startTimer = useCallback(
    (_isAuto = false) => {
      if (!currentTimer) {
        setShowMessage(true);
        return;
      }

      setShowMessage(false);
      engine.start();
    },
    [currentTimer, engine]
  );

  const resetTimer = useCallback(() => {
    engine.reset();
    if (isRunning && currentEvent) cancelEvent();
    setIsRunning(false);
    setProgress(0);
    setShowMessage(false);
    if (currentTimer) {
      setTimeLeft(timerConfigs[currentTimer].displayTime);
    }
  }, [engine, currentTimer, isRunning, currentEvent, cancelEvent]);

  const selectTimer = useCallback(
    (timerType: TimerType) => {
      engine.reset();
      if (isRunning && currentEvent) cancelEvent();
      setIsRunning(false);
      setProgress(0);
      setCurrentTimer(timerType);
      setShowMessage(false);
      setTimeLeft(timerConfigs[timerType].displayTime);
    },
    [engine, isRunning, currentEvent, cancelEvent]
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
