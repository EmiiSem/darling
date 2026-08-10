"use client";

import { useEffect, useRef, useState } from "react";

type SliderImage = {
  src: string;
  alt: string;
};

type ImageSliderProps = {
  images: SliderImage[];
};

export function ImageSlider({ images }: ImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragging = useRef(false);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [images.length]);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    dragStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current || dragStartX.current === null) {
      return;
    }

    const delta = event.clientX - dragStartX.current;
    setDragOffset(delta);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current || dragStartX.current === null) {
      return;
    }

    const delta = event.clientX - dragStartX.current;
    const threshold = 60;

    if (delta > threshold) {
      setIndex((current) => (current - 1 + images.length) % images.length);
    } else if (delta < -threshold) {
      setIndex((current) => (current + 1) % images.length);
    }

    dragging.current = false;
    dragStartX.current = null;
    setDragOffset(0);
  }

  function handlePointerCancel() {
    dragging.current = false;
    dragStartX.current = null;
    setDragOffset(0);
  }

  return (
    <div
      className="slider"
      aria-label="Слайдер воспоминаний"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{ touchAction: "pan-y" }}
    >
      <div
        className="slider-track"
        style={{ transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))` }}
      >
        {images.map((image) => (
          <div className="slide" key={image.src}>
            <div
              className="slide-frame"
              role="img"
              aria-label={image.alt}
              style={{ backgroundImage: `url(${image.src})` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
