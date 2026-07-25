const skillColors = {
  React: "bg-cyan-500",
  "Next.js": "bg-black",
  NodeJS: "bg-green-600",
  Express: "bg-gray-600",
  MongoDB: "bg-green-700",
  PostgreSQL: "bg-blue-700",
  Prisma: "bg-indigo-600",
  MySQL: "bg-orange-500",
  JavaScript: "bg-yellow-400 text-black",
  TypeScript: "bg-blue-500",
  Python: "bg-yellow-600",
  Java: "bg-red-600",
  C: "bg-slate-600",
  "C++": "bg-indigo-500",
  HTML: "bg-orange-600",
  CSS: "bg-blue-600",
  TailwindCSS: "bg-sky-500",
  Bootstrap: "bg-purple-600",
  Docker: "bg-blue-700",
  Firebase: "bg-amber-500 text-black",
  Git: "bg-red-500",
  AWS: "bg-yellow-500 text-black",
  Vite: "bg-violet-500",
};

function SkillCard({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="mt-10 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-cyan-500 mb-6">
        🛠️ Detected Skills
      </h2>

      <div className="flex flex-wrap gap-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`px-5 py-2 rounded-full text-white font-semibold ${
              skillColors[skill] || "bg-gray-600"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillCard;