import React from "react";
import Error from "@/components/ui/Error";
// Achievement definitions with unlocking criteria
const achievements = [
  {
    Id: 1,
    name: "First Steps",
    description: "Create your first project",
    icon: "Rocket",
    variant: "bronze",
    category: "milestone",
    requirement: { type: "projects_created", count: 1 }
  },
  {
    Id: 2,
    name: "Task Master",
    description: "Complete 10 tasks",
    icon: "CheckCircle",
    variant: "bronze",
    category: "tasks",
    requirement: { type: "tasks_completed", count: 10 }
  },
  {
    Id: 3,
    name: "Level Crusher",
    description: "Complete your first level",
    icon: "Trophy",
    variant: "silver",
    category: "levels",
    requirement: { type: "levels_completed", count: 1 }
  },
  {
    Id: 4,
    name: "Project Pioneer",
    description: "Complete your first project",
    icon: "Crown",
    variant: "gold",
    category: "milestone",
    requirement: { type: "projects_completed", count: 1 }
  },
  {
    Id: 5,
    name: "Speed Demon",
    description: "Complete 5 tasks in one day",
    icon: "Zap",
    variant: "silver",
    category: "speed",
    requirement: { type: "tasks_completed_daily", count: 5 }
  },
  {
    Id: 6,
    name: "Multi-Tasker",
    description: "Manage 3 active projects",
    icon: "Layers",
    variant: "silver",
    category: "milestone",
    requirement: { type: "active_projects", count: 3 }
  },
  {
    Id: 7,
    name: "Consistency King",
    description: "Complete tasks for 7 consecutive days",
    icon: "Calendar",
    variant: "gold",
    category: "consistency",
    requirement: { type: "consecutive_days", count: 7 }
  },
  {
    Id: 8,
    name: "Level Legend",
    description: "Complete 10 levels",
    icon: "Star",
    variant: "gold",
    category: "levels",
    requirement: { type: "levels_completed", count: 10 }
  },
  {
    Id: 9,
    name: "Task Tsunami",
    description: "Complete 100 tasks",
    icon: "Target",
    variant: "diamond",
    category: "tasks",
    requirement: { type: "tasks_completed", count: 100 }
  },
  {
    Id: 10,
    name: "Project Perfectionist",
    description: "Complete 5 projects",
    icon: "Award",
    variant: "diamond",
    category: "milestone",
    requirement: { type: "projects_completed", count: 5 }
  },
  {
    Id: 11,
    name: "Lightning Fast",
    description: "Complete a level in under 3 days",
    icon: "Flame",
    variant: "gold",
    category: "speed",
    requirement: { type: "level_completion_time", days: 3 }
  },
  {
    Id: 12,
    name: "Ultimate Champion",
    description: "Earn all other achievements",
    icon: "Diamond",
    variant: "diamond",
    category: "meta",
    requirement: { type: "all_achievements", count: 11 }
  }
]

class AchievementService {
  constructor() {
    this.achievements = [...achievements]
    this.tableName = 'achievement'
    this.apperClient = null
    // Mock user achievement data - in real app this would come from user profile
    this.userAchievements = JSON.parse(localStorage.getItem('userAchievements') || '[]')
    this.initializeClient()
  }

  initializeClient() {
    try {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    } catch (error) {
      console.error('Failed to initialize ApperClient:', error);
    }
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description" } },
          { field: { Name: "icon" } },
          { field: { Name: "variant" } },
          { field: { Name: "category" } },
          { field: { Name: "requirement_type" } },
          { field: { Name: "requirement_count" } },
          { field: { Name: "is_earned" } },
          { field: { Name: "progress" } },
          { field: { Name: "current_value" } },
          { field: { Name: "target_value" } }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        // Fall back to hardcoded achievements if database is not available
        return [...this.achievements];
      }
      
