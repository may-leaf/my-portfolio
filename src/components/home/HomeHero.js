import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import CommissionStatus from "@/components/CommissionStatus";
import SocialLinks from "@/components/SocialLinks";
import { profile } from "@/data/profile";

export default function HomeHero() {
  return (
    <section className="flex flex-col items-center text-center">
      <div className="rounded-full border-[3px] border-primary bg-bg p-1.5 shadow-avatar">
        <Image
          alt={profile.avatar.alt}
          className="h-[140px] w-[140px] rounded-full object-cover sm:h-[180px] sm:w-[180px]"
          height={360}
          priority
          sizes="(min-width: 640px) 180px, 140px"
          src={profile.avatar.src}
          width={360}
        />
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
        {profile.eyebrow}
      </p>

      <h1 className="mt-3 text-[2.5rem] font-bold leading-[1.15]">
        <span className="font-jp">{profile.nameJa}</span>{" "}
        <span>{profile.nameEn}</span>
      </h1>

      <p className="mt-5 max-w-[36rem] text-base leading-[1.7] text-muted">
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

      <div className="mt-6">
        <Suspense
          fallback={
            <Badge className="min-h-7" tone="neutral">
              Checking commissions
            </Badge>
          }
        >
          <CommissionStatus />
        </Suspense>
      </div>

      <div className="mt-8 flex w-full max-w-[22rem] flex-col gap-3">
        {profile.links.map((link) => (
          <Button
            className="w-full justify-between"
            href={link.href}
            key={link.href}
            variant={link.variant}
          >
            <span>{link.label}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <div className="mt-8">
        <SocialLinks />
      </div>
    </section>
  );
}
