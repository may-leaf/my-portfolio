"use client";

import { animate, createScope, stagger } from "animejs";
import { useLayoutEffect, useRef } from "react";

export default function HeroIntro({ children }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scope = createScope({ root }).add(() => {
      animate("[data-hero-frame]", {
        opacity: [0, 1],
        translateY: [18, 0],
        duration: 850,
        ease: "outExpo",
      });

      animate("[data-hero-char]", {
        opacity: [0, 1],
        translateY: [28, 0],
        delay: stagger(22),
        duration: 700,
        ease: "outExpo",
      });

      animate("[data-hero-item]", {
        opacity: [0, 1],
        translateY: [16, 0],
        delay: stagger(70),
        duration: 600,
        ease: "outExpo",
      });
    });

    return () => scope.revert();
  }, []);

  return (
    <div className="h-full" ref={root}>
      {children}
    </div>
  );
}
