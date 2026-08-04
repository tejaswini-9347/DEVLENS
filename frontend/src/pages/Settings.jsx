import {
  FaServer,
  FaRobot,
  FaMoon,
  FaCodeBranch,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import LogoutModal from "../components/LogoutModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
   const handleLogout = () => {
  logout();

  toast.success("Logged out successfully!");

  navigate("/login");
};

  return (
  <div className="min-h-screen bg-slate-950 text-white">

    <div className="max-w-6xl mx-auto px-8 py-10">

      <div className="mb-12">

        <h1 className="text-5xl font-bold">
          ⚙️ Settings
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Manage your CodeVista preferences and application information.
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Theme */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-purple-500 transition-all hover:-translate-y-1">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">

              <FaMoon className="text-purple-400 text-2xl"/>

            </div>

            <div>

              <h2 className="text-xl font-bold">
                Appearance
              </h2>

              <p className="text-slate-400">
                Dark Mode Enabled
              </p>

            </div>

          </div>

        </div>

        {/* AI */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-cyan-500 transition-all hover:-translate-y-1">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center">

              <FaRobot className="text-cyan-400 text-2xl"/>

            </div>

            <div>

              <h2 className="text-xl font-bold">
                AI Provider
              </h2>

              <p className="text-slate-400">
                Groq • Llama 3.3 70B
              </p>

            </div>

          </div>

        </div>

        {/* Backend */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-green-500 transition-all hover:-translate-y-1">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center">

              <FaServer className="text-green-400 text-2xl"/>

            </div>

            <div>

              <h2 className="text-xl font-bold">
                System Status
              </h2>

              <p className="text-green-400">
                ● Backend Online
              </p>

              <p className="text-slate-500 text-sm">
                Database Connected
              </p>

            </div>

          </div>

        </div>

        {/* Version */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-orange-500 transition-all hover:-translate-y-1">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center">

              <FaCodeBranch className="text-orange-400 text-2xl"/>

            </div>

            <div>

              <h2 className="text-xl font-bold">
                Application
              </h2>

              <p className="text-slate-400">
                CodeVista v1.0
              </p>

              <p className="text-slate-500 text-sm">
                React • Node • PostgreSQL
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Account */}

      {/* Account */}

<div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-8">

  <h2 className="text-2xl font-bold mb-6">
    🔐 Account
  </h2>

  <div className="flex justify-between items-center">

    <div>

      <h3 className="text-lg font-semibold">
        Logged in as
      </h3>

      <p className="text-cyan-400 mt-2">
        {user?.email || "No email found"}
      </p>

      <p className="text-slate-500 text-sm mt-1">
        Securely signed in to CodeVista
      </p>

    </div>

    <button
      onClick={() => setShowLogoutModal(true)}
      className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl flex items-center gap-3 font-semibold transition-all hover:scale-105"
    >
      <FaSignOutAlt />
      Logout
    </button>

  </div>

</div>

    </div>

    <LogoutModal
  isOpen={showLogoutModal}
  onClose={() => setShowLogoutModal(false)}
  onConfirm={handleLogout}
/>

  </div>
);
}