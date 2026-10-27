import Button from "@/components/Button";
import SocialLinks from "@/components/SocialLinks";
import { commissionPage } from "@/data/pricing";
import { socialLinks } from "@/data/socials";
import { getContactUrl } from "@/lib/contact";

export default function CommissionContact() {
  const contactHref = getContactUrl() || socialLinks[0].href;

  return (
    <section
      aria-labelledby="contact-title"
      className="relative scroll-mt-28 overflow-hidden rounded-card border border-primary/30 bg-surface p-6 sm:p-8"
      id="contact"
    >
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-soft blur-2xl"
      />

      <div className="relative">
        <h2
          className="font-heading text-[1.75rem] font-bold leading-tight"
          id="contact-title"
        >
          {commissionPage.contactSectionTitle}
        </h2>

        <p className="mt-3 max-w-xl text-base leading-[1.7] text-muted">
          {commissionPage.contactNote}
        </p>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            className="w-full sm:w-auto"
            href={contactHref}
            variant="primary"
          >
            {commissionPage.contactLabel}
          </Button>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
