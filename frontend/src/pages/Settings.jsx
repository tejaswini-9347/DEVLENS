import {
  FaServer,
  FaRobot,
  FaMoon,
  FaCodeBranch,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    logout();

    toast.success("Logged out successfully.");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          Settings
        </h1>

        <p className="text-slate-400 mb-10">
          Manage your DevLens application settings.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <FaCodeBranch className="text-cyan-400 text-3xl mb-4" />

            <h2 className="text-xl font-semibold">
              Version
            </h2>

            <p className="text-slate-400 mt-2">
              DevLens v1.0
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <FaRobot className="text-cyan-400 text-3xl mb-4" />

            <h2 className="text-xl font-semibold">
              AI Provider
            </h2>

            <p className="text-slate-400 mt-2">
              Groq (Llama 3.3 70B)
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <FaServer className="text-cyan-400 text-3xl mb-4" />

            <h2 className="text-xl font-semibold">
              Backend Status
            </h2>

            <p className="text-green-400 mt-2">
              Online ✅
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
            <FaMoon className="text-cyan-400 text-3xl mb-4" />

            <h2 className="text-xl font-semibold">
              Theme
            </h2>

            <p className="text-slate-400 mt-2">
              Dark Mode
            </p>
          </div>

        </div>

        {/* Logout */}

        <div className="mt-10 flex justify-end">

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg font-semibold"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}