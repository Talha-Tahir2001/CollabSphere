import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

interface Message {
  _id: string;
  content: string;
  sender: {
    _id: string;
    username: string;
    email: string;
  };
  receiver?: {
    _id: string;
    username: string;
  };
  workspace: string;
  createdAt: string;
}

let socket: Socket;

export default function Chat() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!workspaceId || !token) return;

    // Connect to Socket.IO server
    socket = io(API_URL, {
      transports: ["websocket"],
      auth: { token },
    });

    // Join workspace room
    socket.emit("joinRoom", workspaceId);
    console.log(`📡 Joined room: ${workspaceId}`);

    // Fetch existing messages
    fetchMessages();

    // Listen for real-time messages
    socket.on("receiveMessage", (data: Message) => {
      console.log("📨 Received message:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
      console.log("🔌 Disconnected from socket");
    };
  }, [workspaceId, token]);

  const fetchMessages = async () => {
    if (!workspaceId) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/workspaces/${workspaceId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data);

      // Also fetch workspace name
      const wsResponse = await fetch(`${API_URL}/api/workspaces`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const workspaces = await wsResponse.json();
      const currentWs = workspaces.find((ws: any) => ws._id === workspaceId);
      if (currentWs) {
        setWorkspaceName(currentWs.name);
      }
    } catch (err: any) {
      console.error("Failed to load messages:", err);
      toast.error(err.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !workspaceId) return;

    setSending(true);
    try {
      const response = await fetch(`${API_URL}/api/workspaces/${workspaceId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      await response.json();

      // Emit socket event
      socket.emit("sendMessage", {
        roomId: workspaceId,
        senderId: currentUser._id || currentUser.id,
        message: message,
      });

      setMessage("");
    } catch (err: any) {
      console.error("Failed to send message:", err);
      toast.error(err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
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
      <DynamicBreadcrumb workspaceName={workspaceName} />

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>💬 {workspaceName} Chat</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages Area */}
          <ScrollArea className="h-[500px] border rounded-md p-4 mb-4">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No messages yet. Start the conversation!
              </p>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isCurrentUser = msg.sender._id === (currentUser._id || currentUser.id);
                  return (
                    <div
                      key={msg._id}
                      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          isCurrentUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {!isCurrentUser && (
                          <p className="text-xs font-semibold mb-1">
                            {msg.sender.username}
                          </p>
                        )}
                        <p className="text-sm break-words">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              disabled={sending}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={sending || !message.trim()}>
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}