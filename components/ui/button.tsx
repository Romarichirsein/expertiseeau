import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

const variants = {
  default: "bg-foreground text-background hover:bg-foreground/90",
  destructive: "bg-red-500 text-white hover:bg-red-500/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
  premium: "bg-gradient-to-r from-[#0369a1] to-[#0d9488] text-white shadow-lg hover:shadow-xl hover:brightness-110 font-outfit font-bold tracking-wide uppercase",
}

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
}

export function buttonVariants({ variant = "default", size = "default", className = "" }: { variant?: keyof typeof variants, size?: keyof typeof sizes, className?: string } = {}) {
  return cn(baseStyles, variants[variant], sizes[size], className)
}

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        whileHover={{ scale: variant === 'premium' ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
