import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ResumeBuilder from "./pages/ResumeBuilder";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import RepositoryAnalyzer from "./pages/RepositoryAnalyzer";
import ReadmeAnalyzer from "./pages/ReadmeAnalyzer";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <div className="flex bg-slate-100 dark:bg-slate-950 min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto p-8">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="*" element={<NotFound />} />
  <Route path="/compare" element={<Compare />} />
  <Route
    path="/repository-analyzer"
    element={<RepositoryAnalyzer />}
  />
  <Route
    path="/readme-analyzer"
    element={<ReadmeAnalyzer />}
  />
  <Route
    path="/resume-builder"
    element={<ResumeBuilder />}
  />
  <Route path="/settings" element={<Settings />} />
  <Route path="/about" element={<About />} />
</Routes>
      </main>
    </div>
  );
}

export default App;