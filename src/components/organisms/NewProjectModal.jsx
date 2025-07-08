import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import FormField from '@/components/molecules/FormField'

const NewProjectModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.name.trim()) {
      setLoading(true)
      try {
        await onSubmit(formData)
      } catch (error) {
        toast.error('Failed to create project')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <Card className="bg-background">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Start New Quest
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Project Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your project name"
                required
              />
              
              <FormField
                label="Description (Optional)"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of your project"
              />

              {/* Info */}
              <div className="bg-info/10 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <ApperIcon name="Info" size={20} className="text-info flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-info mb-1">What's included?</h4>
                    <p className="text-sm text-gray-600">
                      Your project will include all 30 essential tasks organized into 6 levels, 
                      from research and planning to SEO and backlink building.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
<Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <ApperIcon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Rocket" size={18} className="mr-2" />
                      Create Project
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default NewProjectModal