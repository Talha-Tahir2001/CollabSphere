import { Link, useNavigate } from "react-router-dom";

import {
  Folder,
  LogIn,
  Menu,
  MessageSquare,
  User,
  UserPlus,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import ProfileDropdown from "./ProfileDropdown";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <header className="w-full bg-background text-foreground border-b shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold hover:text-primary">
          CollabSphere
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {token ? (
            <>
              <Link
                to="/workspaces"
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Folder size={18} /> Workspaces
              </Link>
              <Link
                to="/chat/global"
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageSquare size={18} /> Chat
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <User size={18} /> Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                to="/auth/register"
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <UserPlus size={18} /> Register
              </Link>
            </>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {token && <ProfileDropdown onLogout={handleLogout} />}
          <ModeToggle />
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden cursor-pointer"
              >
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                {token ? (
                  <>
                    <Link
                      to="/workspaces"
                      className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Folder size={18} /> Workspaces
                    </Link>
                    <Link
                      to="/chat/global"
                      className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <MessageSquare size={18} /> Chat
                    </Link>              
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <User size={18} /> Profile
                    </Link>
                    <Button
                      variant="ghost"
                      className="cursor-pointer flex items-center gap-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <LogIn size={18} /> Login
                    </Link>
                    <Link
                      to="/auth/register"
                      className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <UserPlus size={18} /> Register
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
