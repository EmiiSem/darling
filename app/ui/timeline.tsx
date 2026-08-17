"use client";

import { useEffect, useRef, useState } from "react";

type TimelineItem = {
  year: string;
  title: string;
  text: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const container = ref.current;
    const nodes = container?.querySelectorAll<HTMLElement>("[data-year-row]") ?? [];

    if (!container || !nodes.length) {
      return;
    }

    const updateProgress = () => {
      const top = container.getBoundingClientRect().top + window.scrollY;
      const height = Math.max(container.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max((window.scrollY - top + window.innerHeight * 0.55) / height, 0), 1);
      const viewportBottom = window.scrollY + window.innerHeight;
      const reachedEnd = viewportBottom >= top + container.offsetHeight - 64 || progress >= 0.9;

      setLineProgress(progress);

      if (reachedEnd) {
        setActiveIndex(nodes.length - 1);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const farthest = Math.max(
            ...visibleEntries.map((entry) => Number(entry.target.getAttribute("data-index") ?? 0)),
          );
          setActiveIndex((current) => Math.max(current, farthest));
        }
      },
      { rootMargin: "-12% 0px -22% 0px", threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div ref={ref} className="site-shell timeline-stage">
      <span className="timeline-stage-line" aria-hidden="true" />
      <span
        className="timeline-stage-fill"
        aria-hidden="true"
        style={{ ["--line-progress" as string]: String(lineProgress) }}
      />
      {items.map((item, index) => {
        return (
          <article
            className={`timeline-row timeline-entry ${activeIndex >= index ? "is-visible" : ""}`}
            data-year-row="true"
            data-index={index}
            key={item.year}
          >
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-spacer" aria-hidden="true">
              <span className="timeline-dot" />
            </div>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
