import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ onAction }) => {
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
          className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-full w-32 h-32 flex items-center justify-center mx-auto"
        >
          <ApperIcon name="Rocket" size={48} className="text-primary" />
        </motion.div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Ready to Start Your Quest?
          </h3>
          <p className="text-gray-600 text-lg">
            Create your first project and begin your website development journey. 
            Turn complex tasks into an engaging adventure!
          </p>
        </div>
        
        <Button
          onClick={onAction}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Start Your First Quest
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-center">
          <div className="space-y-2">
            <div className="bg-success/20 p-3 rounded-lg w-fit mx-auto">
              <ApperIcon name="Target" size={20} className="text-success" />
            </div>
            <p className="text-sm text-gray-600">Track Progress</p>
          </div>
          <div className="space-y-2">
            <div className="bg-warning/20 p-3 rounded-lg w-fit mx-auto">
              <ApperIcon name="Users" size={20} className="text-warning" />
            </div>
            <p className="text-sm text-gray-600">Collaborate</p>
          </div>
          <div className="space-y-2">
            <div className="bg-info/20 p-3 rounded-lg w-fit mx-auto">
              <ApperIcon name="Trophy" size={20} className="text-info" />
            </div>
            <p className="text-sm text-gray-600">Earn Rewards</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Empty