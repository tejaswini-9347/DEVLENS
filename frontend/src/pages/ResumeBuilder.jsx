import { useState } from "react";
import axios from "axios";
import ResumeTemplate from "../components/resume/ResumeTemplate";
import { downloadResume } from "../utils/downloadResume";
export default function ResumeBuilder() {
  const [username, setUsername] = useState("");
  const [resume, setResume] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateResume = async () => {
    if (!username.trim()) {
      alert("Please enter a GitHub username.");
      return;
    }

    try {
      setLoading(true);

     const [resumeResponse, profileResponse] = await Promise.all([
  axios.get(`http://localhost:5000/api/github/resume/${username}`),
  axios.get(`http://localhost:5000/api/github/user/${username}`),
]);

      setResume(resumeResponse.data.resume);
      setProfile(profileResponse.data);
    } catch (error) {
  console.error("FULL ERROR:", error);

  if (error.response) {
    console.log("Response Data:", error.response.data);
    console.log("Status:", error.response.status);
    alert(JSON.stringify(error.response.data));
  } else {
    alert(error.message);
  }
} finally {
      setLoading(false);
    }
  };

  const copyResume = async () => {
    try {
      await navigator.clipboard.writeText(resume);
      alert("Resume copied successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const clearResume = () => {
    setResume("");
    setProfile(null);
    setUsername("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-3">
          AI Resume Builder
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Generate an ATS-friendly resume from your GitHub profile using AI.
        </p>

        <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-700 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              onClick={generateResume}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Resume"}
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center mt-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {resume && profile && (
          <>
            <div className="flex justify-end gap-3 mt-8">

  <button
    onClick={downloadResume}
    className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg font-semibold"
  >
    📄 Download PDF
  </button>

  <button
    onClick={copyResume}
    className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold"
  >
    📋 Copy Resume
  </button>

  <button
    onClick={clearResume}
    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold"
  >
    🗑 Clear
  </button>

</div>

            <ResumeTemplate
              profile={profile}
              resume={resume}
            />
          </>
        )}
      </div>
    </div>
  );
}