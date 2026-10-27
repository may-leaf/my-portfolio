import { Suspense } from "react";
import Badge from "@/components/Badge";
import BackLink from "@/components/BackLink";
import AddOnTable from "@/components/commission/AddOnTable";
import CommissionContact from "@/components/commission/CommissionContact";
import PriceCard from "@/components/commission/PriceCard";
import TermsAccordion from "@/components/commission/TermsAccordion";
import CommissionStatus from "@/components/CommissionStatus";
import {
  commissionPage,
  priceCards,
} from "@/data/pricing";

export const metadata = {
  title: "Commission Info",
  description:
    "Commission pricing, add-ons and terms of service for MaguroSushi, an anime and manga illustrator.",
  openGraph: {
    title: "Commission Info | MaguroSushi",
    description:
      "Commission pricing, add-ons and terms of service for MaguroSushi, an anime and manga illustrator.",
    type: "website",
  },
};

export default function CommissionPage() {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-5 py-12 sm:py-16">
      <BackLink />

      <header className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          {commissionPage.eyebrow}
        </p>
        <h1 className="mt-2 font-heading text-[2.5rem] font-bold leading-tight sm:text-5xl">
          {commissionPage.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-[1.7] text-muted">
          {commissionPage.intro}
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
      </header>

      <section aria-labelledby="pricing-title" className="mt-14">
        <h2
          className="font-heading text-[1.75rem] font-bold leading-tight sm:text-3xl"
          id="pricing-title"
        >
          {commissionPage.priceSectionTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {commissionPage.priceSectionIntro}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {priceCards.map((tier) => (
            <PriceCard key={tier.id} tier={tier} />
          ))}
        </div>
      </section>

      <section aria-labelledby="add-ons-title" className="mt-14">
        <h2
          className="font-heading text-[1.75rem] font-bold leading-tight sm:text-3xl"
          id="add-ons-title"
        >
          {commissionPage.addOnSectionTitle}
        </h2>

        <div className="mt-6">
          <AddOnTable />
        </div>
      </section>

      <section
        aria-labelledby="terms-title"
        className="mt-14 scroll-mt-28"
        id="terms"
      >
        <h2
          className="font-heading text-[1.75rem] font-bold leading-tight sm:text-3xl"
          id="terms-title"
        >
          {commissionPage.termsSectionTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          {commissionPage.termsSectionIntro}
        </p>

        <div className="mt-6">
          <TermsAccordion />
        </div>
      </section>

      <div className="mt-14">
        <CommissionContact />
      </div>
    </div>
  );
}
