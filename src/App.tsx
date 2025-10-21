import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./providers/theme-provider";

import Chat from "./pages/Chat";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import WorkspaceList from "./pages/WorkspaceList";
import Profile from "./pages/Profile";
import TaskList from "./pages/TaskList";
import Home from "./pages/Home";
import ProjectList from "./pages/ProjectList";

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

          {/* 🔒 Protected Routes */}
          <Route
            path="/workspaces"
            element={token ? <WorkspaceList /> : <Navigate to="/auth/login" />}
          />
          <Route
            path="/chat/:workspaceId"
            element={token ? <Chat /> : <Navigate to="/auth/login" />}
          />
          <Route
            path="/projects"
            element={token ? <ProjectList /> : <Navigate to="/auth/login" />}
          />
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/auth/login" />}
          />
          <Route
            path="/tasks"
            element={token ? <TaskList /> : <Navigate to="/auth/login" />}
          />

          {/* 🌐 Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
