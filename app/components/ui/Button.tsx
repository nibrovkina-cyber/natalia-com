import { cva, type VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 transition-[background,color,transform] duration-200 cursor-pointer no-underline whitespace-nowrap font-medium tracking-tight",
  {
    variants: {
      variant: {
        primary: "bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]",
        accent: "bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-95",
        ghost: "bg-transparent text-[var(--ink)] border border-[var(--hairline)] hover:border-[var(--ink)]",
        link: "bg-transparent text-[var(--ink)] border-b border-[var(--ink)] rounded-none px-0 hover:text-[var(--accent)] hover:border-[var(--accent)]",
      },
      size: {
        sm: "text-sm px-4 py-2.5",
        md: "text-[15px] px-[22px] py-[14px]",
        lg: "text-base px-6 py-4",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "primary", size: "md", block: false },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function Button({
  as: Tag = "button",
  variant,
  size,
  block,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <Tag className={cn(buttonVariants({ variant, size, block }), className)} {...rest}>
      {children}
    </Tag>
  );
}
