import { createElement, forwardRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/style";

const titleVariants = cva("font-bold tracking-tight", {
  variants: {
    level: {
      1: "text-4xl md:text-5xl",
      2: "text-3xl md:text-4xl",
      3: "text-2xl md:text-3xl",
      4: "text-xl md:text-2xl",
      5: "text-lg md:text-xl",
      6: "text-base md:text-lg",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      default: "text-gray-900 dark:text-gray-100",
      primary: "text-blue-600 dark:text-blue-400",
      secondary: "text-gray-700 dark:text-gray-300",
      accent: "text-indigo-600 dark:text-indigo-400",
    },
  },
  defaultVariants: {
    level: 3,
    align: "left",
    color: "default",
  },
});

export interface TitleProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof titleVariants> {
  children: React.ReactNode;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ level = 3, align, color, className, children, ...props }, ref) => {
    const Heading = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    return createElement(
      Heading,
      {
        ref,
        className: cn(titleVariants({ level, align, color }), className),
        ...props,
      },
      children,
    );
  },
);

Title.displayName = "Typography.Title";

export default Title;
