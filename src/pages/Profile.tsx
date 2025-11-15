import { useEffect, useState } from "react";
import API from "@/lib/axiosInstance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Shield, Camera } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
  id?: string;
  username: string;
  email: string;
  role: "Admin" | "Member" | string;
  avatar?: string | null;
}

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile");
      setUser(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setAvatarPreview(res.data.avatar ? res.data.avatar : null);
    } catch (err) {
      toast.error("Failed to load profile");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setAvatarFile(file || null);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await API.put("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated");
      setUser(res.data.user);
      if (res.data.user.avatar) setAvatarPreview(res.data.user.avatar);
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      {loading ? (
        <Skeleton className="h-6 w-1/2 mb-4" />
      ) : (
        <div className="max-w-xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  <User size={22} /> Profile
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <img
                      alt=""
                      src={
                        avatarPreview ||
                        "https://ui-avatars.com/api/?name=" + user.username
                      }
                      className="w-28 h-28 rounded-full object-cover border shadow"
                    />
                    <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer hover:opacity-80">
                      <Camera size={16} />
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-2 rounded-md">
                  <Shield size={16} />
                  <span>Role: {user.role}</span>
                </div>

                {/* Input fields */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Username</label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      // leftIcon={<User size={16} />}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      // leftIcon={<Mail size={16} />}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleUpdate}
                  className="w-full cursor-pointer"
                >
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;
