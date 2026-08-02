import {
  FaServer,
  FaRobot,
  FaMoon,
  FaCodeBranch,
} from "react-icons/fa";

export default function Settings() {
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

      </div>
    </div>
  );
}