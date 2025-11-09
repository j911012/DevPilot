import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full min-h-[88px] rounded-[var(--radius)] border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm outline-none focus:border-black/30 dark:focus:border-white/40",
        className
      )}
      {...props}
    />
  );
});
