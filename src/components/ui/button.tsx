import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-brand-gradient text-ink shadow-orange hover:brightness-110 hover:shadow-raised",
        destructive:
          "bg-[#C0392B] text-white shadow-sm hover:bg-[#A93226]",
        outline:
          "border-[1.5px] border-ink bg-transparent text-ink hover:bg-ink hover:text-bg",
        secondary:
          "bg-bg-alt text-ink shadow-sm hover:bg-bg-alt/80",
        ghost:
          "hover:bg-ink/6 text-ink",
        link:
          "text-brand-orange-text underline-offset-4 hover:underline p-0",
        whatsapp:
          "bg-[#25D366] text-white hover:bg-[#1fbc58]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm:      "h-8 px-4 text-xs",
        lg:      "h-12 px-8 text-base",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
