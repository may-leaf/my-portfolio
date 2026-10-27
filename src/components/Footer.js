import Link from "next/link";
import { footer, navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="font-heading text-lg font-bold">{profile.nameEn}</p>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {footer.tagline}
          </p>
          <p className="text-xs text-muted">
            © {currentYear} {profile.nameEn}. {footer.note}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="inline-flex min-h-11 min-w-11 items-center text-sm font-semibold text-muted transition-colors hover:text-primary"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
