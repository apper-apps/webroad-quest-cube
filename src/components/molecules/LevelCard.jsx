import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import StatusPill from '@/components/molecules/StatusPill'
import TaskRow from '@/components/molecules/TaskRow'

const LevelCard = ({ level, tasks, onTaskClick, onStatusChange }) => {
  const completedTasks = tasks.filter(t => t.status === 'complete').length
  const totalTasks = tasks.length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  const isLevelComplete = totalTasks > 0 && completedTasks === totalTasks

  const levelColors = {
    1: 'from-blue-400 to-blue-600',
    2: 'from-green-400 to-green-600',
    3: 'from-yellow-400 to-yellow-600',
    4: 'from-orange-400 to-orange-600',
    5: 'from-red-400 to-red-600',
    6: 'from-purple-400 to-purple-600'
  }

  return (
    <Card className={`relative overflow-hidden ${isLevelComplete ? 'ring-2 ring-success' : ''}`}>
      {/* Level Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`bg-gradient-to-r ${levelColors[level.number]} p-3 rounded-xl text-white font-bold text-lg`}>
            {level.number}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {level.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {level.description}
            </p>
          </div>
        </div>
        
{isLevelComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-2"
          >
            <div className="bg-success/20 p-2 rounded-full">
              <ApperIcon name="Trophy" size={20} className="text-success" />
            </div>
            <Badge variant="gold" icon="Crown">
              Level Complete
            </Badge>
          </motion.div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Level Progress</span>
          <motion.div
            className={`bg-gradient-to-r ${levelColors[level.number]} h-full rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <TaskRow
              task={task}
              onClick={() => onTaskClick(task)}
              onStatusChange={onStatusChange}
            />
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

export default LevelCard