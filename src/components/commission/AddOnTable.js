import { Info } from "lucide-react";
import {
  addOnNote,
  addOns,
  commissionPage,
} from "@/data/pricing";

export default function AddOnTable() {
  return (
    <div>
      <div className="overflow-hidden rounded-card border border-border bg-surface">
        <table className="w-full text-left">
          <caption className="sr-only">
            {commissionPage.addOnSectionTitle}
          </caption>
          <thead className="border-b border-border bg-surface-alt">
            <tr className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              <th className="px-4 py-3 sm:px-5" scope="col">
                {commissionPage.addOnNameLabel}
              </th>
              <th
                className="px-4 py-3 text-right sm:px-5"
                scope="col"
              >
                {commissionPage.addOnFeeLabel}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {addOns.map((addOn) => (
              <tr className="align-top" key={addOn.name}>
                <th className="px-4 py-4 font-normal sm:px-5" scope="row">
                  <span className="block font-heading text-base font-semibold text-text">
                    {addOn.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">
                    {addOn.description}
                  </span>
                </th>
                <td className="whitespace-nowrap px-4 py-4 text-right font-heading text-lg font-bold text-primary sm:px-5">
                  {addOn.fee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted">
        <Info
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
        />
        {addOnNote}
      </p>
    </div>
  );
}
