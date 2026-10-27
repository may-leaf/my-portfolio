import { Suspense } from "react";
import HomeHero from "@/components/home/HomeHero";
import LatestWork from "@/components/home/LatestWork";

export const metadata = {
  title: { absolute: "MaguroSushi — Anime & Manga Illustrator" },
  description:
    "Portfolio and commission information for MaguroSushi, an anime and manga illustrator from Indonesia.",
  openGraph: {
    title: "MaguroSushi — Anime & Manga Illustrator",
    description:
      "Portfolio and commission information for MaguroSushi, an anime and manga illustrator from Indonesia.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-5 py-16 sm:py-24">
      <HomeHero />

      <div className="mt-16">
        <Suspense
          fallback={
            <div aria-hidden="true" className="space-y-5">
              <div className="h-7 w-40 animate-pulse rounded-input bg-surface-alt" />
              <div className="flex gap-3 overflow-hidden">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    className="h-44 w-32 shrink-0 animate-pulse rounded-image bg-surface sm:w-40"
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
