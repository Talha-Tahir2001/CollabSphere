import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasksByProject, createTask, updateTask, deleteTask, type Task } from "@/services/taskService";
import { getProjectsByWorkspace } from "@/services/projectService";
import { getWorkspaces } from "@/services/workspaceService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Plus, Loader2, Calendar, Trash2, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TaskList() {
  const { workspaceId, projectId } = useParams<{ workspaceId: string; projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Todo" | "In Progress" | "Done">("Todo");
  const [dueDate, setDueDate] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingTasks, setFetchingTasks] = useState(true);

  const fetchData = async () => {
    if (!workspaceId || !projectId) return;

    setFetchingTasks(true);
    try {
      const workspaces = await getWorkspaces();
      const currentWorkspace = workspaces.find(ws => ws._id === workspaceId);
      if (currentWorkspace) {
        setWorkspaceName(currentWorkspace.name);
      }

      const projects = await getProjectsByWorkspace(workspaceId);
      const currentProject = projects.find(p => p._id === projectId);
      if (currentProject) {
        setProjectName(currentProject.name);
      }

      const tasksData = await getTasksByProject(workspaceId, projectId);
      setTasks(tasksData);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error(error.message || "Failed to load tasks");
    } finally {
      setFetchingTasks(false);
    }
  };

  const handleCreateTask = async () => {
    if (!title.trim()) {
      toast.warning("Task title is required");
      return;
    }

    if (!workspaceId || !projectId) {
      toast.error("Workspace or Project ID is missing");
      return;
    }

    setLoading(true);
    try {
      await createTask(workspaceId, projectId, {
        title,
        description,
        status,
        dueDate: dueDate || undefined,
      });

      toast.success("Task created!");
      setOpen(false);
      setTitle("");
      setDescription("");
      setStatus("Todo");
      setDueDate("");

      await fetchData();
    } catch (error: any) {
      console.error("Error creating task:", error);
      toast.error(error.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    if (!workspaceId || !projectId) return;

    try {
      let progress = 0;
      if (newStatus === "In Progress") progress = 50;
      if (newStatus === "Done") progress = 100;

      await updateTask(workspaceId, projectId, taskId, {
        status: newStatus as "Todo" | "In Progress" | "Done",
        progress,
      });

      toast.success("Task updated!");
      await fetchData();
    } catch (error: any) {
      console.error("Error updating task:", error);
      toast.error(error.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!workspaceId || !projectId) return;

    try {
      await deleteTask(workspaceId, projectId, taskId);
      toast.success("Task deleted!");
      await fetchData();
    } catch (error: any) {
      console.error("Error deleting task:", error);
      toast.error(error.message || "Failed to delete task");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Todo":
        return "bg-slate-500";
      case "In Progress":
        return "bg-blue-500";
      case "Done":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    fetchData();
  }, [workspaceId, projectId]);

  if (fetchingTasks) {
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
      <DynamicBreadcrumb workspaceName={workspaceName} projectName={projectName} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{projectName}</h1>
          <p className="text-muted-foreground">Tasks in this project</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 cursor-pointer">
              <Plus size={18} /> New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
              <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
              <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todo">Todo</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={loading}
              />
              <Button className="cursor-pointer" onClick={handleCreateTask} disabled={loading}>
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

      {tasks.length === 0 ? (
        <Card className="p-12 text-center">
          <CardContent>
            <p className="text-muted-foreground mb-4">
              No tasks found. Create your first task!
            </p>
            <Button className="cursor-pointer" onClick={() => setOpen(true)} variant="outline">
              <Plus size={18} className="mr-2" />
              Create Task
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task._id} className="hover:shadow-md transition">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {task.title}
                      {task.status === "Done" && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </CardTitle>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-destructive hover:text-destructive cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Select
                      value={task.status}
                      onValueChange={(value) => handleStatusChange(task._id, value)}
                    >
                      <SelectTrigger className="w-[140px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Todo">Todo</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {task.dueDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}