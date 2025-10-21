import { useEffect, useState } from "react";
import { getWorkspaces, createWorkspace } from "@/services/workspaceService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FolderPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Workspace {
  _id: string;
  name: string;
  description?: string;
}

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const fetchWorkspaces = async () => {
    try {
      const data = await getWorkspaces();
      setWorkspaces(data);
    } catch {
      toast.error("Failed to load workspaces");
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) return toast.warning("Workspace name is required");
    try {
      await createWorkspace({ name, description });
      toast.success("Workspace created!");
      setOpen(false);
      setName("");
      setDescription("");
      fetchWorkspaces();
    } catch (err: any) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to create workspace");
      } else if (err.response) {
        toast.error(err.response.data.message || "Failed to create workspace");
      }
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Workspaces</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
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
              <Button onClick={handleCreate}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {workspaces.length === 0 ? (
        <p className="text-muted-foreground">No workspaces found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((ws) => (
            <Card key={ws._id} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{ws.name}</CardTitle>
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
