import type React from "react";
import { cn } from "../../../lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function LoadingSkeleton({ className, children }: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse", className)}>
      {children || <div className="bg-white/10 rounded-lg h-4 w-full" />}
    </div>
  );
}
