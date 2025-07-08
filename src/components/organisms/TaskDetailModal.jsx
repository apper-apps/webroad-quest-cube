import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import FormField from '@/components/molecules/FormField'
import StatusPill from '@/components/molecules/StatusPill'
import TaskService from '@/services/api/TaskService'

const TaskDetailModal = ({ task, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    assignedTo: task.assigned_to || task.assignedTo || '',
    dueDate: task.due_date ? format(new Date(task.due_date), 'yyyy-MM-dd') : (task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : ''),
    notes: task.notes || ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const updates = {
        assigned_to: formData.assignedTo,
        due_date: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        notes: formData.notes
      }
      await TaskService.update(task.id, updates)
      toast.success('Task updated successfully!')
      onUpdate() // Call parent update to refresh data
      onClose()
    } catch (error) {
      toast.error('Failed to update task')
    } finally {
      setLoading(false)
    }
  }
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

const handleStatusChange = async (newStatus) => {
    try {
      await TaskService.updateStatus(task.id, newStatus)
      toast.success('Task status updated!')
      onUpdate() // Call parent update to refresh data
      onClose()
    } catch (error) {
      toast.error('Failed to update task status')
    }
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
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <Card className="bg-background">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold">
                  {task.id}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {task.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Level {task.level} Task
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>

            {/* Status */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <div className="flex gap-2">
                {['pending', 'working', 'complete'].map(status => (
                  <StatusPill
                    key={status}
                    status={status}
                    onClick={() => handleStatusChange(status)}
                  />
                ))}
              </div>
            </div>

            {/* Form */}
<form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Assigned To"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                placeholder="Enter assignee name"
                disabled={loading}
              />
              
              <FormField
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                disabled={loading}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any notes or comments..."
                  disabled={loading}
                  className="w-full h-24 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none disabled:opacity-50"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Save" size={18} className="mr-2" />
                      Save Changes
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

export default TaskDetailModal