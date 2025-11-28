import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const gapClasses = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

const gridColsClasses = {
  1: "grid-cols-1",
  2: "md:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

export function ResponsiveGrid({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "md",
  className,
}: ResponsiveGridProps) {
  const mobileCols = cols.mobile ?? 1;
  const tabletCols = cols.tablet ?? 2;
  const desktopCols = cols.desktop ?? 3;

  const gridClasses = [
    "grid",
    "grid-cols-1", // Always start with 1 column on mobile
  ];

  if (tabletCols >= 2) {
    gridClasses.push("md:grid-cols-2");
  }
  if (tabletCols >= 3) {
    gridClasses.push("md:grid-cols-3");
  }
  if (tabletCols >= 4) {
    gridClasses.push("md:grid-cols-4");
  }

  if (desktopCols >= 3) {
    gridClasses.push("lg:grid-cols-3");
  }
  if (desktopCols >= 4) {
    gridClasses.push("lg:grid-cols-4");
  }
  if (desktopCols >= 5) {
    gridClasses.push("lg:grid-cols-5");
  }
  if (desktopCols >= 6) {
    gridClasses.push("lg:grid-cols-6");
  }

  return (
    <div className={cn(gridClasses, gapClasses[gap], className)}>
      {children}
    </div>
  );
}

