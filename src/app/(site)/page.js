import { Suspense } from "react";
import HomeHero from "@/components/home/HomeHero";
import LatestWork from "@/components/home/LatestWork";

export const metadata = {
  title: { absolute: "Tuna (まぐろ寿司) — Anime & Manga Illustrator" },
  description:
    "Portfolio and commission information for Tuna (まぐろ寿司), an anime and manga illustrator from Indonesia.",
  openGraph: {
    title: "Tuna (まぐろ寿司) — Anime & Manga Illustrator",
    description:
      "Portfolio and commission information for Tuna (まぐろ寿司), an anime and manga illustrator from Indonesia.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="w-full">
      <HomeHero />

      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
        <Suspense
          fallback={
            <div aria-hidden="true">
              <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
                <div className="space-y-3">
                  <div className="h-3 w-28 animate-pulse bg-surface-alt" />
                  <div className="h-9 w-48 animate-pulse bg-surface-alt" />
                </div>
                <div className="h-3 w-24 animate-pulse bg-surface-alt" />
              </div>
              <div className="mt-6 flex gap-3 overflow-hidden">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    className="h-64 w-36 shrink-0 animate-pulse bg-surface sm:w-44"
                    key={index}
                  />
                ))}
              </div>
            </div>
          }
        >
          <LatestWork />
        </Suspense>
      </div>
    </div>
  );
}
