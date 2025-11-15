import { useState } from "react";
import API from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid credentials");
      console.error("Failed to login:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-2xl bg-card shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <div className="space-y-4">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <a href="/auth/register" className="text-primary hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}
