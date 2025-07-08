import mockProjects from '@/services/mockData/projects.json'

// Default task template for new projects
const defaultTasks = [
  { id: 1, name: "Niche Research", level: 1 },
  { id: 2, name: "Content Coverage", level: 1 },
  { id: 3, name: "Main Article Writing (100% Human Written)", level: 1 },
  { id: 4, name: "Other Articles Writing (100% Human Written)", level: 1 },
  { id: 5, name: "Pantheon WordPress Installation", level: 2 },
  { id: 6, name: "Discourage Search Engine", level: 2 },
  { id: 7, name: "Delete Existing Posts, Pages, Themes and Plugins", level: 2 },
  { id: 8, name: "Install Necessary Plugins and Themes", level: 2 },
  { id: 9, name: "Website Design - (Main Article + Header and Footer)", level: 3 },
  { id: 10, name: "Other Articles Designing", level: 3 },
  { id: 11, name: "Interlinking + External Linking", level: 3 },
  { id: 12, name: "Download Link Setup and Placement", level: 3 },
  { id: 13, name: "Legal Pages Creation", level: 3 },
  { id: 14, name: "Domain Purchase", level: 4 },
  { id: 15, name: "Hosting Purchase", level: 4 },
  { id: 16, name: "Gmail Create on Domain Name", level: 4 },
  { id: 17, name: "Cloudflare Setup", level: 4 },
  { id: 18, name: "WordPress Installation on Main Domain", level: 4 },
  { id: 19, name: "Migration Pantheon To Hosting & Uncheck Discourage Option ASAP", level: 4 },
  { id: 20, name: "RankMath SEO Settings", level: 5 },
  { id: 21, name: "Schema Settings", level: 5 },
  { id: 22, name: "Speed Optimization LiteSpeed + Perfmatters", level: 5 },
  { id: 23, name: "Enable Auto Update For All Plugins and Theme", level: 5 },
  { id: 24, name: "Serp inn Setup for Ranking Track", level: 5 },
  { id: 25, name: "Social Media Accounts Setup", level: 6 },
  { id: 26, name: "Social Sharing of All Posts", level: 6 },
  { id: 27, name: "Foundation Backlinks", level: 6 },
  { id: 28, name: "Nandla Strategy", level: 6 },
  { id: 29, name: "Competitor Analysis + Reverse Engineering", level: 6 },
  { id: 30, name: "Niche Edits + Guest Post Links", level: 6 }
]

class ProjectService {
  constructor() {
    this.projects = [...mockProjects]
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.projects]
  }

  async getById(id) {
    await this.delay()
    const project = this.projects.find(p => p.Id === id)
    if (!project) {
      throw new Error('Project not found')
    }
    return { ...project }
  }

  async create(projectData) {
    await this.delay()
    const newId = Math.max(...this.projects.map(p => p.Id), 0) + 1
    
    const tasks = defaultTasks.map(task => ({
      ...task,
      assignedTo: '',
      status: 'pending',
      dueDate: null,
      notes: ''
    }))

    const newProject = {
      Id: newId,
      name: projectData.name,
      description: projectData.description || '',
      createdAt: new Date().toISOString(),
      tasks
    }

    this.projects.push(newProject)
    return { ...newProject }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.projects.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }

    this.projects[index] = { ...this.projects[index], ...updates }
    return { ...this.projects[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.projects.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }

    this.projects.splice(index, 1)
    return true
  }

  async updateTask(projectId, taskId, updates) {
    await this.delay()
    const project = this.projects.find(p => p.Id === projectId)
    if (!project) {
      throw new Error('Project not found')
    }

    const taskIndex = project.tasks.findIndex(t => t.id === taskId)
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }

    project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...updates }
    return { ...project }
  }

  async updateTaskStatus(projectId, taskId, status) {
    return this.updateTask(projectId, taskId, { status })
  }
}

export default new ProjectService()