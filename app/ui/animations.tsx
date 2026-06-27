"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function Reveal({ children, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} reveal ${visible ? "is-visible" : ""}`}>
      {children}
    </div>
  );
}

type HeartFloatProps = {
  count?: number;
};

export function HeartFloat({ count = 12 }: HeartFloatProps) {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => {
        const size = 14 + (index % 4) * 6;
        const left = (index * 11 + (index % 3) * 5) % 100;
        const duration = 11 + (index % 5) * 2.1;
        const delay = -((index * 0.9) % 12);

        return (
          <span
            className="heart"
            key={index}
            style={{
              ["--size" as string]: `${size}px`,
              ["--left" as string]: `${left}%`,
              ["--duration" as string]: `${duration}s`,
              ["--delay" as string]: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
