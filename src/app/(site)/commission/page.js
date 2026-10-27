import { Suspense } from "react";
import BackLink from "@/components/BackLink";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import AddOnTable from "@/components/commission/AddOnTable";
import CommissionContact from "@/components/commission/CommissionContact";
import PriceCard from "@/components/commission/PriceCard";
import TermsAccordion from "@/components/commission/TermsAccordion";
import CommissionStatus from "@/components/CommissionStatus";
import Reveal from "@/components/motion/Reveal";
import { commissionPage, priceCards } from "@/data/pricing";

export const metadata = {
  title: "Commission Info",
  description:
    "Commission pricing, add-ons and terms of service for Tuna (まぐろ寿司), an anime and manga illustrator.",
  openGraph: {
    title: "Commission Info | Tuna (まぐろ寿司)",
    description:
      "Commission pricing, add-ons and terms of service for Tuna (まぐろ寿司), an anime and manga illustrator.",
    type: "website",
  },
};

export default function CommissionPage() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
      <BackLink />

      <header className="mt-8 border-b border-border pb-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="hud-label text-primary">
              {"// "}
              {commissionPage.eyebrow}
            </p>
            <h1 className="mt-3 font-heading text-[clamp(2.75rem,7vw,5.5rem)] font-bold uppercase leading-[0.92]">
              {commissionPage.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-[1.7] text-muted sm:text-lg">
              {commissionPage.intro}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <Suspense
              fallback={
                <Badge className="min-h-7" tone="neutral">
                  Checking commissions
                </Badge>
              }
            >
              <CommissionStatus />
            </Suspense>
            <Button href="#contact" variant="primary">
              Message me
              <span aria-hidden="true">{"//"}</span>
            </Button>
          </div>
        </div>
      </header>

      <Reveal as="section" aria-labelledby="pricing-title" className="mt-14">
        <div className="border-b border-border pb-4">
          <p className="hud-label text-primary">{"// 01 / Pricing"}</p>
          <h2
            className="mt-2 font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold uppercase leading-tight"
            id="pricing-title"
          >
            {commissionPage.priceSectionTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {commissionPage.priceSectionIntro}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {priceCards.map((tier, index) => (
            <PriceCard index={index} key={tier.id} tier={tier} />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" aria-labelledby="add-ons-title" className="mt-14">
        <div className="border-b border-border pb-4">
          <p className="hud-label text-primary">{"// 02 / Add-ons"}</p>
          <h2
            className="mt-2 font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold uppercase leading-tight"
            id="add-ons-title"
          >
            {commissionPage.addOnSectionTitle}
          </h2>
        </div>

        <div className="mt-6">
          <AddOnTable />
        </div>
      </Reveal>

      <Reveal
        as="section"
        aria-labelledby="terms-title"
        className="mt-14 scroll-mt-28"
        id="terms"
      >
        <div className="border-b border-border pb-4">
          <p className="hud-label text-primary">{"// 03 / Protocol"}</p>
          <h2
            className="mt-2 font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold uppercase leading-tight"
            id="terms-title"
          >
            {commissionPage.termsSectionTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            {commissionPage.termsSectionIntro}
          </p>
        </div>

        <div className="mt-6">
          <TermsAccordion />
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <CommissionContact />
      </Reveal>
    </div>
  );
}
