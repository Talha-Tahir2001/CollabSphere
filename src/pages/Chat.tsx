import { useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

let socket: Socket;

export default function Chat() {
  const [roomId, setRoomId] = useState("68f2904610e4edce88fba835"); // real workspace _id
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  // 🔑 Get JWT from localStorage
  const token = localStorage.getItem("token");

  // 🧠 Axios instance with Authorization header
  const axiosAuth = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    // Connect to Socket.IO server
    socket = io("http://localhost:5000", { transports: ["websocket"] });

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
  }, [roomId]);

  // ✅ Send message
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await axiosAuth.post("/messages", {
        workspaceId: roomId,
        receiverId: "68f2042f382236d410f303c9", // example receiver
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
              <b>{msg.sender?.username || "User"}:</b> {msg.content || msg.message}
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
