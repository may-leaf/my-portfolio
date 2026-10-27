"use client";

import { animate } from "animejs";
import { useLayoutEffect, useRef } from "react";

export default function Reveal({
  as: Component = "div",
  className = "",
  children,
  ...props
}) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const node = root.current;
    let animation;

    node.style.opacity = "0";
    node.style.transform = "translateY(24px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();
        animation = animate(node, {
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 700,
          ease: "outExpo",
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      animation?.revert();
      node.style.opacity = "";
      node.style.transform = "";
    };
  }, []);

  return (
    <Component className={className} ref={root} {...props}>
      {children}
    </Component>
  );
}
