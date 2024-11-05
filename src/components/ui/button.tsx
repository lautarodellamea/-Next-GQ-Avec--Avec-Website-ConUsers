import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // my customs variants
        avecBtnPrimary: "bg-avecBlueColor text-white shadow hover:bg-avecBlueColor/90",
        // avecHeroBtn: "bg-avecLightBlueColor w-[150px] sm:w-[180px] py-3 text-white shadow hover:bg-[#8bcbee] ",
        avecHeroBtn: "bg-avecBlueColor w-[150px] sm:w-[180px] py-3 text-white shadow hover:bg-[#202A51]",
        avecLinkSidebar: "bg-transparent text-black  hover:bg-gray-200 w-full",
        avecMenuClose: "bg-transparent text-slate-600 hover:bg-gray-200",
        avecMenuOpen: "bg-transparent text-white ",

      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",

        // avec-help-accordion
        avecHelpAccordion: "w-full p-2 bg-avecBlueColorDark text-white hover:bg-avecBlueColorDark/90",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
