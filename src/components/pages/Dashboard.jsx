import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProjectService from '@/services/api/ProjectService'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ProjectCard from '@/components/molecules/ProjectCard'
import NewProjectModal from '@/components/organisms/NewProjectModal'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const Dashboard = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ProjectService.getAll()
      setProjects(data)
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await ProjectService.create(projectData)
      setProjects(prev => [...prev, newProject])
      setShowNewProjectModal(false)
      toast.success('Project created successfully!')
    } catch (err) {
      toast.error('Failed to create project')
    }
  }

  const handleDeleteProject = async (projectId) => {
    try {
      await ProjectService.delete(projectId)
      setProjects(prev => prev.filter(p => p.Id !== projectId))
      toast.success('Project deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete project')
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadProjects} />
  if (projects.length === 0) return <Empty onAction={() => setShowNewProjectModal(true)} />

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-display bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
          Welcome to WebRoad Quest
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Transform your website development journey into an engaging adventure. 
          Track progress, earn achievements, and collaborate with your team.
        </p>
        <Button 
          onClick={() => setShowNewProjectModal(true)}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Start New Quest
        </Button>
      </motion.div>

      {/* Stats Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-r from-primary/10 to-primary/20 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-xl">
              <ApperIcon name="FolderOpen" size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{projects.length}</p>
              <p className="text-gray-600">Active Projects</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-secondary/10 to-secondary/20 border-secondary/20">
          <div className="flex items-center gap-4">
            <div className="bg-secondary/20 p-3 rounded-xl">
              <ApperIcon name="CheckCircle" size={24} className="text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">
                {projects.reduce((acc, project) => acc + project.tasks.filter(t => t.status === 'complete').length, 0)}
              </p>
              <p className="text-gray-600">Tasks Completed</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-accent/10 to-accent/20 border-accent/20">
          <div className="flex items-center gap-4">
            <div className="bg-accent/20 p-3 rounded-xl">
              <ApperIcon name="Trophy" size={24} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">
                {projects.reduce((acc, project) => {
                  const completedLevels = [1,2,3,4,5,6].filter(level => {
                    const levelTasks = project.tasks.filter(t => t.level === level)
                    return levelTasks.length > 0 && levelTasks.every(t => t.status === 'complete')
                  })
                  return acc + completedLevels.length
                }, 0)}
              </p>
              <p className="text-gray-600">Levels Completed</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display text-gray-800">Your Quests</h2>
          <Button 
            onClick={() => setShowNewProjectModal(true)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <ApperIcon name="Plus" size={18} className="mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard 
                project={project} 
                onDelete={handleDeleteProject}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <NewProjectModal 
          onClose={() => setShowNewProjectModal(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </div>
  )
}

export default Dashboard