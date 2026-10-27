import HudPanel from "@/components/HudPanel";
import Button from "@/components/Button";
import CornerBrackets from "@/components/CornerBrackets";
import SocialLinks from "@/components/SocialLinks";
import { commissionPage } from "@/data/pricing";
import { socialLinks } from "@/data/socials";
import { getContactUrl } from "@/lib/contact";

export default function CommissionContact() {
  const contactHref = getContactUrl() || socialLinks[0].href;

  return (
    <HudPanel
      as="section"
      aria-labelledby="contact-title"
      className="scroll-mt-28"
      id="contact"
      innerClassName="relative overflow-hidden p-6 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="hud-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-surface via-surface/80 to-transparent"
      />
      <CornerBrackets className="inset-5" />

      <div className="relative">
        <p className="hud-label text-primary">{"// Open channel"}</p>
        <h2
          className="mt-3 font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold uppercase leading-tight"
          id="contact-title"
        >
          {commissionPage.contactSectionTitle}
        </h2>

        <p className="mt-3 max-w-xl text-base leading-[1.7] text-muted">
          {commissionPage.contactNote}
        </p>

        <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            className="w-full sm:w-auto"
            href={contactHref}
            variant="primary"
          >
            {commissionPage.contactLabel}
            <span aria-hidden="true">{"//"}</span>
          </Button>
          <SocialLinks align="start" />
        </div>
      </div>
    </HudPanel>
  );
}
