import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackLink({ href = "/", children = "Back to home" }) {
  return (
    <Link
      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary"
      href={href}
    >
      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      {children}
    </Link>
  );
}
