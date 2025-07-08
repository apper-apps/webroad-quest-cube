import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="space-y-8 w-full max-w-4xl">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg animate-pulse w-1/3" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
        </div>
        
        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="bg-surface rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-surface rounded-xl p-6 space-y-4"
              >
                <div className="h-5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </div>
                <div className="h-2 bg-gray-200 rounded-full animate-pulse" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading