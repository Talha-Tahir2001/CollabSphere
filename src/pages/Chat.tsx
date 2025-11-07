import { useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

let socket: Socket;
interface Message {
  id: number;
  content: string;
  sender: string;
  // Add more properties as needed
}

export default function Chat() {
  const [roomId] = useState(""); // real workspace _id
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // 🔑 Get JWT from localStorage
  const token = localStorage.getItem("token");

  // 🧠 Axios instance with Authorization header
  const axiosAuth = axios.create({
    baseURL: `import.meta.env.VITE_BASE_URL${'/'}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    // Connect to Socket.IO server
    socket = io(`import.meta.env.VITE_BASE_URL${'/'}`, { transports: ["websocket"] });

    // Join workspace room
    socket.emit("joinRoom", roomId);

    // ✅ Fetch messages from DB (authorized)
    const fetchMessages = async () => {
      try {
        const res = await axiosAuth.get(`/messages/${roomId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };
    fetchMessages();

    // ✅ Listen for real-time messages
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, axiosAuth]);

  // ✅ Send message
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await axiosAuth.post("/messages", {
        workspaceId: roomId,
        receiverId: "", // example receiver
        content: message,
      });

      // Emit socket event
      socket.emit("sendMessage", {
        roomId,
        senderId: res.data.sender._id,
        message,
      });

      setMessage("");
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto mt-10 p-4 border rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-3 text-center">💬 Authenticated Real-Time Chat</h2>

      {/* Chat Messages */}
      <div className="h-64 overflow-y-auto border rounded-md p-3 mb-3">
        {messages.length === 0 ? (
          <p className="text-center">No messages yet...</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="mb-2">
              <b>{msg.sender || "User"}:</b> {msg.content || msg.sender}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
