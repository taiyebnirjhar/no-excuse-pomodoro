/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { CheckCircle, Clock, PlayCircle, RotateCcw } from "lucide-react";
import { timerConfigs } from "../../../config/timer-config";
import type { TimerEvent } from "../../../types/timer";
import { LoadingSkeleton } from "../../shared/skeleton/loading-skeleton";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "../../ui";

interface EventHistoryProps {
  events: TimerEvent[];
  currentEvent: TimerEvent | null;
}

export function EventHistory({ events, currentEvent }: EventHistoryProps) {
  const recentEvents = events.slice(-5).reverse(); // Show fewer events

  console.log(events);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: TimerEvent["status"]) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle className="w-3 h-3 text-green-500 dark:text-green-400" />
        );
      case "ongoing":
        return (
          <PlayCircle className="w-3 h-3 text-blue-500 dark:text-blue-400" />
        );
      case "cancelled":
        return (
          <RotateCcw className="w-3 h-3 text-orange-500 dark:text-orange-400" />
        );
      default:
        return <Clock className="w-3 h-3 text-gray-500 dark:text-gray-400" />;
    }
  };

  const getStatusColor = (status: TimerEvent["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 border-green-500/50 text-green-600 dark:text-green-300";
      case "ongoing":
        return "bg-blue-500/20 border-blue-500/50 text-blue-600 dark:text-blue-300";
      case "cancelled":
        return "bg-orange-500/20 border-orange-500/50 text-orange-600 dark:text-orange-300";
      default:
        return "bg-gray-500/20 border-gray-500/50 text-gray-600 dark:text-gray-300";
    }
  };

  const getStatusText = (status: TimerEvent["status"]) => {
    switch (status) {
      case "completed":
        return "Done";
      case "ongoing":
        return "Active";
      case "cancelled":
        return "Cancel";
      default:
        return status;
    }
  };

  if (events.length === 0 && !currentEvent) {
    return (
      <Card className="glass-card glow-effect h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gray-800 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 w-full h-[90%] flex justify-center items-center">
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium mb-1">No sessions yet</p>
            <p className="text-xs">Start your first session</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card glow-effect h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800 dark:text-white flex items-center gap-2">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentEvent && (
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
            <div className="flex  items-center justify-between">
              <div className="w-full flex items-center gap-2 justify-between">
                <div className="font-medium text-gray-800 dark:text-white text-sm">
                  {timerConfigs[currentEvent.event].label}
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    {formatTime(currentEvent.startTime)}
                  </div>
                </div>
                <Badge className="bg-blue-500/30 border-blue-400/50 text-blue-600 dark:text-blue-300 px-2 py-0.5 text-xs">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 max-h-full overflow-y-auto custom-scrollbar">
          {recentEvents.length > 0 ? (
            recentEvents.map((event, index) => (
              <div
                key={event.id}
                className="group p-2 rounded-lg bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 border border-gray-200/30 dark:border-white/10 hover:border-gray-200/50 dark:hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(event.status)}
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-800 dark:text-white text-xs truncate">
                        {timerConfigs[event.event].label}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(event.startTime)}
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={`${getStatusColor(
                      event.status
                    )} text-xs px-1.5 py-0.5 backdrop-blur-sm`}
                  >
                    {getStatusText(event.status)}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-1">
              {[...Array(2)].map((_, i) => (
                <LoadingSkeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
