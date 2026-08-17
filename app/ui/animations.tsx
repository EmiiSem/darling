"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

const FIREWORK_COLORS = [
  "#ff4d6d",
  "#ff6f91",
  "#ff89a9",
  "#ffb4d0",
  "#e11d48",
  "#fb7185",
  "#f472b6",
  "#c084fc",
  "#a78bfa",
  "#f59e0b",
  "#fb923c",
  "#f43f5e",
];

const FIREWORK_BURSTS = [
  { left: "50%", top: "42%", delay: 0 },
  { left: "24%", top: "34%", delay: 0.28 },
  { left: "76%", top: "32%", delay: 0.46 },
  { left: "38%", top: "58%", delay: 0.78 },
  { left: "64%", top: "54%", delay: 0.98 },
  { left: "50%", top: "24%", delay: 1.28 },
  { left: "18%", top: "52%", delay: 1.62 },
  { left: "82%", top: "48%", delay: 1.82 },
  { left: "46%", top: "38%", delay: 2.2 },
  { left: "58%", top: "62%", delay: 2.42 },
];

type HeartFireworksProps = {
  active: boolean;
};

export function HeartFireworks({ active }: HeartFireworksProps) {
  const particles = useMemo(() => {
    if (!active) {
      return [];
    }

    return FIREWORK_BURSTS.flatMap((burst, burstIndex) => {
      const heartCount = 14;

      return Array.from({ length: heartCount }, (_, index) => {
        const angle = (Math.PI * 2 * index) / heartCount + burstIndex * 0.18;
        const distance = 16 + (index % 5) * 6 + (burstIndex % 3) * 2;

        return {
          id: `${burstIndex}-${index}`,
          left: burst.left,
          top: burst.top,
          color: FIREWORK_COLORS[(burstIndex * 3 + index) % FIREWORK_COLORS.length],
          tx: `${Math.cos(angle) * distance}vmin`,
          ty: `${Math.sin(angle) * distance}vmin`,
          size: 9 + (index % 5) * 3,
          delay: burst.delay + index * 0.018,
          duration: 1.35 + (index % 4) * 0.18,
        };
      });
    });
  }, [active]);

  const flashes = useMemo(() => {
    if (!active) {
      return [];
    }

    return FIREWORK_BURSTS.map((burst, index) => ({
      id: `flash-${index}`,
      left: burst.left,
      top: burst.top,
      delay: burst.delay,
    }));
  }, [active]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!active || !mounted) {
    return null;
  }

  return createPortal(
    <div className="heart-fireworks" aria-hidden="true">
      {flashes.map((flash) => (
        <span
          className="firework-flash"
          key={flash.id}
          style={{
            left: flash.left,
            top: flash.top,
            ["--delay" as string]: `${flash.delay}s`,
          }}
        />
      ))}
      {particles.map((heart) => (
        <span
          className="firework-heart"
          key={heart.id}
          style={{
            left: heart.left,
            top: heart.top,
            background: heart.color,
            color: heart.color,
            width: heart.size,
            height: heart.size,
            ["--tx" as string]: heart.tx,
            ["--ty" as string]: heart.ty,
            ["--delay" as string]: `${heart.delay}s`,
            ["--duration" as string]: `${heart.duration}s`,
          }}
        />
      ))}
    </div>,
    document.body,
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
