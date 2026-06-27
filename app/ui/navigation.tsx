"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Главная" },
  { href: "/history", label: "История" },
  { href: "/future", label: "Будущее" },
  { href: "/game", label: "Игра" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function closeOnResize() {
      if (window.innerWidth > 960) {
        setOpen(false);
      }
    }

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <div className="mobile-nav-wrap">
      <button
        className={`burger-button ${open ? "is-open" : ""}`}
        type="button"
        aria-label="Открыть меню"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`site-nav site-nav--mobile ${open ? "is-open" : ""}`} aria-label="Основная навигация">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function FloatingHearts() {
  const hearts = [
    { left: "6%", size: 18, top: "14%", delay: "0s", duration: "13s", opacity: 0.24 },
    { left: "18%", size: 14, top: "62%", delay: "-2s", duration: "15s", opacity: 0.18 },
    { left: "34%", size: 22, top: "28%", delay: "-6s", duration: "17s", opacity: 0.2 },
    { left: "48%", size: 16, top: "78%", delay: "-1s", duration: "14s", opacity: 0.16 },
    { left: "61%", size: 20, top: "18%", delay: "-4s", duration: "16s", opacity: 0.22 },
    { left: "73%", size: 13, top: "52%", delay: "-5s", duration: "18s", opacity: 0.17 },
    { left: "86%", size: 24, top: "70%", delay: "-3s", duration: "19s", opacity: 0.2 },
  ];

  return (
    <div className="floating-hearts floating-hearts--global" aria-hidden="true">
      {hearts.map((heart, index) => (
        <span
          className="heart"
          key={index}
          style={{
            ["--size" as string]: `${heart.size}px`,
            ["--left" as string]: heart.left,
            ["--top" as string]: heart.top,
            ["--duration" as string]: heart.duration,
            ["--delay" as string]: heart.delay,
            ["--opacity" as string]: String(heart.opacity),
          }}
        />
      ))}
    </div>
  );
}
