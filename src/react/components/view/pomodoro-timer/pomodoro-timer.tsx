"use client";
import { AlertTriangle } from "lucide-react";
import { usePomodoroTimer } from "../../../hooks/use-pomodoro-timer";
import { EventHistory } from "../../others/event-history/event-history";
import { PremiumStats } from "../../others/premium-stats/premium-stats";
import { TimerControls } from "../../others/timer-controls/timer-controls";
import { TimerDisplay } from "../../others/timer-display/timer-display";
import { TimerTypeSelector } from "../../others/timer-type-selector/timer-type-selector";
import BackgroundEffects from "../../shared/background-effects/background-effects";
import Footer from "../../shared/footer/footer";
import { ThemeToggle } from "../../shared/theme-toggle/theme-toggle";
import { Alert, AlertDescription, Card, CardContent } from "../../ui";

export default function PomodoroTimer() {
  const { state, actions, showMessage } = usePomodoroTimer();
  // console.log(state.currentTimer);

  return (
    <div className="h-screen w-full overflow-hidden relative  transition-all duration-500 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 ">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Background Effects */}
      <BackgroundEffects />

      <div className="relative z-10 container mx-auto w-full px-4 py-4 h-full flex flex-col space-y-10 overflow-y-auto custom-scrollbar">
        {/* Compact Header */}
        <div className="text-left ">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            No Excuse Pomodoro
          </h1>
        </div>

        {/* Compact Stats */}
        <div className="">
          <PremiumStats
            events={state.events}
            currentEvent={state.currentEvent}
          />
        </div>

        {/* Error Message */}
        {showMessage && (
          <Alert className="max-w-md mx-auto glass-card border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-500 dark:text-red-400" />
            <AlertDescription className="text-red-700 dark:text-red-300 font-medium">
              Please select a timer type before starting your focus session.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content Grid - Flex grow to fill remaining space */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1 min-h-0">
          {/* Timer Section */}
          <div className="xl:col-span-3 flex flex-col">
            <Card className="glass-card glow-effect p-4 sm:p-6 flex-1 flex flex-col">
              <CardContent className="space-y-6 flex-1 flex flex-col justify-center">
                {/* Timer Type Selector */}
                <div className="flex justify-center">
                  <TimerTypeSelector
                    currentTimer={state.currentTimer}
                    onSelectTimer={actions.selectTimer}
                    disabled={state.isRunning}
                  />
                </div>

                {/* Timer Display */}
                <div className="flex justify-center flex-1 items-center">
                  <TimerDisplay
                    timeLeft={state.timeLeft}
                    isRunning={state.isRunning}
                    currentTimer={state.currentTimer}
                    progress={state.progress}
                  />
                </div>

                {/* Controls */}
                <div className="flex justify-center">
                  <TimerControls
                    isRunning={state.isRunning}
                    onStart={actions.startTimer}
                    onReset={actions.resetTimer}
                    currentTimer={state.currentTimer}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event History Sidebar */}
          <div className="xl:col-span-1">
            <EventHistory
              events={state.events}
              currentEvent={state.currentEvent}
            />
          </div>
        </div>

        {/* Compact Footer */}
        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
}
