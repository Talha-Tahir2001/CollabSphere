const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "Todo" | "In Progress" | "Done";
  progress: number;
  assignedTo?: string;
  project: string;
  workspace: string;
  createdBy: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateTaskData {
  title: string;
  description?: string;
  status?: "Todo" | "In Progress" | "Done";
  assignedTo?: string;
  dueDate?: string;
}

export const getTasksByProject = async (
  workspaceId: string,
  projectId: string
): Promise<Task[]> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(
    `${API_URL}/workspaces/${workspaceId}/projects/${projectId}/tasks`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch tasks");
  }

  return response.json();
};

export const createTask = async (
  workspaceId: string,
  projectId: string,
  data: CreateTaskData
): Promise<Task> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(
    `${API_URL}/workspaces/${workspaceId}/projects/${projectId}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create task");
  }

  return response.json();
};

export const updateTask = async (
  workspaceId: string,
  projectId: string,
  taskId: string,
  data: Partial<CreateTaskData & { progress: number }>
): Promise<Task> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(
    `${API_URL}/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update task");
  }

  return response.json();
};

export const deleteTask = async (
  workspaceId: string,
  projectId: string,
  taskId: string
): Promise<void> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(
    `${API_URL}/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete task");
  }
};