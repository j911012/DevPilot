import { cn } from "@/shared/lib/cn";
import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-[var(--radius)] border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none ring-0 focus:border-black/30 dark:focus:border-white/40",
        className
      )}
      {...props}
    />
  );
});
