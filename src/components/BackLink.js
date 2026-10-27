import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackLink({ href = "/", children = "Back to home" }) {
  return (
    <Link
      className="hud-link inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-primary"
      href={href}
    >
      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      {children}
    </Link>
  );
}
