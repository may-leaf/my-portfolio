"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { portfolioPage } from "@/data/portfolio";

function getTagHref(tag) {
  return tag === "All" ? "/portfolio" : `/portfolio?tag=${encodeURIComponent(tag)}`;
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
            className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
              active
                ? "border-primary bg-primary text-primary-ink"
                : "border-border bg-surface text-muted hover:border-primary hover:text-primary"
            }`}
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
