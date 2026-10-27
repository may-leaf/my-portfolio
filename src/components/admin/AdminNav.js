"use client";

import { ImageIcon, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/artworks", label: "Artworks", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: SlidersHorizontal },
];

export default function AdminNav({ orientation = "vertical" }) {
  const pathname = usePathname();
  const vertical = orientation === "vertical";

  return (
    <nav aria-label="Admin navigation" className={vertical ? "" : "min-w-0"}>
      <ul
        className={
          vertical ? "space-y-1" : "flex items-center gap-1 overflow-x-auto"
        }
      >
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <li className={vertical ? "" : "shrink-0"} key={link.href}>
              <Link
                aria-current={active ? "page" : undefined}
                className={[
                  "inline-flex min-h-11 items-center gap-2.5 border px-3 text-sm font-semibold transition-colors",
                  vertical ? "w-full" : "shrink-0",
                  active
                    ? "border-border bg-surface-alt text-primary"
                    : "border-transparent text-muted hover:bg-surface-alt hover:text-text",
                ].join(" ")}
                href={link.href}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
