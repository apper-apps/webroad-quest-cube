import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import TaskDetailModal from "@/components/organisms/TaskDetailModal";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import LevelCard from "@/components/molecules/LevelCard";
import AchievementService from "@/services/api/AchievementService";
import ProjectService from "@/services/api/ProjectService";

const ProjectDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useSelector((state) => state.user);
const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [recentAchievements, setRecentAchievements] = useState([]);
const loadProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProjectService.getById(parseInt(id));
      setProject(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
    loadProject();
  }, [id]);
const handleTaskUpdate = async (taskId, updates) => {
    try {
      const updatedProject = await ProjectService.updateTask(parseInt(id), taskId, updates);
      setProject(updatedProject);
      setSelectedTask(null);
      toast.success('Task updated successfully!');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };
const handleStatusChange = async (taskId, status) => {
    try {
      const updatedProject = await ProjectService.updateTaskStatus(parseInt(id), taskId, status);
      setProject(updatedProject);
      toast.success('Task status updated!');
      
      // Check for new achievements when task status changes
      if (status === 'complete') {
        const allProjects = await ProjectService.getAll();
        const newAchievements = await AchievementService.checkAchievements(allProjects);
if (newAchievements.length > 0) {
          setRecentAchievements(newAchievements);
          newAchievements.forEach(achievement => {
            toast.success(`🏆 Achievement Unlocked: ${achievement.name}!`);
          });
          // Clear recent achievements after 5 seconds
          setTimeout(() => setRecentAchievements([]), 5000);
        }
      }
    } catch (err) {
      toast.error('Failed to update task status');
    }
  };
if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProject} />;
  if (!project) return <Error message="Project not found" onRetry={loadProject} />;
  const levels = [
    { number: 1, name: 'Research & Planning', description: 'Initial research and content strategy' },
    { number: 2, name: 'WordPress Setup', description: 'Initial WordPress configuration and setup' },
    { number: 3, name: 'Design & Content', description: 'Website design and content implementation' },
    { number: 4, name: 'Domain & Hosting', description: 'Domain setup and hosting configuration' },
    { number: 5, name: 'SEO & Performance', description: 'Search engine optimization and site performance' },
{ number: 6, name: 'Off-page SEO & Backlinks', description: 'Social media setup and link building' }
  ];

const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(t => t.status === 'complete').length;
  const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  return (
    <div className="space-y-8">
      {/* Recent Achievements Celebration */}
      {recentAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className="fixed top-4 right-4 z-50 space-y-2"
        >
          {recentAchievements.map((achievement) => (
            <motion.div
              key={achievement.Id}
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="bg-white rounded-lg shadow-lg border-2 border-primary/20 p-4 max-w-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  achievement.variant === 'bronze' ? 'bg-gradient-to-r from-amber-600 to-amber-700'
                    : achievement.variant === 'silver' ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                    : achievement.variant === 'gold' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                }`}>
                  <ApperIcon name={achievement.icon} size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-800">Achievement Unlocked!</p>
                  <p className="text-xs text-gray-600">{achievement.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Project Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <Link 
            to="/"
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <ApperIcon name="ArrowLeft" size={20} />
          </Link>
          <div className="flex-1">
<h1 className="text-3xl font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {project.name}
            </h1>
            <p className="text-gray-600">
              Created {project.createdAt ? format(new Date(project.createdAt), 'PPP') : 'Recently'}
            </p>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="bg-gradient-to-r from-surface to-background border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Overall Progress</h3>
              <span className="text-2xl font-bold text-primary">
                {Math.round(overallProgress)}%
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-success">
                  {project.tasks.filter(t => t.status === 'complete').length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">
                  {project.tasks.filter(t => t.status === 'working').length}
                </p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-500">
                  {project.tasks.filter(t => t.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Level Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display text-gray-800">Quest Levels</h2>
        <div className="space-y-4">
          {levels.map((level, index) => (
            <motion.div
              key={level.number}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <LevelCard
                level={level}
                tasks={project.tasks.filter(t => t.level === level.number)}
                onTaskClick={setSelectedTask}
                onStatusChange={handleStatusChange}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}
</div>
  );
};

export default ProjectDetail;