
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "gradient-primary text-primary-foreground hover:shadow-lg hover:glow-primary hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg",
        outline: "border-2 border-input bg-transparent hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "gradient-primary text-primary-foreground hover:glow-primary hover:scale-105 font-bold text-base shadow-xl",
        defi: "gradient-defi text-defi-foreground hover:glow-defi hover:scale-105 font-semibold shadow-lg",
        gaming: "gradient-gaming text-gaming-foreground hover:glow-gaming hover:scale-105 font-semibold shadow-lg",
        nft: "gradient-nft text-nft-foreground hover:glow-nft hover:scale-105 font-semibold shadow-lg",
        governance: "gradient-governance text-governance-foreground hover:shadow-lg hover:scale-105 font-semibold",
        wallet: "glass-effect border-2 border-accent/50 text-accent hover:bg-accent/20 hover:border-accent hover:glow-primary backdrop-blur-md font-semibold",
        premium: "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white hover:shadow-2xl hover:scale-105 font-bold",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11",
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
