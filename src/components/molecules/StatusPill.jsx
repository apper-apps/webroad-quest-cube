import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const StatusPill = ({ status, onClick }) => {
  const statusConfig = {
    pending: { icon: '🔴', label: 'Pending', color: 'bg-gray-100 text-gray-700' },
    working: { icon: '🟡', label: 'Working', color: 'bg-warning/20 text-warning' },
    complete: { icon: '🟢', label: 'Complete', color: 'bg-success/20 text-success' }
  }

  const config = statusConfig[status]

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105',
        config.color
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {config.icon}
      </motion.span>
      {config.label}
    </motion.button>
  )
}

export default StatusPill