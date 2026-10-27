import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Button from "@/components/Button";
import CommissionStatus from "@/components/CommissionStatus";
import CornerBrackets from "@/components/CornerBrackets";
import HudPanel from "@/components/HudPanel";
import HeroIntro from "@/components/motion/HeroIntro";
import SocialLinks from "@/components/SocialLinks";
import { profile } from "@/data/profile";
import { fetchArtworks } from "@/lib/artworks";

function formatStamp(value) {
  if (!value) {
    return "REC-001";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "REC-001";
  }

  return date.toISOString().slice(0, 10);
}

function NameChars({ text }) {
  return Array.from(text).map((char, index) => (
    <span className="inline-block" data-hero-char key={`${char}-${index}`}>
      {char === " " ? "\u00a0" : char}
    </span>
  ));
}

function HeroVisual({ artwork }) {
  const imageUrl = artwork?.image_url;
  const title = artwork?.title ?? "Archive standby";
  const tags = artwork?.tags?.slice(0, 2) ?? [];

  return (
    <HudPanel
      className="h-full min-h-[440px] lg:min-h-[560px]"
      cut="lg"
      innerClassName="relative flex h-full flex-col overflow-hidden bg-bg p-0"
    >
      <Link
        aria-label={
          artwork
            ? `View ${title} in the portfolio`
            : "Open the illustration portfolio"
        }
        className="group relative flex h-full min-h-[440px] flex-col justify-between overflow-hidden p-4 sm:p-5 lg:min-h-[560px]"
        href="/portfolio"
      >
        <div className="absolute inset-0">
          {imageUrl ? (
            <Image
              alt={title}
              className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              src={imageUrl}
            />
          ) : (
            <>
              <Image
                alt={profile.avatar.alt}
                className="object-cover opacity-70"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                src={profile.avatar.src}
              />
              <span className="absolute inset-0 bg-bg/55" />
            </>
          )}

          <span className="absolute inset-0 bg-linear-to-t from-bg via-bg/25 to-bg/10" />
        </div>

        <div className="relative flex items-start justify-between gap-3">
          <span className="hud-chip hud-chip--soft min-h-7 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
            <span
              aria-hidden="true"
              className="hud-pulse h-1.5 w-1.5 rounded-full bg-primary"
            />
            [REC]
          </span>

          <span className="hud-label text-right text-muted">
            {imageUrl ? formatStamp(artwork.created_at) : "NO SIGNAL"}
          </span>
        </div>

        <div className="relative mt-auto pt-20">
          <p className="hud-label text-primary">
            {imageUrl ? "Latest transmission" : "Awaiting transmission"}
          </p>
          <h2 className="mt-3 max-w-[90%] font-heading text-[clamp(1.75rem,3.5vw,3rem)] font-bold uppercase leading-[1.02]">
            {title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {tags.length ? (
              tags.map((tag) => (
                <span
                  className="hud-chip min-h-6 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em]"
                  key={tag}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="hud-label text-muted">
                Visual archive // online
              </span>
            )}
          </div>

          <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-text transition-colors group-hover:text-primary">
            Open record
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
            />
          </span>
        </div>

        <CornerBrackets className="inset-4" />
      </Link>
    </HudPanel>
  );
}

async function HeroArtwork() {
  const { artworks } = await fetchArtworks({ limit: 1 });

  return <HeroVisual artwork={artworks[0] ?? null} />;
}

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="hud-scanlines pointer-events-none absolute inset-0 opacity-40" />
      <div className="hud-vignette pointer-events-none absolute inset-0" />

      <HeroIntro>
        <div className="relative mx-auto grid w-full max-w-[1280px] gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 lg:pb-20 lg:pt-36">
          <div className="max-w-3xl">
            <div
              className="flex flex-wrap items-center gap-4"
              data-hero-item
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-primary bg-surface-raised">
                <Image
                  alt={profile.avatar.alt}
                  className="object-cover"
                  fill
                  sizes="56px"
                  src={profile.avatar.src}
                />
              </span>
              <span>
                <span className="block font-mono text-xs uppercase tracking-[0.16em] text-primary">
                  {"// "}
                  {profile.eyebrow}
                </span>
              <span className="mt-1 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                Indonesia // ID
              </span>
              </span>
            </div>

            <h1
              aria-label={profile.name}
              className="mt-7 font-heading text-[clamp(2.25rem,7.2vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.01em] normal-case"
            >
              <span aria-hidden="true" className="block text-text">
                <NameChars text={profile.name} />
              </span>
            </h1>

            <p
              className="mt-6 max-w-[38rem] text-base leading-[1.7] text-muted sm:text-lg"
              data-hero-item
            >
              {profile.bio.map((part, index) =>
                part.strong ? (
                  <strong className="font-semibold text-text" key={index}>
                    {part.text}
                  </strong>
                ) : (
                  <span key={index}>{part.text}</span>
                ),
              )}
            </p>

            <div className="mt-6" data-hero-item>
              <Suspense
                fallback={
                  <span className="hud-chip min-h-7 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em]">
                    Checking commissions
                  </span>
                }
              >
                <CommissionStatus />
              </Suspense>
            </div>

            <div
              className="mt-8 flex w-full max-w-[26rem] flex-col gap-3"
              data-hero-item
            >
              {profile.links.map((link) => {
                const variant =
                  link.variant === "primary"
                    ? "primary"
                    : link.href.includes("#terms")
                      ? "ghost"
                      : "secondary";

                return (
                  <Button
                    className="w-full justify-between"
                    href={link.href}
                    key={link.href}
                    variant={variant}
                  >
                    <span>{link.label}</span>
                    {variant === "primary" ? (
                      <span aria-hidden="true">{"//"}</span>
                    ) : (
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    )}
                  </Button>
                );
              })}
            </div>

            <div className="mt-8" data-hero-item>
              <SocialLinks align="left" />
            </div>
          </div>

          <div className="min-w-0" data-hero-frame>
            <Suspense fallback={<HeroVisual artwork={null} />}>
              <HeroArtwork />
            </Suspense>
          </div>
        </div>
      </HeroIntro>
    </section>
  );
}
