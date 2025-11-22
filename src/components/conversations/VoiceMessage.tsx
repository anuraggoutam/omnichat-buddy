import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceMessageProps {
  duration: number;
  isCustomer?: boolean;
}

export const VoiceMessage = ({ duration, isCustomer = true }: VoiceMessageProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In real app, this would control audio playback
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-2xl max-w-[300px]",
        isCustomer
          ? "bg-muted text-foreground"
          : "bg-primary text-primary-foreground"
      )}
    >
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          "h-8 w-8 rounded-full flex-shrink-0",
          isCustomer ? "hover:bg-background/50" : "hover:bg-primary-foreground/20"
        )}
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>

      {/* Waveform visualization (simplified) */}
      <div className="flex items-center gap-0.5 flex-1">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1 rounded-full transition-all",
              isCustomer ? "bg-foreground/40" : "bg-primary-foreground/40",
              i < (currentTime / duration) * 20 && "bg-primary dark:bg-primary-foreground"
            )}
            style={{
              height: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>

      <span className="text-xs opacity-70 flex-shrink-0">
        {formatTime(isPlaying ? currentTime : duration)}
      </span>
    </div>
  );
};
