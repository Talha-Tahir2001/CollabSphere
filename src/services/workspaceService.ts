// import API from "@/lib/axiosInstance";
const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";
interface CreateWorkspaceData {
  name: string;
  description?: string;
}

interface Workspace {
  _id: string;
  name: string;
  description?: string;
  owner: string;
  members: string[];
  createdAt: string;
}
export const createWorkspace = async (data: CreateWorkspaceData): Promise<Workspace> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/workspaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create workspace");
  }

  return response.json();
};

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/workspaces`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch workspaces");
  }

  return response.json();
};
