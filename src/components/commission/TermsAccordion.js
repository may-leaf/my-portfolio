import { Check, ChevronDown, Info, X } from "lucide-react";
import { termsSections } from "@/data/pricing";

export default function TermsAccordion() {
  return (
    <div className="space-y-3">
      {termsSections.map((section, index) => (
        <details
          className="group scroll-mt-28 rounded-card border border-border bg-surface open:border-primary/40"
          id={section.id}
          key={section.id}
          name="terms"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 sm:p-6">
            <span className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="mt-0.5 font-heading text-sm font-bold text-primary"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-heading text-lg font-bold leading-tight">
                  {section.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">
                  {section.intro}
                </span>
              </span>
            </span>
            <ChevronDown
              aria-hidden="true"
              className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
            />
          </summary>

          <div className="border-t border-border p-5 sm:p-6">
            {section.draw ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-card border border-border bg-bg/40 p-4">
                  <h4 className="flex items-center gap-2 font-heading text-base font-semibold">
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 text-primary"
                    />
                    {section.drawTitle}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {section.draw.map((item) => (
                      <li
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                        key={item}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-card border border-border bg-bg/40 p-4">
                  <h4 className="flex items-center gap-2 font-heading text-base font-semibold">
                    <X aria-hidden="true" className="h-4 w-4 text-muted" />
                    {section.dontDrawTitle}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {section.dontDraw.map((item) => (
                      <li
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                        key={item}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-border"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {section.note ? (
              <p className="mt-4 flex items-start gap-2 rounded-card border border-primary/20 bg-primary-soft px-4 py-3 text-sm leading-relaxed text-text">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                />
                {section.note}
              </p>
            ) : null}

            {section.groups ? (
              <div className="space-y-6">
                {section.groups.map((group) => (
                  <div key={group.title}>
                    <h4 className="font-heading text-sm font-bold uppercase tracking-[0.08em] text-primary">
                      {group.title}
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {group.items.map((item) => (
                        <li
                          className="flex gap-3 text-sm leading-relaxed text-muted"
                          key={item}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {group.formulas ? (
                      <div className="mt-3 space-y-2 rounded-card border border-border bg-bg/50 p-4">
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
