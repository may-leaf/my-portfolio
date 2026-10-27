"use client";

import { animate, createScope } from "animejs";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getRouteIndex, getTransitionLabel } from "@/data/transition-labels";

const TRANSITION_CONFIG = {
  slatCount: 5,
  coverDuration: 420,
  coverStagger: 50,
  revealDuration: 450,
  revealStagger: 50,
  labelFadeDuration: 200,
  failsafeTimeout: 3000,
  ease: "inOutExpo",
};

function isModifiedEvent(event) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function isIgnorableLink(anchor) {
  if (!anchor) {
    return true;
  }

  if (anchor.target && anchor.target !== "_self") {
    return true;
  }

  if (anchor.hasAttribute("download")) {
    return true;
  }

  if (anchor.hasAttribute("data-no-transition")) {
    return true;
  }

  const href = anchor.getAttribute("href");
  if (!href) {
    return true;
  }

  if (href.startsWith("#")) {
    return true;
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return true;
  }

  if (/^https?:\/\//i.test(href)) {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) {
      return true;
    }
  }

  return false;
}

export default function PageTransition({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef(null);
  const scopeRef = useRef(null);
  const slatsRef = useRef([]);
  const labelRef = useRef(null);
  const progressRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const pendingPathRef = useRef(null);
  const coverDoneRef = useRef(false);
  const pathnameRef = useRef(pathname);
  const failsafeRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const clearFailsafe = useCallback(() => {
    if (failsafeRef.current) {
      clearTimeout(failsafeRef.current);
      failsafeRef.current = null;
    }
  }, []);

  const cleanup = useCallback(() => {
    clearFailsafe();
    if (scopeRef.current) {
      scopeRef.current.revert();
      scopeRef.current = null;
    }
    isAnimatingRef.current = false;
    coverDoneRef.current = false;
    pendingPathRef.current = null;
    setIsVisible(false);
    if (slatsRef.current.length) {
      slatsRef.current.forEach((slat) => {
        if (slat) {
          slat.style.transform = "scaleY(0)";
        }
      });
    }
    if (labelRef.current) {
      labelRef.current.style.opacity = "0";
    }
    if (progressRef.current) {
      progressRef.current.style.transform = "scaleX(0)";
    }
  }, [clearFailsafe]);

  const runReveal = useCallback(() => {
    if (!rootRef.current || !isAnimatingRef.current) {
      cleanup();
      return;
    }

    if (scopeRef.current) {
      scopeRef.current.revert();
    }

    const scope = createScope({ root: rootRef.current }).add(() => {
      animate(labelRef.current, {
        opacity: 0,
        duration: TRANSITION_CONFIG.labelFadeDuration,
        ease: TRANSITION_CONFIG.ease,
      });

      animate(slatsRef.current, {
        scaleY: [1, 0],
        transformOrigin: ["top", "top"],
        duration: TRANSITION_CONFIG.revealDuration,
        delay: (el, i) => i * TRANSITION_CONFIG.revealStagger,
        ease: TRANSITION_CONFIG.ease,
        onComplete: () => {
          cleanup();
          const main = document.querySelector("main");
          if (main) {
            main.setAttribute("tabindex", "-1");
            main.focus({ preventScroll: true });
            main.removeAttribute("tabindex");
          }
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        },
      });
    });

    scopeRef.current = scope;
  }, [cleanup]);

  const checkReadyToReveal = useCallback(() => {
    if (!isAnimatingRef.current) {
      return;
    }
    if (coverDoneRef.current && pathnameRef.current === pendingPathRef.current) {
      runReveal();
    }
  }, [runReveal]);

  const startTransition = useCallback(
    (href) => {
      if (isAnimatingRef.current) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      if (href.startsWith("/admin") || pathnameRef.current.startsWith("/admin")) {
        router.push(href);
        return;
      }

      if (href === pathnameRef.current || href === pathnameRef.current + "/") {
        return;
      }

      isAnimatingRef.current = true;
      coverDoneRef.current = false;
      pendingPathRef.current = href;
      setIsVisible(true);

      clearFailsafe();
      failsafeRef.current = setTimeout(() => {
        cleanup();
        router.push(href);
      }, TRANSITION_CONFIG.failsafeTimeout);

      if (scopeRef.current) {
        scopeRef.current.revert();
      }

      const scope = createScope({ root: rootRef.current }).add(() => {
        if (labelRef.current) {
          labelRef.current.querySelector(".pt-label").textContent = getTransitionLabel(href);
          labelRef.current.querySelector(".pt-index").textContent = `[${String(getRouteIndex(href)).padStart(2,"0")} / 04]`;
          labelRef.current.style.opacity = "0";
        }
        if (progressRef.current) {
          progressRef.current.style.transform = "scaleX(0)";
        }
        slatsRef.current.forEach((slat) => {
          if (slat) {
            slat.style.transform = "scaleY(0)";
            slat.style.transformOrigin = "bottom";
          }
        });

        animate(slatsRef.current, {
          scaleY: [0, 1],
          duration: TRANSITION_CONFIG.coverDuration,
          delay: (el, i) => i * TRANSITION_CONFIG.coverStagger,
          ease: TRANSITION_CONFIG.ease,
        });

        animate(labelRef.current, {
          opacity: [0, 1],
          duration: TRANSITION_CONFIG.labelFadeDuration,
          delay: TRANSITION_CONFIG.coverDuration * 0.3,
          ease: TRANSITION_CONFIG.ease,
        });

        animate(progressRef.current, {
          scaleX: [0, 1],
          duration: TRANSITION_CONFIG.coverDuration * 0.6,
          delay: TRANSITION_CONFIG.coverDuration * 0.4,
          ease: TRANSITION_CONFIG.ease,
        });
      });

      scopeRef.current = scope;

      setTimeout(() => {
        if (isAnimatingRef.current) {
          coverDoneRef.current = true;
          checkReadyToReveal();
        }
      }, TRANSITION_CONFIG.coverDuration + 100);

      router.push(href);
    },
    [checkReadyToReveal, cleanup, clearFailsafe, router]
  );

  useEffect(() => {
    if (isAnimatingRef.current && pendingPathRef.current) {
      if (pathname === pendingPathRef.current || pathnameRef.current === pendingPathRef.current) {
        checkReadyToReveal();
      }
    }
  }, [pathname, checkReadyToReveal]);

  useEffect(() => {
    function handleClick(event) {
      if (event.defaultPrevented) {
        return;
      }

      if (event.button !== 0) {
        return;
      }

      if (isModifiedEvent(event)) {
        return;
      }

      let anchor = event.target;
      while (anchor && anchor !== document.body) {
        if (anchor.tagName === "A") {
          break;
        }
        anchor = anchor.parentElement;
      }

      if (!anchor || anchor.tagName !== "A") {
        return;
      }

      if (isIgnorableLink(anchor)) {
        return;
      }

      const href = anchor.href;
      if (!href) {
        return;
      }

      const url = new URL(href);
      if (url.origin !== window.location.origin) {
        return;
      }

      const targetPath = url.pathname + url.search + url.hash;
      if (targetPath === pathnameRef.current + window.location.search + window.location.hash) {
        return;
      }

      if (url.pathname.startsWith("/admin") || pathnameRef.current.startsWith("/admin")) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      startTransition(url.pathname + url.search);
    }

    function handlePopState() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (location.pathname.startsWith("/admin")) {
        return;
      }

      if (isAnimatingRef.current) {
        return;
      }

      isAnimatingRef.current = true;
      pendingPathRef.current = location.pathname + location.search;
      coverDoneRef.current = true;
      setIsVisible(true);

      if (labelRef.current) {
        labelRef.current.querySelector(".pt-label").textContent = getTransitionLabel(location.pathname);
        labelRef.current.querySelector(".pt-index").textContent = `[${String(getRouteIndex(href)).padStart(2,"0")} / 04]`;
        labelRef.current.style.opacity = "0";
      }
      if (progressRef.current) {
        progressRef.current.style.transform = "scaleX(0)";
      }
      slatsRef.current.forEach((slat) => {
        if (slat) {
          slat.style.transform = "scaleY(1)";
          slat.style.transformOrigin = "bottom";
        }
      });

      clearFailsafe();
      failsafeRef.current = setTimeout(() => {
        cleanup();
      }, TRANSITION_CONFIG.failsafeTimeout);

      setTimeout(() => {
        runReveal();
      }, 50);
    }

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      cleanup();
    };
  }, [cleanup, clearFailsafe, runReveal, startTransition]);

  return (
    <>
      {children}
      <div
        ref={rootRef}
        aria-hidden="true"
        className="fixed inset-0 z-[200] pointer-events-none"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="absolute inset-0 flex">
          {Array.from({ length: TRANSITION_CONFIG.slatCount }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                slatsRef.current[i] = el;
              }}
              className="h-full flex-1 bg-bg"
              style={{ transform: "scaleY(0)", transformOrigin: "bottom", willChange: isAnimatingRef.current ? "transform" : "auto" }}
            />
          ))}
        </div>
        <div
          ref={labelRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ opacity: 0, willChange: isAnimatingRef.current ? "opacity" : "auto" }}
        >
          <p className="pt-label font-mono text-xs uppercase tracking-[0.18em] text-primary"></p>
          <p className="pt-index font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted"></p>
          <div className="mt-4 h-[2px] w-48 overflow-hidden bg-border">
            <div
              ref={progressRef}
              className="h-full w-full origin-left bg-primary"
              style={{ transform: "scaleX(0)", willChange: isAnimatingRef.current ? "transform" : "auto" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}