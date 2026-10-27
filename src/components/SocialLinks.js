import Link from "next/link";
import { Mail } from "lucide-react";
import FacebookIcon from "@/components/icons/FacebookIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import XIcon from "@/components/icons/XIcon";
import { contactLink, socialLinks } from "@/data/socials";
import { getContactHref } from "@/lib/contact";

const iconMap = {
  x: XIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  mail: Mail,
};

export default function SocialLinks() {
  const contactHref = getContactHref();
  const links = [
    ...socialLinks,
    { ...contactLink, href: contactHref },
  ];

  return (
    <ul className="flex items-center justify-center gap-3">
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        const isWebLink = /^https?:/.test(link.href);
        const isEmailLink = /^mailto:/.test(link.href);
        const className =
          "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:border-primary hover:bg-primary hover:text-primary-ink";

        return (
          <li key={link.id}>
            {isWebLink || isEmailLink ? (
              <a
                aria-label={link.label}
                className={className}
                href={link.href}
                rel={isWebLink ? "noreferrer noopener" : undefined}
                target={isWebLink ? "_blank" : undefined}
              >
                <Icon className="h-5 w-5" />
              </a>
            ) : (
              <Link aria-label={link.label} className={className} href={link.href}>
                <Icon className="h-5 w-5" />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
