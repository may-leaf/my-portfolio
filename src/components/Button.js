import Link from "next/link";

const variants = {
  primary:
    "border border-primary bg-primary text-primary-ink hover:border-primary-hover hover:bg-primary-hover",
  secondary:
    "border border-border bg-surface text-text hover:border-primary hover:text-primary hover:shadow-glow",
  ghost:
    "border border-transparent bg-transparent text-muted hover:text-primary",
  danger:
    "border border-danger/30 bg-danger/10 text-danger hover:bg-danger/20",
};

const sizes = {
  default: "min-h-11 px-6 py-3 text-base",
  sm: "min-h-11 px-4 py-2 text-sm",
};

function getButtonClasses({ variant = "secondary", size = "default", className = "" }) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-pill font-semibold leading-none",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200",
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
