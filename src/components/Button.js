import Link from "next/link";

const variants = {
  primary: "hud-btn hud-btn--primary",
  secondary: "hud-btn hud-btn--secondary",
  ghost: "hud-btn hud-btn--ghost",
  danger: "hud-btn hud-btn--danger",
};

const sizes = {
  default: "min-h-11 px-6 py-3 text-sm",
  sm: "min-h-11 px-4 py-2 text-xs",
};

function getButtonClasses({
  variant = "secondary",
  size = "default",
  className = "",
}) {
  return [
    "inline-flex items-center justify-center gap-2 font-heading font-semibold uppercase leading-none tracking-[0.08em]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Button({
  href,
  variant = "secondary",
  size = "default",
  className = "",
  children,
  ...props
}) {
  const classes = getButtonClasses({ variant, size, className });

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);

    if (external) {
      return (
        <a className={classes} href={href} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link className={classes} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
