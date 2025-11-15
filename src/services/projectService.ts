const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

export interface Project {
  _id: string;
  name: string;
  description?: string;
  workspace: string;
  createdBy: string;
  createdAt: string;
}

interface CreateProjectData {
  name: string;
  description?: string;
}

export const getProjectsByWorkspace = async (workspaceId: string): Promise<Project[]> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/workspaces/${workspaceId}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch projects");
  }

  return response.json();
};

// File: src/services/projectService.ts
// Add debug logs to your createProject function

export const createProject = async (
  workspaceId: string, 
  data: CreateProjectData
): Promise<Project> => {
  const token = localStorage.getItem("token");
  const url = `${API_URL}/workspaces/${workspaceId}/projects`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });


  if (!response.ok) {
    console.log("❌ Response not OK, reading error...");
    const errorData = await response.json();
    console.error("Error data:", errorData);
    throw new Error(errorData.message || "Failed to create project");
  }

  console.log("✅ Response OK, parsing JSON...");
  const result = await response.json();
  console.log("Project created:", result);
  return result;
};

export const getProjectById = async (
  workspaceId: string,
  projectId: string
): Promise<Project> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/workspaces/${workspaceId}/projects/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch project");
  }

  return response.json();
};

export const updateProject = async (
  workspaceId: string,
  projectId: string,
  data: Partial<CreateProjectData>
): Promise<Project> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/workspaces/${workspaceId}/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update project");
  }

  return response.json();
};

export const deleteProject = async (
  workspaceId: string,
  projectId: string
): Promise<void> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/workspaces/${workspaceId}/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete project");
  }
};