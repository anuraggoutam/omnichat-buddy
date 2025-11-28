import { ReactNode } from "react";
import { useIsMobile, useBreakpoint } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ResponsiveWrapperProps {
  children: ReactNode;
  mobile?: ReactNode;
  tablet?: ReactNode;
  desktop?: ReactNode;
  className?: string;
}

export function ResponsiveWrapper({
  children,
  mobile,
  tablet,
  desktop,
  className,
}: ResponsiveWrapperProps) {
  const breakpoint = useBreakpoint();
  const isMobile = useIsMobile();

  let content = children;
  if (breakpoint === "mobile" && mobile !== undefined) {
    content = mobile;
  } else if (breakpoint === "tablet" && tablet !== undefined) {
    content = tablet;
  } else if (breakpoint === "desktop" && desktop !== undefined) {
    content = desktop;
  }

  return <div className={cn(className)}>{content}</div>;
}

interface MobileOnlyProps {
  children: ReactNode;
  className?: string;
}

export function MobileOnly({ children, className }: MobileOnlyProps) {
  const isMobile = useIsMobile();
  if (!isMobile) return null;
  return <div className={className}>{children}</div>;
}

interface DesktopOnlyProps {
  children: ReactNode;
  className?: string;
}

export function DesktopOnly({ children, className }: DesktopOnlyProps) {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return <div className={className}>{children}</div>;
}

interface TabletOnlyProps {
  children: ReactNode;
  className?: string;
}

export function TabletOnly({ children, className }: TabletOnlyProps) {
  const breakpoint = useBreakpoint();
  if (breakpoint !== "tablet") return null;
  return <div className={className}>{children}</div>;
}

