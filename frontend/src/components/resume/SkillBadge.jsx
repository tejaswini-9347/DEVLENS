export default function SkillBadge({ skill }) {
  return (
    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium border border-blue-300 hover:bg-blue-200 transition-all duration-200">
      {skill}
    </span>
  );
}