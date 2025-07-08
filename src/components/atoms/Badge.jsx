import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'

const Badge = forwardRef(({ className, variant = 'default', icon, ...props }, ref) => {
  const variants = {
    default: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    info: 'bg-info/10 text-info',
    bronze: 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md',
    silver: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md',
    gold: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md',
    diamond: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
  }

return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium gap-1',
        variants[variant],
        className
      )}
      {...props}
    >
      {icon && <ApperIcon name={icon} size={14} />}
      {props.children}
    </span>
  )
})

Badge.displayName = 'Badge'

export default Badge