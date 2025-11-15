import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkspaces, createWorkspace } from "@/services/workspaceService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FolderPlus, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

interface Workspace {
  _id: string;
  name: string;
  description?: string;
}

export default function WorkspaceList() {
  const [loading, setLoading] = useState(true);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const data = await getWorkspaces();
      setWorkspaces(data);
    } catch {
      toast.error("Failed to load workspaces");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.warning("Workspace name is required");
      return;
    }

    try {
      // Your createWorkspace service should return the workspace object
      const data = await createWorkspace({ name, description });

      // Check if we got a valid workspace back (has _id)
      if (data && data._id) {
        toast.success("Workspace created!");
        setOpen(false);
        setName("");
        setDescription("");
        await fetchWorkspaces();
      } else {
        // If no _id, something went wrong
        throw new Error("Failed to create workspace");
      }
    } catch (err: any) {
      console.error("Error creating workspace:", err);
      toast.error(err.message || "Failed to create workspace");
    }
  };

  const handleWorkspaceClick = (workspaceId: string) => {
    navigate(`/workspaces/${workspaceId}/projects`);
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {/* Breadcrumb */}
      <DynamicBreadcrumb />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Workspaces</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 cursor-pointer">
              <FolderPlus size={18} /> New Workspace
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Workspace Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button className="cursor-pointer" onClick={handleCreate}>
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Workspaces Grid */}
      {loading ? (
        // 🔥 Skeleton Loader
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </Card>
          ))}
        </div>
      ) : workspaces.length === 0 ? (
        // ❌ No workspaces
        <p className="text-muted-foreground">No workspaces found.</p>
      ) : (
        // ✅ Real data
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((ws) => (
            <Card
              key={ws._id}
              className="hover:shadow-lg transition cursor-pointer group"
              onClick={() => handleWorkspaceClick(ws._id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {ws.name}
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {ws.description || "No description provided."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
