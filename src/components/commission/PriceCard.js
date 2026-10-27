import PriceDetail from "@/components/commission/PriceDetail";
import { commissionPage } from "@/data/pricing";

export default function PriceCard({ tier }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-border bg-surface p-6">
      <h3 className="font-heading text-xl font-bold leading-tight">
        {tier.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {tier.description}
      </p>

      <dl className="mt-6 space-y-3 border-y border-border py-5">
        {tier.prices.map((price) => (
          <div
            className="flex items-baseline justify-between gap-4"
            key={price.option}
          >
            <dt className="text-sm text-muted">{price.option}</dt>
            <dd className="text-right font-heading text-lg font-bold text-text">
              {price.price}
            </dd>
          </div>
        ))}
      </dl>

      <dl className="mt-5 space-y-4">
        <PriceDetail label={commissionPage.priceExampleLabel}>
          {tier.example}
        </PriceDetail>
        {tier.includes ? (
          <PriceDetail label={commissionPage.priceIncludesLabel}>
            {tier.includes}
          </PriceDetail>
        ) : null}
        <PriceDetail label={commissionPage.priceGoodForLabel}>
          {tier.goodFor}
        </PriceDetail>
      </dl>
    </article>
  );
}
