import NextLink from "next/link";
import { clsx } from "clsx";
import type { MouseEvent, ReactNode } from "react";

type Variant = "accent" | "brand";

export default function ActionPill({
  href,
  onClick,
  children,
  ariaLabel,
  variant = "accent",
  className,
  icon,
}: {
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  ariaLabel?: string;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
}) {
  const base =
    "rounded-full border px-3 py-1.5 text-xs transition-transform hover:-translate-y-0.5 text-foreground";
  const accent = "border-accent/30 bg-accent/15 hover:bg-accent/25";
  const brand =
    "border-brand/30 bg-brand/15 hover:bg-brand/25 inline-flex items-center gap-2";
  const styles = clsx(base, variant === "brand" ? brand : accent, className);

  if (href) {
    return (
      <NextLink href={href} aria-label={ariaLabel} className={styles}>
        {icon}
        {children}
      </NextLink>
    );
  }
  return (
    <button onClick={onClick} aria-label={ariaLabel} className={styles}>
      {icon}
      {children}
    </button>
  );
}
