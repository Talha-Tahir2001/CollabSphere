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

import { AuthProvider } from "./contexts/authContext";
import { useAuth } from "./hooks/useAuth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  if (!auth) return null;

  const { token } = auth;

  if (token === null) return <div>Loading...</div>;

  return token ? children : <Navigate to="/auth/login" />;
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <main className="p-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/workspaces"
              element={
                <ProtectedRoute>
                  <WorkspaceList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/workspaces/:workspaceId/projects"
              element={
                <ProtectedRoute>
                  <ProjectList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/workspaces/:workspaceId/projects/:projectId/tasks"
              element={
                <ProtectedRoute>
                  <TaskList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/workspaces/:workspaceId/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Toaster richColors />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
