import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ResumeBuilder from "./pages/ResumeBuilder";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import RepositoryAnalyzer from "./pages/RepositoryAnalyzer";

function App() {
  return (
    <div className="flex bg-slate-100 dark:bg-slate-950 min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/compare" element={<Compare />} />
          <Route
            path="/repository-analyzer"
            element={<RepositoryAnalyzer />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;