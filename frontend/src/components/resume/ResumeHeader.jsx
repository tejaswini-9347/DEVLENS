export default function ResumeHeader({ profile }) {
  if (!profile) return null;

  return (
    <div className="border-b-2 border-gray-300 pb-6 mb-6">
      <h1 className="text-4xl font-bold text-gray-900">
        {profile.name || profile.login}
      </h1>

      <p className="text-gray-600 mt-2">
        {profile.bio || "Aspiring Software Developer"}
      </p>

      <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-700">

        {profile.email && (
          <div>📧 {profile.email}</div>
        )}

        {profile.location && (
          <div>📍 {profile.location}</div>
        )}

        <div>
          💻 GitHub:
          <a
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 ml-1"
          >
            {profile.login}
          </a>
        </div>

        {profile.blog && (
          <div>
            🌐 {profile.blog}
          </div>
        )}

      </div>
    </div>
  );
}