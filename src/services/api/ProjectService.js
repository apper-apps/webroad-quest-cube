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
    this.tableName = 'project'
    this.apperClient = null
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
          { field: { Name: "created_at" } },
          { field: { Name: "Tags" } }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Transform data to match expected format and add tasks
      return (response.data || []).map(project => ({
        Id: project.Id,
        name: project.Name,
        description: project.description || '',
        createdAt: project.created_at || new Date().toISOString(),
        tags: project.Tags || '',
        tasks: this.generateTasksForProject(project.Id)
      }));
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description" } },
          { field: { Name: "created_at" } },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (!response.data) {
        throw new Error('Project not found');
      }
      
      // Transform data to match expected format and add tasks
      const project = response.data;
      return {
        Id: project.Id,
        name: project.Name,
        description: project.description || '',
        createdAt: project.created_at || new Date().toISOString(),
        tags: project.Tags || '',
        tasks: this.generateTasksForProject(project.Id)
      };
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      throw error;
    }
  }

  async create(projectData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Name: projectData.name,
            description: projectData.description || '',
            created_at: new Date().toISOString(),
            Tags: projectData.tags || ''
          }
        ]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create project');
        }
        
        if (successfulRecords.length > 0) {
          const newProject = successfulRecords[0].data;
          return {
            Id: newProject.Id,
            name: newProject.Name,
            description: newProject.description || '',
            createdAt: newProject.created_at || new Date().toISOString(),
            tags: newProject.Tags || '',
            tasks: this.generateTasksForProject(newProject.Id)
          };
        }
      }
      
      throw new Error('No project was created');
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  async update(id, updates) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Id: id,
            Name: updates.name,
            description: updates.description,
            Tags: updates.tags
          }
        ]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error('Failed to update project');
        }
        
        if (successfulUpdates.length > 0) {
          const updatedProject = successfulUpdates[0].data;
          return {
            Id: updatedProject.Id,
            name: updatedProject.Name,
            description: updatedProject.description || '',
            createdAt: updatedProject.created_at || new Date().toISOString(),
            tags: updatedProject.Tags || '',
            tasks: this.generateTasksForProject(updatedProject.Id)
          };
        }
      }
      
      throw new Error('No project was updated');
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [id]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error('Failed to delete project');
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }

  // Helper method to generate tasks for a project (mock implementation)
  generateTasksForProject(projectId) {
    return defaultTasks.map(task => ({
      ...task,
      assignedTo: '',
      status: 'pending',
      dueDate: null,
      notes: ''
    }));
  }

  // Task management methods (mock implementation as tasks are not in separate database table)
  async updateTask(projectId, taskId, updates) {
    // Mock implementation - in real app, tasks would be stored in database
    const project = await this.getById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const taskIndex = project.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...updates };
    return project;
  }

  async updateTaskStatus(projectId, taskId, status) {
    return this.updateTask(projectId, taskId, { status });
  }
}

export default new ProjectService()