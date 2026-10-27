"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { portfolioPage } from "@/data/portfolio";

function getTagHref(tag) {
  return tag === "All"
    ? "/portfolio"
    : `/portfolio?tag=${encodeURIComponent(tag)}`;
}

export default function TagFilter({ activeTag, tags }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSelect(tag) {
    if (tag === activeTag) {
      return;
    }

    startTransition(() => {
      router.push(getTagHref(tag), { scroll: false });
    });
  }

  return (
    <div
      aria-busy={isPending}
      aria-label={portfolioPage.filtersLabel}
      className={`flex gap-2 overflow-x-auto pb-1 transition-opacity ${
        isPending ? "opacity-60" : ""
      }`}
      role="group"
    >
      {tags.map((tag) => {
        const active = tag === activeTag;

        return (
          <button
            aria-pressed={active}
            className={[
              "hud-chip min-h-11 shrink-0 px-4 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
              active
                ? "hud-chip--primary"
                : "text-muted hover:bg-surface-raised hover:text-primary",
            ].join(" ")}
            key={tag}
            onClick={() => handleSelect(tag)}
            type="button"
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
