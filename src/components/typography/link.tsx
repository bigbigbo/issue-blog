import { forwardRef } from "react";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/style";

const linkVariants = cva("transition-colors duration-200", {
  variants: {
    variant: {
      default:
        "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-4 hover:underline",
      subtle: "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400",
      button:
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:text-gray-50 dark:hover:bg-blue-700 h-10 px-4 py-2",
    },
    underline: {
      always: "underline underline-offset-4",
      hover: "no-underline hover:underline underline-offset-4",
      none: "no-underline",
    },
  },
  defaultVariants: {
    variant: "default",
    underline: "hover",
  },
});

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
    VariantProps<typeof linkVariants> {
  children: React.ReactNode;
  external?: boolean;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, underline, className, children, external, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, underline }), className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = "Typography.Link";

export default Link;
