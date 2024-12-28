import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const linkVariants = cva("", {
  variants: {
    variant: {
      default: "",
      nav: "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all hover:after:w-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface LinkProps
  extends ComponentPropsWithoutRef<"a">,
    VariantProps<typeof linkVariants> {}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
Link.displayName = "Link";

export { Link };