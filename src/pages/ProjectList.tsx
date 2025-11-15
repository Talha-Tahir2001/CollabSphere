import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectsByWorkspace, type Project } from "@/services/projectService";
import { getWorkspaces } from "@/services/workspaceService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FolderPlus, ArrowRight, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";

export default function ProjectList() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingProjects, setFetchingProjects] = useState(true);
  const navigate = useNavigate();

  const fetchWorkspaceAndProjects = async () => {
    if (!workspaceId) return;

    setFetchingProjects(true);
    try {
      // Fetch workspace details to get the name
      const workspaces = await getWorkspaces();
      const currentWorkspace = workspaces.find(ws => ws._id === workspaceId);
      
      if (currentWorkspace) {
        setWorkspaceName(currentWorkspace.name);
      }

      // Fetch projects for this workspace
      const projectsData = await getProjectsByWorkspace(workspaceId);
      setProjects(projectsData);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error(error.message || "Failed to load projects");
    } finally {
      setFetchingProjects(false);
    }
  };

  const handleCreateProject = async () => {
    if (!name.trim()) {
      toast.warning("Project name is required");
      return;
    }

    if (!workspaceId) {
      toast.error("Workspace ID is missing");
      return;
    }

    setLoading(true);
    try {
      // const newProject = await createProject(workspaceId, { name, description });
      
      toast.success("Project created!");
      setOpen(false);
      setName("");
      setDescription("");
      
      // Refresh projects list
      await fetchWorkspaceAndProjects();
    } catch (error: any) {
      console.error("Error creating project:", error);
      toast.error(error.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/workspaces/${workspaceId}/projects/${projectId}/tasks`);
  };

  useEffect(() => {
    fetchWorkspaceAndProjects();
  }, [workspaceId]);

  if (fetchingProjects) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      {/* Breadcrumb */}
      <DynamicBreadcrumb workspaceName={workspaceName} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{workspaceName}</h1>
          <p className="text-muted-foreground">Projects in this workspace</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 cursor-pointer">
              <FolderPlus size={18} /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
              <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
              <Button className="cursor-pointer" onClick={handleCreateProject} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card className="p-12 text-center">
          <CardContent>
            <p className="text-muted-foreground mb-4">
              No projects found. Create your first project!
            </p>
            <Button className="cursor-pointer" onClick={() => setOpen(true)} variant="outline">
              <FolderPlus size={18} className="mr-2" />
              Create Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="hover:shadow-lg transition cursor-pointer group"
              onClick={() => handleProjectClick(project._id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {project.name}
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </CardTitle>
                <CardDescription>
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description || "No description provided."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}