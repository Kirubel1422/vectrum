"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  valueClassName,
  indicatorClassName,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string;
  valueClassName?: string;
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          indicatorClassName,
          "bg-primary-500 h-full w-full flex-1 transition-all"
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />

      <span
        className={cn(valueClassName, "absolute z-50 top-0.5 left-1/2")}
        style={{ transform: `translateX(-${50 - (value || 0)}%)` }}
      >
        {value} %
      </span>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
