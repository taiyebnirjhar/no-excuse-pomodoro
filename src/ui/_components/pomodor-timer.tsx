"use client";

import { useEffect, useRef, useState } from "react";

type TimerType = "pomodoro" | "short" | "long" | null;

interface TimerConfig {
  duration: number; // in minutes
  label: string;
  displayTime: string;
}

const timerConfigs: Record<Exclude<TimerType, null>, TimerConfig> = {
  pomodoro: { duration: 25, label: "Pomodoro", displayTime: "25:00" },
  short: { duration: 5, label: "Short Break", displayTime: "5:00" },
  long: { duration: 10, label: "Long Break", displayTime: "10:00" },
};

export default function PomodoroTimer() {
  const [currentTimer, setCurrentTimer] = useState<TimerType>("pomodoro");
  const [timeLeft, setTimeLeft] = useState<string>("25:00");
  const [isRunning, setIsRunning] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentTimer) {
      setTimeLeft(timerConfigs[currentTimer].displayTime);
    }
  }, [currentTimer]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
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

    intervalRef.current = setInterval(() => {
      const timeRemaining = endTimestamp - Date.now();

      if (timeRemaining <= 0) {
        clearInterval(intervalRef.current!);
        setTimeLeft("00:00");
        setIsRunning(false);

        // Play alarm sound
        const alarm = new Audio(
          "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav"
        );
        alarm.play().catch(console.error);
      } else {
        const minutes = Math.floor(timeRemaining / 60000);
        const seconds = Math.floor((timeRemaining % 60000) / 1000);
        const formattedTime = `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`;
        setTimeLeft(formattedTime);
      }
    }, 1000);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    if (currentTimer) {
      setTimeLeft(timerConfigs[currentTimer].displayTime);
    }
  };

  const selectTimer = (timerType: Exclude<TimerType, null>) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setCurrentTimer(timerType);
    setShowMessage(false);
  };

  return (
    <div className="h-full w-full ">
      {/* Timer Message */}
      {showMessage && (
        <div className="text-white bg-red-500 p-2 text-center rounded-2xl !mx-4 !mb-4">
          Please select a timer before starting.
        </div>
      )}

      <div className="h-full w-full py-2.5 flex justify-center items-center ">
        <div className="flex flex-col justify-center items-center !gap-6 !p-2.5 w-full max-w-[600px] box-border !space-y-4">
          <h1 className="text-3xl !my-5 flex !gap-5">
            <span>⏰</span>
            <span>Pomodoro Timer </span>
          </h1>

          {/* Timer Type Buttons */}
          <div className="mt-5 flex justify-center gap-4">
            <button
              className={`!px-5 !py-2.5 mx-1 rounded border-none cursor-pointer transition-all duration-200 ease-in ${
                currentTimer === "pomodoro"
                  ? "bg-[#020323] text-white"
                  : "bg-[#2e325a] text-white hover:bg-[#020323]"
              }`}
              onClick={() => selectTimer("pomodoro")}
            >
              Pomodoro
            </button>
            <button
              className={`!px-5 !py-2.5 mx-1 rounded border-none cursor-pointer transition-all duration-200 ease-in ${
                currentTimer === "short"
                  ? "bg-[#020323] text-white"
                  : "bg-[#2e325a] text-white hover:bg-[#020323]"
              }`}
              onClick={() => selectTimer("short")}
            >
              Short Break
            </button>
            <button
              className={`!px-5 !py-2.5 mx-1 rounded border-none cursor-pointer transition-all duration-200 ease-in ${
                currentTimer === "long"
                  ? "bg-[#020323] text-white"
                  : "bg-[#2e325a] text-white hover:bg-[#020323]"
              }`}
              onClick={() => selectTimer("long")}
            >
              Long Break
            </button>
          </div>

          {/* Timer Display */}
          <main className="w-96 h-96 rounded-full text-center mx-auto my-10 relative">
            <div className="flex flex-col justify-center items-center w-full h-full relative my-10 text-center rounded-full bg-[#151932] shadow-[20px_20px_42px_#0e1021,-20px_-20px_42px_#1c2244] before:content-[''] before:absolute before:border-[10px] before:border-blue-600 before:rounded-full before:w-[22rem] before:h-[22rem]">
              <h1 className="text-8xl font-bold my-5 z-10">{timeLeft}</h1>
            </div>
          </main>

          {/* Control Buttons */}
          <div className="mt-5">
            <button
              className="bg-[#2e325a] text-white border-none rounded !px-5 !py-2.5 !mx-2.5 cursor-pointer transition-all duration-200 ease-in hover:bg-[#219a52] uppercase"
              onClick={startTimer}
              disabled={isRunning}
            >
              START
            </button>
            <button
              className="bg-[#2e325a] text-white border-none rounded !px-5 !py-2.5 !mx-2.5 cursor-pointer transition-all duration-200 ease-in hover:bg-red-500 uppercase"
              onClick={resetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
