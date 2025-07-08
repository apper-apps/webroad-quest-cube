class TaskService {
  constructor() {
    this.tableName = 'task'
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
          { field: { Name: "assigned_to" } },
          { field: { Name: "status" } },
          { field: { Name: "due_date" } },
          { field: { Name: "level" } },
          { field: { Name: "notes" } },
          { 
            field: { Name: "project" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [
          {
            fieldName: "level",
            sorttype: "ASC"
          },
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Transform data to match expected format
      return (response.data || []).map(task => ({
        id: task.Id,
        name: task.Name,
        assigned_to: task.assigned_to || '',
        assignedTo: task.assigned_to || '', // Backward compatibility
        status: task.status || 'pending',
        due_date: task.due_date,
        dueDate: task.due_date, // Backward compatibility
        level: task.level || 1,
        notes: task.notes || '',
        project: task.project ? {
          id: task.project.Id,
          name: task.project.Name
        } : null
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "assigned_to" } },
          { field: { Name: "status" } },
          { field: { Name: "due_date" } },
          { field: { Name: "level" } },
          { field: { Name: "notes" } },
          { 
            field: { Name: "project" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (!response.data) {
        throw new Error('Task not found');
      }
      
      // Transform data to match expected format
      const task = response.data;
      return {
        id: task.Id,
        name: task.Name,
        assigned_to: task.assigned_to || '',
        assignedTo: task.assigned_to || '', // Backward compatibility
        status: task.status || 'pending',
        due_date: task.due_date,
        dueDate: task.due_date, // Backward compatibility
        level: task.level || 1,
        notes: task.notes || '',
        project: task.project ? {
          id: task.project.Id,
          name: task.project.Name
        } : null
      };
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      throw error;
    }
  }

  async getByProject(projectId) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "assigned_to" } },
          { field: { Name: "status" } },
          { field: { Name: "due_date" } },
          { field: { Name: "level" } },
          { field: { Name: "notes" } },
          { 
            field: { Name: "project" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          {
            FieldName: "project",
            Operator: "EqualTo",
            Values: [projectId]
          }
        ],
        orderBy: [
          {
            fieldName: "level",
            sorttype: "ASC"
          },
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Transform data to match expected format
      return (response.data || []).map(task => ({
        id: task.Id,
        name: task.Name,
        assigned_to: task.assigned_to || '',
        assignedTo: task.assigned_to || '', // Backward compatibility
        status: task.status || 'pending',
        due_date: task.due_date,
        dueDate: task.due_date, // Backward compatibility
        level: task.level || 1,
        notes: task.notes || '',
        project: task.project ? {
          id: task.project.Id,
          name: task.project.Name
        } : null
      }));
    } catch (error) {
      console.error(`Error fetching tasks for project ${projectId}:`, error);
      throw error;
    }
  }

  async create(taskData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Name: taskData.name,
            assigned_to: taskData.assigned_to || taskData.assignedTo || '',
            status: taskData.status || 'pending',
            due_date: taskData.due_date || taskData.dueDate || null,
            level: taskData.level || 1,
            notes: taskData.notes || '',
            project: taskData.projectId || taskData.project
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
          throw new Error('Failed to create task');
        }
        
        if (successfulRecords.length > 0) {
          const newTask = successfulRecords[0].data;
          return {
            id: newTask.Id,
            name: newTask.Name,
            assigned_to: newTask.assigned_to || '',
            assignedTo: newTask.assigned_to || '', // Backward compatibility
            status: newTask.status || 'pending',
            due_date: newTask.due_date,
            dueDate: newTask.due_date, // Backward compatibility
            level: newTask.level || 1,
            notes: newTask.notes || '',
            project: newTask.project
          };
        }
      }
      
      throw new Error('No task was created');
    } catch (error) {
      console.error("Error creating task:", error);
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
            ...(updates.name && { Name: updates.name }),
            ...(updates.assigned_to !== undefined && { assigned_to: updates.assigned_to }),
            ...(updates.assignedTo !== undefined && { assigned_to: updates.assignedTo }),
            ...(updates.status && { status: updates.status }),
            ...(updates.due_date !== undefined && { due_date: updates.due_date }),
            ...(updates.dueDate !== undefined && { due_date: updates.dueDate }),
            ...(updates.level !== undefined && { level: updates.level }),
            ...(updates.notes !== undefined && { notes: updates.notes }),
            ...(updates.project !== undefined && { project: updates.project })
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
          throw new Error('Failed to update task');
        }
        
        if (successfulUpdates.length > 0) {
          const updatedTask = successfulUpdates[0].data;
          return {
            id: updatedTask.Id,
            name: updatedTask.Name,
            assigned_to: updatedTask.assigned_to || '',
            assignedTo: updatedTask.assigned_to || '', // Backward compatibility
            status: updatedTask.status || 'pending',
            due_date: updatedTask.due_date,
            dueDate: updatedTask.due_date, // Backward compatibility
            level: updatedTask.level || 1,
            notes: updatedTask.notes || '',
            project: updatedTask.project
          };
        }
      }
      
      throw new Error('No task was updated');
    } catch (error) {
      console.error("Error updating task:", error);
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
          throw new Error('Failed to delete task');
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  async updateStatus(id, status) {
    return this.update(id, { status });
  }
}

export default new TaskService()