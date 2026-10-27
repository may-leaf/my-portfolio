"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";

const pad = (value) => String(value).padStart(2, "0");

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }

    if (!open && dialog.open) {
      dialog.close();
    }

    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          solid
            ? "border-b border-border bg-bg/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex min-h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            className="group flex min-h-11 items-center gap-3"
            href="/"
            onClick={() => setOpen(false)}
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-primary bg-surface-raised">
              <Image
                alt={profile.avatar.alt}
                className="object-cover"
                fill
                sizes="36px"
                src={profile.avatar.src}
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-sm font-bold normal-case tracking-[0.12em] text-text transition-colors group-hover:text-primary">
                {profile.name}
              </span>
              <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                Illustration archive
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative inline-flex min-h-11 items-center px-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                    active
                      ? "text-primary"
                      : "text-muted hover:text-text",
                  ].join(" ")}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-1 h-px bg-primary"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              className="hidden lg:inline-flex"
              href="/commission"
              size="sm"
              variant="primary"
            >
              Commission
              <span aria-hidden="true" className="opacity-60">
                {"//"}
              </span>
            </Button>

            <button
              aria-controls="mobile-navigation"
              aria-expanded={open}
              aria-label="Open navigation menu"
              className="hud-btn hud-btn--secondary inline-flex h-11 w-11 items-center justify-center p-0 lg:hidden"
              onClick={() => setOpen(true)}
              ref={triggerRef}
              type="button"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <dialog
        aria-label="Mobile navigation"
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-bg p-0 text-text backdrop:bg-bg"
        id="mobile-navigation"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        ref={dialogRef}
      >
        <div className="hud-grid relative flex h-full flex-col overflow-y-auto">
          <div className="relative flex min-h-16 items-center justify-between border-b border-border px-5 sm:px-8">
            <span className="hud-label text-primary">Nav // 03</span>
            <button
              aria-label="Close navigation menu"
              className="hud-btn hud-btn--secondary inline-flex h-11 w-11 items-center justify-center p-0"
              onClick={closeMenu}
              ref={closeRef}
              type="button"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex flex-1 flex-col px-5 py-10 sm:px-8">
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    className="group flex items-baseline gap-4 border-b border-border py-4 transition-colors hover:text-primary"
                    href={link.href}
                    onClick={closeMenu}
                  >
                    <span className="font-mono text-xs text-muted">
                      {pad(index + 1)} / {pad(navLinks.length)}
                    </span>
                    <span className="font-heading text-[clamp(2rem,9vw,4rem)] font-bold uppercase leading-none">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t border-border pt-6">
              <Button className="w-full" href="/commission" variant="primary">
                Message me
                <span aria-hidden="true">{"//"}</span>
              </Button>
              <p className="hud-label mt-5 text-muted">
                {profile.name} {"//"} Indonesia
              </p>
            </div>
          </nav>
        </div>
      </dialog>
    </>
  );
}
