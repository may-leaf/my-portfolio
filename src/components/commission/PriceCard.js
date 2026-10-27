import { Info } from "lucide-react";
import HudPanel from "@/components/HudPanel";
import PriceDetail from "@/components/commission/PriceDetail";
import { commissionPage } from "@/data/pricing";

export default function PriceCard({ tier, index = 0 }) {
  const label = tier.label || `TYPE-${String.fromCharCode(65 + index)}`;

  return (
    <HudPanel
      as="article"
      brackets
      bracketClassName="inset-3"
      className="h-full"
      innerClassName="flex h-full flex-col p-5 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="hud-label text-primary">{label}</p>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <h3 className="mt-4 font-heading text-xl font-bold uppercase leading-tight">
        {tier.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {tier.description}
      </p>

      <dl className="mt-6 space-y-3 border-y border-border py-5">
        {tier.prices.map((price) => (
          <div className="flex items-baseline gap-2" key={price.option}>
            <dt className="text-sm text-muted">
              <span className="block">{price.option}</span>
              {price.detail ? (
                <span className="mt-0.5 block text-xs text-muted/80">
                  {price.detail}
                </span>
              ) : null}
            </dt>
            <span aria-hidden="true" className="hud-leader" />
            <dd className="text-right font-mono text-sm font-bold text-primary">
              {price.price}
            </dd>
          </div>
        ))}
      </dl>

      {tier.note ? (
        <p className="mt-5 flex items-start gap-2 border border-primary/30 bg-primary-soft px-4 py-3 text-sm leading-relaxed text-text">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
          />
          {tier.note}
        </p>
      ) : null}

      <dl className="mt-5 space-y-4">
        {tier.example ? (
          <PriceDetail label={commissionPage.priceExampleLabel}>
            {tier.example}
          </PriceDetail>
        ) : null}
        {tier.includes ? (
          <PriceDetail label={commissionPage.priceIncludesLabel}>
            {tier.includes}
          </PriceDetail>
        ) : null}
        {tier.goodFor ? (
          <PriceDetail label={commissionPage.priceGoodForLabel}>
            {tier.goodFor}
          </PriceDetail>
        ) : null}
      </dl>
    </HudPanel>
  );
}
