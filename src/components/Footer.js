import { ArrowUp } from "lucide-react";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import { footer, navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_auto]">
          <div>
            <p className="hud-label text-primary">{"// End of transmission"}</p>
            <p className="mt-4 font-heading text-2xl font-bold normal-case">
              {profile.name}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
              {footer.tagline}
            </p>
            <p className="mt-3 max-w-sm font-mono text-[0.7rem] leading-relaxed text-muted">
              {footer.note}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="hud-label text-muted">Directory</p>
            <ul className="mt-4 space-y-1">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    className="hud-link inline-flex min-h-9 items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-text transition-colors hover:text-primary"
                    href={link.href}
                  >
                    <span className="text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="hud-label text-muted">Channels</p>
            <div className="mt-4">
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            © {currentYear} {profile.name} {"//"} ありがとう for visiting
          </p>

          <a
            className="hud-link inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-primary"
            href="#top"
          >
            <ArrowUp aria-hidden="true" className="h-4 w-4" />
            Top
          </a>
        </div>
      </div>
    </footer>
  );
}
