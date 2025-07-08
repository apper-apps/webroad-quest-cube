import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import StatusPill from '@/components/molecules/StatusPill'

const TaskRow = ({ task, onClick, onStatusChange }) => {
  const statusCycle = { pending: 'working', working: 'complete', complete: 'pending' }
  
  const handleStatusClick = (e) => {
    e.stopPropagation()
    const nextStatus = statusCycle[task.status]
    onStatusChange(task.id, nextStatus)
  }

  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
      onClick={onClick}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
            {task.id}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm">
              {task.name}
            </h4>
            {task.assignedTo && (
              <p className="text-xs text-gray-500 mt-1">
                Assigned to: {task.assignedTo}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <div className="text-xs text-gray-500">
              {format(new Date(task.dueDate), 'MMM d')}
            </div>
          )}
          <StatusPill status={task.status} onClick={handleStatusClick} />
          <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
        </div>
      </div>
    </motion.div>
  )
}

export default TaskRow