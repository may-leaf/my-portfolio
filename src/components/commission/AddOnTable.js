import { Info } from "lucide-react";
import HudPanel from "@/components/HudPanel";
import { addOnNote, addOns, commissionPage } from "@/data/pricing";

export default function AddOnTable() {
  return (
    <div>
      <HudPanel
        className="w-full"
        innerClassName="overflow-x-auto bg-surface p-0"
      >
        <table className="w-full min-w-[560px] text-left">
          <caption className="sr-only">
            {commissionPage.addOnSectionTitle}
          </caption>
          <thead className="border-b border-border bg-surface-raised">
            <tr>
              <th className="hud-label px-5 py-3 text-muted" scope="col">
                {commissionPage.addOnNameLabel}
              </th>
              <th
                className="hud-label px-5 py-3 text-right text-muted"
                scope="col"
              >
                {commissionPage.addOnFeeLabel}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {addOns.map((addOn) => (
              <tr className="align-top transition-colors hover:bg-surface-alt" key={addOn.name}>
                <th className="px-5 py-4 font-normal" scope="row">
                  <span className="block font-heading text-base font-semibold text-text">
                    {addOn.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">
                    {addOn.description}
                  </span>
                </th>
                <td className="whitespace-nowrap px-5 py-4 text-right font-mono text-sm font-bold text-primary">
                  {addOn.fee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HudPanel>

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
