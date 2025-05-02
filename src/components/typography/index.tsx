"use client";

import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ReactNode, createElement, forwardRef } from "react";

// Text组件的样式变体
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

// Title组件的样式变体
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
    colorScheme: {
      default: "text-gray-900 dark:text-gray-100",
      primary: "text-blue-600 dark:text-blue-400",
      secondary: "text-gray-700 dark:text-gray-300",
      accent: "text-indigo-600 dark:text-indigo-400",
    },
  },
  defaultVariants: {
    level: 3,
    align: "left",
    colorScheme: "default",
  },
});

// Paragraph组件的样式变体
const paragraphVariants = cva("max-w-prose leading-relaxed", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    colorScheme: {
      default: "text-gray-700 dark:text-gray-300",
      muted: "text-gray-500 dark:text-gray-400",
      accent: "text-indigo-600 dark:text-indigo-400",
    },
  },
  defaultVariants: {
    size: "md",
    colorScheme: "default",
  },
});

// Link组件的样式变体
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

// Text组件的Props类型
interface TextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, VariantProps<typeof textVariants> {
  as?: "span" | "strong" | "em" | "mark" | "code" | "del" | "ins";
  children: ReactNode;
}

// Text组件
const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ as = "span", className, variant, size, weight, children, ...props }, ref) => {
    return createElement(
      as,
      {
        ref,
        className: clsx(textVariants({ variant, size, weight }), className),
        ...props,
      },
      children,
    );
  },
);
Text.displayName = "Typography.Text";

// Title组件的Props类型
interface TitleProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof titleVariants> {
  children: ReactNode;
}

// Title组件
const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ level = 3, align, colorScheme, className, children, ...props }, ref) => {
    const Heading = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    return createElement(
      Heading,
      {
        ref,
        className: clsx(titleVariants({ level, align, colorScheme }), className),
        ...props,
      },
      children,
    );
  },
);
Title.displayName = "Typography.Title";

// Paragraph组件的Props类型
interface ParagraphProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof paragraphVariants> {
  children: ReactNode;
}

// Paragraph组件
const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ size, colorScheme, className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={clsx(paragraphVariants({ size, colorScheme }), className)} {...props}>
        {children}
      </p>
    );
  },
);
Paragraph.displayName = "Typography.Paragraph";

// Link组件的Props类型
interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
    VariantProps<typeof linkVariants> {
  children: ReactNode;
  external?: boolean;
}

// Link组件
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, underline, className, children, external, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={clsx(linkVariants({ variant, underline }), className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
);
Link.displayName = "Typography.Link";

// Typography主组件
const Typography = {
  Text,
  Title,
  Paragraph,
  Link,
};

export { Typography };
export type { LinkProps, ParagraphProps, TextProps, TitleProps };
