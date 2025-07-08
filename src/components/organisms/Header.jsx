import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-primary/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ApperIcon name="Rocket" className="text-white" size={24} />
            </motion.div>
            <div>
              <h1 className="text-xl font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                WebRoad Quest
              </h1>
              <p className="text-xs text-gray-600 font-body">
                Gamified Development Roadmap
              </p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ApperIcon name="Plus" size={18} className="inline mr-2" />
              New Project
            </motion.button>
          </nav>
          
          <button className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors">
            <ApperIcon name="Menu" size={20} />
          </button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header