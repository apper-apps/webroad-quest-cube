import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-error/20 to-error/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto"
        >
          <ApperIcon name="AlertCircle" size={40} className="text-error" />
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
          >
            <ApperIcon name="RefreshCw" size={18} className="mr-2" />
            Try Again
          </Button>
        )}
      </motion.div>
    </div>
  )
}

export default Error