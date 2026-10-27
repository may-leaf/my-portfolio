import { Check, ChevronDown, Info, X } from "lucide-react";
import { termsSections } from "@/data/pricing";

function ProtocolList({ items, mark = "plus" }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li
          className="flex gap-3 text-sm leading-relaxed text-muted"
          key={item}
        >
          <span
            aria-hidden="true"
            className={[
              "mt-2 h-1.5 w-1.5 shrink-0",
              mark === "plus" ? "bg-primary" : "bg-border-strong",
            ].join(" ")}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function TermsAccordion() {
  return (
    <div className="space-y-3">
      {termsSections.map((section, index) => (
        <details
          className="hud-details group scroll-mt-28 bg-border hud-frame open:bg-primary"
          id={section.id}
          key={section.id}
          name="terms"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 bg-surface p-5 sm:p-6">
            <span className="flex items-start gap-4">
              <span className="hud-label mt-1 shrink-0 text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-heading text-lg font-bold uppercase leading-tight">
                  {section.title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">
                  {section.intro}
                </span>
              </span>
            </span>
            <ChevronDown
              aria-hidden="true"
              className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180 group-open:text-primary"
            />
          </summary>

          <div className="hud-details__content border-t border-border bg-surface p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="hud-label text-muted">
                {"// Protocol "}
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-border" />
            </div>

            {section.draw ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border border-border bg-bg/40 p-4">
                  <h4 className="flex items-center gap-2 font-heading text-base font-semibold uppercase">
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 text-primary"
                    />
                    {section.drawTitle}
                  </h4>
                  <ProtocolList items={section.draw} />
                </div>

                <div className="border border-border bg-bg/40 p-4">
                  <h4 className="flex items-center gap-2 font-heading text-base font-semibold uppercase">
                    <X aria-hidden="true" className="h-4 w-4 text-muted" />
                    {section.dontDrawTitle}
                  </h4>
                  <ProtocolList items={section.dontDraw} mark="minus" />
                </div>
              </div>
            ) : null}

            {section.note ? (
              <p className="mt-4 flex items-start gap-2 border border-primary/30 bg-primary-soft px-4 py-3 text-sm leading-relaxed text-text">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                />
                {section.note}
              </p>
            ) : null}

            {section.groups ? (
              <div className="space-y-7">
                {section.groups.map((group, groupIndex) => (
                  <div key={group.title}>
                    <h4 className="hud-label flex items-center gap-3 text-primary">
                      <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                      <span aria-hidden="true" className="h-px w-4 bg-primary" />
                      {group.title}
                    </h4>
                    <ProtocolList items={group.items} />

                    {group.formulas ? (
                      <div className="mt-4 space-y-2 border-l-2 border-primary bg-bg/60 py-3 pl-4">
                        {group.formulas.map((formula) => (
                          <code
                            className="block font-mono text-xs leading-relaxed text-text sm:text-sm"
                            key={formula}
                          >
                            {formula}
                          </code>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
