import { cn } from "@/shared/lib/cn";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "sm" | "md";
};

export const Button = ({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-[var(--radius)] font-medium transition-colors";
  const sizes = size === "sm" ? "h-8 px-3 text-sm" : "h-10 px-4 text-sm";
  const variants =
    variant === "outline"
      ? "border border-black/10 dark:border-white/20 hover:bg-black/[.04] dark:hover:bg-white/[.06]"
      : "bg-foreground text-background hover:opacity-90";

  return <button className={cn(base, sizes, variants, className)} {...props} />;
};
