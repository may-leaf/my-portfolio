"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/artworks", label: "Artworks" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation">
      <ul className="flex items-center gap-1">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                aria-current={active ? "page" : undefined}
                className={[
                  "inline-flex min-h-11 items-center rounded-pill px-3 text-sm font-semibold transition-colors",
                  active ? "text-primary" : "text-muted hover:text-text",
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
  );
}
