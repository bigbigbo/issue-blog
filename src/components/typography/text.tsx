import { createElement, forwardRef } from "react";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/style";

const textVariants = cva("text-base leading-normal", {
  variants: {
    variant: {
      default: "text-gray-900 dark:text-gray-100",
      primary: "text-blue-600 dark:text-blue-400",
      secondary: "text-gray-500 dark:text-gray-400",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      danger: "text-red-600 dark:text-red-400",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    weight: "normal",
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "span" | "strong" | "em" | "mark" | "code" | "del" | "ins";
  children: React.ReactNode;
}

const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ as = "span", className, variant, size, weight, children, ...props }, ref) => {
    return createElement(
      as,
      {
        ref,
        className: cn(textVariants({ variant, size, weight }), className),
        ...props,
      },
      children,
    );
  },
);

Text.displayName = "Typography.Text";

export default Text;
