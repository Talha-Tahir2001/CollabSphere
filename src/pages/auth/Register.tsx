import { useState } from "react";



import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import API from "@/lib/axiosInstance";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Admin" | "Member">("Member");

  const handleRegister = async (e: React.FormEvent) => {
    
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { username, email, password, role });
      console.log("Registered:", res.data);
      // Optionally auto-login after registration
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Registration successful! Please log in.");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-xl shadow-md bg-card text-card-foreground">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <div className="flex flex-col gap-4">
        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Select value={role} onValueChange={(val: "Admin" | "Member") => setRole(val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Member">Member</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectContent>
        </Select>

        <Button className="cursor-pointer" onClick={handleRegister}>Register</Button>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="/auth/login" className="text-primary hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
