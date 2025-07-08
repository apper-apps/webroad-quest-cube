import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Card = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-surface rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export default Card