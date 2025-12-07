import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 50000, suffix: "+", label: "Active Users", prefix: "" },
  { value: 100, suffix: "M+", label: "Messages Processed", prefix: "" },
  { value: 99.9, suffix: "%", label: "Uptime Guarantee", prefix: "" },
  { value: 4.9, suffix: "/5", label: "Customer Rating", prefix: "" },
];

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(end * easeOutQuart);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, start]);

  return count;
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <StatItem 
              key={i} 
              {...stat} 
              isVisible={isVisible}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ 
  value, 
  suffix, 
  prefix, 
  label, 
  isVisible,
  delay 
}: { 
  value: number; 
  suffix: string;
  prefix: string;
  label: string;
  isVisible: boolean;
  delay: number;
}) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const count = useCountUp(value, 2000, shouldAnimate);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  const displayValue = Number.isInteger(value) 
    ? Math.round(count).toLocaleString()
    : count.toFixed(1);

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <div className="text-sm sm:text-base text-primary-foreground/70">
        {label}
      </div>
    </div>
  );
}
