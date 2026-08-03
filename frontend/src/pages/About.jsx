import {
  FaGithub,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";

import {
  SiExpress,
  SiTailwindcss,
} from "react-icons/si";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-4">
          About DevLens
        </h1>

        <p className="text-slate-400 leading-8">
          DevLens is an AI-powered GitHub Repository Analyzer that helps
          developers understand repositories, analyze README files,
          compare GitHub profiles, and generate ATS-friendly resumes.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-5">
          Features
        </h2>

        <ul className="space-y-3 text-slate-300">
          <li>✅ GitHub Profile Analysis</li>
          <li>✅ Repository Comparison</li>
          <li>✅ AI Repository Analyzer</li>
          <li>✅ README Analyzer</li>
          <li>✅ AI Resume Builder</li>
          <li>✅ PDF Resume Download</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-5">
          Tech Stack
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

          <div className="bg-slate-900 rounded-xl p-5 text-center">
            <FaReact className="mx-auto text-4xl text-cyan-400" />
            <p className="mt-3">React</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-5 text-center">
            <FaNodeJs className="mx-auto text-4xl text-green-400" />
            <p className="mt-3">Node.js</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-5 text-center">
            <SiExpress className="mx-auto text-4xl" />
            <p className="mt-3">Express</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-5 text-center">
            <SiTailwindcss className="mx-auto text-4xl text-sky-400" />
            <p className="mt-3">Tailwind</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-5 text-center">
            <FaGithub className="mx-auto text-4xl" />
            <p className="mt-3">GitHub API</p>
          </div>

        </div>

        <div className="mt-12 text-center text-slate-500">
          DevLens v1.0 • AI Powered GitHub Analyzer 🚀
        </div>

      </div>

    </div>
  );
}