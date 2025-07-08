import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { AuthContext } from '../../App'

const Header = () => {
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);

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
            {isAuthenticated && (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstName || user?.name || 'User'}
                </span>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-error text-error hover:bg-error hover:text-white"
                >
                  <ApperIcon name="LogOut" size={18} className="mr-2" />
                  Logout
                </Button>
              </>
            )}
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