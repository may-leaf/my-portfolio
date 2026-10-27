"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-[1120px] items-center justify-between gap-4 px-5">
        <Link
          className="flex min-h-11 items-center gap-2 rounded-pill font-jp text-base font-bold text-text transition-colors hover:text-primary"
          href="/"
        >
          まぐろ寿司
          <span className="hidden text-xs font-semibold uppercase tracking-[0.12em] text-muted sm:inline">
            MaguroSushi
          </span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={[
                      "inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill px-3 text-sm font-semibold transition-colors",
                      active
                        ? "text-primary"
                        : "text-muted hover:text-text",
                    ].join(" ")}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
