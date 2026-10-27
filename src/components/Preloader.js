"use client";

import { animate, createScope } from "animejs";
import { useEffect, useRef, useState } from "react";

const sessionKey = "tuna-preloader-seen";

function markSeen() {
  try {
    sessionStorage.setItem(sessionKey, "1");
  } catch {
    return;
  }
}

export default function Preloader() {
  const root = useRef(null);
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.preloader === "skip") {
      return;
    }

    const node = root.current;
    const duration = window.matchMedia("(max-width: 639px)").matches
      ? 1100
      : 1500;

    const scope = createScope({ root }).add(() => {
      animate("[data-preloader-line]", {
        scaleX: [0, 1],
        duration,
        ease: "inOutQuad",
      });

      animate("[data-preloader-copy]", {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 500,
        ease: "outExpo",
      });

      const counter = { value: 0 };

      animate(counter, {
        value: 100,
        duration,
        ease: "inOutQuad",
        onUpdate: () => setProgress(Math.round(counter.value)),
        onComplete: () => {
          markSeen();

          animate(node, {
            translateY: ["0%", "-102%"],
            duration: 500,
            ease: "inOutQuad",
            onComplete: () => {
              document.documentElement.dataset.preloader = "done";
              setDismissed(true);
            },
          });
        },
      });
    });

    return () => scope.revert();
  }, []);

  if (dismissed) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-bg p-6 sm:p-10"
      id="site-preloader"
      ref={root}
    >
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="hud-scanlines pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative flex items-start justify-between gap-4">
        <p className="hud-label text-muted">TUNA (まぐろ寿司) // FIELD TERMINAL</p>
        <p className="hud-label text-primary">SYS.01</p>
      </div>

      <div className="relative max-w-4xl" data-preloader-copy>
        <p className="font-heading text-[clamp(2.25rem,7vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
          i dont draw anymore
          <br />
          <span className="text-primary">but im still an artist</span>
        </p>

        <div className="mt-8 h-px w-full overflow-hidden bg-border">
          <div
            className="h-full w-full origin-left scale-x-0 bg-primary"
            data-preloader-line
          />
        </div>
      </div>

      <div className="relative flex items-end justify-between gap-4">
        <p className="hud-label text-muted">Loading visual records</p>
        <p className="font-mono text-3xl tabular-nums text-primary sm:text-4xl">
          {String(progress).padStart(3, "0")}%
        </p>
      </div>
    </div>
  );
}
