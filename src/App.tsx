import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./providers/theme-provider";

import Chat from "./pages/Chat";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import WorkspaceList from "./pages/WorkspaceList";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProjectList from "./pages/ProjectList";
import TaskList from "./pages/TaskList";

function App() {
  const token = localStorage.getItem("token");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <main className="p-6">
        <Routes>
          {/* 🏠 Public Home Page */}
          <Route path="/" element={<Home />} />

          {/* 🔐 Auth Routes */}
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />

          {/* 🔒 Protected Routes - Hierarchical Structure */}
          
          {/* Workspaces Level */}
          <Route
            path="/workspaces"
            element={token ? <WorkspaceList /> : <Navigate to="/auth/login" />}
          />
          
          {/* Projects Level (within a workspace) */}
          <Route
            path="/workspaces/:workspaceId/projects"
            element={token ? <ProjectList /> : <Navigate to="/auth/login" />}
          />
          
          {/* Tasks Level (within a project) */}
          <Route
            path="/workspaces/:workspaceId/projects/:projectId/tasks"
            element={token ? <TaskList /> : <Navigate to="/auth/login" />}
          />
          
          {/* Chat for workspace */}
          <Route
            path="/workspaces/:workspaceId/chat"
            element={token ? <Chat /> : <Navigate to="/auth/login" />}
          />
          
          {/* Profile */}
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/auth/login" />}
          />

          {/* 🌐 Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster richColors />
    </ThemeProvider>
  );
}

export default App;