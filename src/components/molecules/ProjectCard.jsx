import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'

const ProjectCard = ({ project, onDelete }) => {
  const totalTasks = project.tasks.length
  const completedTasks = project.tasks.filter(t => t.status === 'complete').length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const completedLevels = [1,2,3,4,5,6].filter(level => {
    const levelTasks = project.tasks.filter(t => t.level === level)
    return levelTasks.length > 0 && levelTasks.every(t => t.status === 'complete')
  }).length

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
<p className="text-sm text-gray-500">
              {project.createdAt ? format(new Date(project.createdAt), 'MMM d, yyyy') : 'Recently'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(project.Id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:bg-error/10"
            >
              <ApperIcon name="Trash2" size={16} />
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-success/10 rounded-lg p-2">
            <p className="text-lg font-bold text-success">{completedTasks}</p>
            <p className="text-xs text-gray-600">Done</p>
          </div>
          <div className="bg-warning/10 rounded-lg p-2">
            <p className="text-lg font-bold text-warning">
              {project.tasks.filter(t => t.status === 'working').length}
            </p>
            <p className="text-xs text-gray-600">Working</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-2">
            <p className="text-lg font-bold text-primary">{completedLevels}</p>
            <p className="text-xs text-gray-600">Levels</p>
          </div>
        </div>

        {/* Action */}
        <Link to={`/project/${project.Id}`} className="block">
          <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
            <ApperIcon name="Play" size={16} className="mr-2" />
            Continue Quest
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default ProjectCard