      // Transform database data to match expected format
      return (response.data || []).map(achievement => ({
        Id: achievement.Id,
        name: achievement.Name,
        description: achievement.description,
        icon: achievement.icon,
        variant: achievement.variant,
        category: achievement.category,
        requirement: {
          type: achievement.requirement_type,
          count: achievement.requirement_count
        },
        isEarned: achievement.is_earned,
        progress: achievement.progress,
        currentValue: achievement.current_value,
        targetValue: achievement.target_value
      }));
    } catch (error) {
      console.error("Error fetching achievements:", error);
      // Fall back to hardcoded achievements
      return [...this.achievements];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description" } },
          { field: { Name: "icon" } },
          { field: { Name: "variant" } },
          { field: { Name: "category" } },
          { field: { Name: "requirement_type" } },
          { field: { Name: "requirement_count" } },
          { field: { Name: "is_earned" } },
          { field: { Name: "progress" } },
          { field: { Name: "current_value" } },
          { field: { Name: "target_value" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        // Fall back to hardcoded achievement
        const achievement = this.achievements.find(a => a.Id === id);
        if (!achievement) {
          throw new Error('Achievement not found');
        }
        return { ...achievement };
      }
      
      if (!response.data) {
        throw new Error('Achievement not found');
      }
      
      // Transform database data to match expected format
      const achievement = response.data;
      return {
        Id: achievement.Id,
        name: achievement.Name,
        description: achievement.description,
        icon: achievement.icon,
        variant: achievement.variant,
        category: achievement.category,
        requirement: {
          type: achievement.requirement_type,
          count: achievement.requirement_count
        },
        isEarned: achievement.is_earned,
        progress: achievement.progress,
        currentValue: achievement.current_value,
        targetValue: achievement.target_value
      };
    } catch (error) {
      console.error(`Error fetching achievement with ID ${id}:`, error);
// Fall back to hardcoded achievement
      const achievement = this.achievements.find(a => a.Id === id);
      if (!achievement) {
        throw new Error('Achievement not found');
      }
      return { ...achievement };
    }
  }
  async getEarnedAchievements() {
    await this.delay()
    return [...this.userAchievements]
  }

  async checkAchievements(projects) {
    await this.delay()
    const newAchievements = []
    const stats = this.calculateStats(projects)
    
    for (const achievement of this.achievements) {
      if (this.isAchievementEarned(achievement.Id)) continue
      
      if (this.checkRequirement(achievement.requirement, stats)) {
        this.unlockAchievement(achievement.Id)
        newAchievements.push({ ...achievement })
      }
    }
    
    return newAchievements
  }

  calculateStats(projects) {
    const allTasks = projects.flatMap(p => p.tasks)
    const completedTasks = allTasks.filter(t => t.status === 'complete')
    const completedProjects = projects.filter(p => {
      const projectTasks = p.tasks
      return projectTasks.length > 0 && projectTasks.every(t => t.status === 'complete')
    })
    
    const completedLevels = projects.reduce((acc, project) => {
      const levels = [1,2,3,4,5,6].filter(level => {
        const levelTasks = project.tasks.filter(t => t.level === level)
        return levelTasks.length > 0 && levelTasks.every(t => t.status === 'complete')
      })
      return acc + levels.length
    }, 0)

    return {
      projects_created: projects.length,
      tasks_completed: completedTasks.length,
      levels_completed: completedLevels,
      projects_completed: completedProjects.length,
      active_projects: projects.filter(p => p.tasks.some(t => t.status !== 'complete')).length,
      tasks_completed_daily: this.getTodaysCompletedTasks(completedTasks),
      consecutive_days: this.getConsecutiveDays(completedTasks),
      all_achievements: this.userAchievements.length
    }
  }

  getTodaysCompletedTasks(completedTasks) {
    // Mock implementation - in real app would check actual completion dates
    return Math.floor(Math.random() * 8) // Random for demo
  }

  getConsecutiveDays(completedTasks) {
    // Mock implementation - in real app would analyze completion dates
    return Math.floor(Math.random() * 10) // Random for demo
  }

  checkRequirement(requirement, stats) {
    switch (requirement.type) {
      case 'projects_created':
      case 'tasks_completed':
      case 'levels_completed':
      case 'projects_completed':
      case 'active_projects':
      case 'tasks_completed_daily':
      case 'consecutive_days':
      case 'all_achievements':
        return stats[requirement.type] >= requirement.count
      case 'level_completion_time':
        // Mock implementation - in real app would check actual completion times
        return Math.random() > 0.7 // Random chance for demo
      default:
        return false
    }
  }

  isAchievementEarned(achievementId) {
    return this.userAchievements.some(ua => ua.achievementId === achievementId)
  }

  unlockAchievement(achievementId) {
    if (!this.isAchievementEarned(achievementId)) {
      const newUserAchievement = {
        achievementId: achievementId,
        earnedAt: new Date().toISOString()
      }
      this.userAchievements.push(newUserAchievement)
      localStorage.setItem('userAchievements', JSON.stringify(this.userAchievements))
    }
  }

  async getAchievementProgress(projects) {
    await this.delay()
    const stats = this.calculateStats(projects)
    
    return this.achievements.map(achievement => {
      const isEarned = this.isAchievementEarned(achievement.Id)
      let progress = 0
      
      if (!isEarned) {
        const req = achievement.requirement
        if (req.count) {
          progress = Math.min((stats[req.type] || 0) / req.count, 1)
        }
      }
      
      return {
        ...achievement,
        isEarned,
        progress: isEarned ? 1 : progress,
        currentValue: stats[achievement.requirement.type] || 0,
        targetValue: achievement.requirement.count || 1
      }
    })
  }
}

export default new AchievementService()