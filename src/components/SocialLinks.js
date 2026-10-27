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

export default function SocialLinks({ align = "center" }) {
  const contactHref = getContactHref();
  const links = [...socialLinks, { ...contactLink, href: contactHref }];

  return (
    <ul
      className={[
        "flex items-center gap-2",
        align === "left" ? "justify-start" : "justify-center",
      ].join(" ")}
    >
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        const isWebLink = /^https?:/.test(link.href);
        const isEmailLink = /^mailto:/.test(link.href);
        const className =
          "hud-btn hud-btn--secondary inline-flex h-11 w-11 items-center justify-center p-0 text-muted hover:bg-primary hover:text-primary-ink";

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
                <Icon aria-hidden="true" className="h-5 w-5" />
              </a>
            ) : (
              <Link
                aria-label={link.label}
                className={className}
                href={link.href}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
