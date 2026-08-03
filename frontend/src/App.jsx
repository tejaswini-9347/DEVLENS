import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import RepositoryAnalyzer from "./pages/RepositoryAnalyzer";
import ReadmeAnalyzer from "./pages/ReadmeAnalyzer";
import ResumeBuilder from "./pages/ResumeBuilder";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  const location = useLocation();

  const hideSidebar =
  location.pathname === "/login" ||
  location.pathname === "/register" ||
  location.pathname === "/forgot-password" ||
  location.pathname.startsWith("/reset-password");

  return (
    <div className="flex bg-slate-100 dark:bg-slate-950 min-h-screen">

      {!hideSidebar && <Sidebar />}

      <main
        className={`flex-1 overflow-auto ${
          hideSidebar ? "" : "p-8"
        }`}
      >
        <Routes>

  {/* Authentication */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

  {/* Protected Pages */}

  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />

  <Route
    path="/compare"
    element={
      <ProtectedRoute>
        <Compare />
      </ProtectedRoute>
    }
  />

  <Route
    path="/repository-analyzer"
    element={
      <ProtectedRoute>
        <RepositoryAnalyzer />
      </ProtectedRoute>
    }
  />

  <Route
    path="/readme-analyzer"
    element={
      <ProtectedRoute>
        <ReadmeAnalyzer />
      </ProtectedRoute>
    }
  />

  <Route
    path="/resume-builder"
    element={
      <ProtectedRoute>
        <ResumeBuilder />
      </ProtectedRoute>
    }
  />

  <Route
    path="/settings"
    element={
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    }
  />

  <Route
    path="/about"
    element={
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    }
  />

  <Route path="*" element={<NotFound />} />

</Routes>
      </main>

    </div>
  );
}

export default App;