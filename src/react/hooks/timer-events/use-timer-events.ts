"use client";

import { useCallback, useRef, useState } from "react";
import type { TimerEvent, TimerType } from "../../types/timer";

export function useTimerEvents() {
  const [events, setEvents] = useState<TimerEvent[]>([]);
  const [currentEvent, setCurrentEvent] = useState<TimerEvent | null>(null);

  const currentEventRef = useRef<TimerEvent | null>(null);

  const startEvent = useCallback((timerType: TimerType, duration: number) => {
    const event: TimerEvent = {
      id: Date.now().toString(),
      event: timerType,
      startTime: Date.now(),
      status: "ongoing",
      duration,
    };

    setCurrentEvent(event);
    currentEventRef.current = event;
    setEvents((prev) => [...prev, event]);
    return event;
  }, []);

  const completeEvent = useCallback(() => {
    const event = currentEventRef.current;
    if (event) {
      const completedEvent = {
        ...event,
        endTime: Date.now(),
        status: "completed" as const,
      };

      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? completedEvent : e))
      );
      setCurrentEvent(null);
      currentEventRef.current = null;
    }
  }, []);

  const cancelEvent = useCallback(() => {
    const event = currentEventRef.current;
    if (event) {
      const cancelledEvent = {
        ...event,
        endTime: Date.now(),
        status: "cancelled" as const,
      };

      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? cancelledEvent : e))
      );
      setCurrentEvent(null);
      currentEventRef.current = null;
    }
  }, []);

  // const completeEvent = useCallback(() => {
  //   if (currentEvent) {
  //     const completedEvent = {
  //       ...currentEvent,
  //       endTime: Date.now(),
  //       status: "completed" as const,
  //     };

  //     setEvents((prev) =>
  //       prev.map((event) =>
  //         event.id === currentEvent.id ? completedEvent : event
  //       )
  //     );
  //     setCurrentEvent(null);
  //   }
  // }, [currentEvent]);

  // const cancelEvent = useCallback(() => {
  //   if (currentEvent) {
  //     const cancelledEvent = {
  //       ...currentEvent,
  //       endTime: Date.now(),
  //       status: "cancelled" as const,
  //     };

  //     setEvents((prev) =>
  //       prev.map((event) =>
  //         event.id === currentEvent.id ? cancelledEvent : event
  //       )
  //     );
  //     setCurrentEvent(null);
  //   }
  // }, [currentEvent]);

  return {
    events,
    currentEvent,
    startEvent,
    completeEvent,
    cancelEvent,
  };
}
