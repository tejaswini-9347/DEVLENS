import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBalanceScale,
  FaRobot,
  FaGithub,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Compare",
      path: "/compare",
      icon: <FaBalanceScale />,
    },
    {
      name: "Repository Analyzer",
      path: "/repository-analyzer",
      icon: <FaRobot />,
    },
  ];

  return (
    <aside className="relative w-72 min-h-screen bg-slate-950 text-white shadow-xl border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-8 border-b border-slate-800">
        <FaGithub className="text-4xl text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold">DevLens</h1>
          <p className="text-sm text-slate-400">
            GitHub Analyzer
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="p-5 space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-cyan-500 text-white shadow-lg"
                : "hover:bg-slate-800 hover:translate-x-1"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-slate-900 rounded-xl p-4 text-center border border-slate-700">
          <p className="text-cyan-400 font-semibold">
            DevLens v1.0
          </p>
          <p className="text-xs text-slate-400 mt-1">
            AI Powered GitHub Analyzer
          </p>
        </div>
        <Link
  to="/resume-builder"
  className="hover:text-blue-500"
>
  AI Resume Builder
</Link>
      </div>
    </aside>
  );
}