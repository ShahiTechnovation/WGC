import { cn } from '@/lib/utils'

interface TagProps {
  label: string
  variant?: 'default' | 'accent' | 'success' | 'warning'
  size?: 'sm' | 'md'
  className?: string
}

export function Tag({ label, variant = 'default', size = 'sm', className }: TagProps) {
  const baseStyles = 'rounded-full font-medium inline-block'

  const sizeStyles = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
  }

  const variantStyles = {
    default: 'bg-bg-surface text-text-secondary border border-bg-border',
    accent: 'bg-accent-lime/10 text-accent-lime border border-accent-lime/30',
    success: 'bg-status-success/10 text-status-success border border-status-success/30',
    warning: 'bg-status-warning/10 text-status-warning border border-status-warning/30',
  }

  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
