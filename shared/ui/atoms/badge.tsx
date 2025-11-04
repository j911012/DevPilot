import { cn } from "@/shared/lib/cn";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "primary" | "success" | "warning" | "danger";
};

export const Badge = ({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) => {
  const base =
    "inline-flex items-center rounded-[calc(var(--radius)-2px)] px-2 py-0.5 text-[11px] font-medium";
  const tones = {
    neutral: "bg-black/5 text-black/80 dark:bg-white/10 dark:text-white/80",
    primary: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
    success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    warning: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    danger: "bg-red-500/15 text-red-700 dark:text-red-300",
  }[tone];

  return <span className={cn(base, tones, className)} {...props} />;
};
