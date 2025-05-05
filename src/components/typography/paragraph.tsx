import { forwardRef } from "react";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/style";

const paragraphVariants = cva("max-w-prose leading-relaxed", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    color: {
      default: "text-gray-700 dark:text-gray-300",
      muted: "text-gray-500 dark:text-gray-400",
      accent: "text-indigo-600 dark:text-indigo-400",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

export interface ParagraphProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof paragraphVariants> {
  children: React.ReactNode;
}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ size, color, className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn(paragraphVariants({ size, color }), className)} {...props}>
        {children}
      </p>
    );
  },
);

Paragraph.displayName = "Typography.Paragraph";

export default Paragraph;
