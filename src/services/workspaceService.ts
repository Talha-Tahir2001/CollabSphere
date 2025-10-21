import API from "@/lib/axiosInstance";


export const createWorkspace = async (data: { name: string; description?: string }) => {
  const response = await API.post("/workspaces", data);
  return response.data;
};

export const getWorkspaces = async () => {
  const response = await API.get("/workspaces");
  return response.data;
};
