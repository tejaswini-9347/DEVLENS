import {
  FaMapMarkerAlt,
  FaBuilding,
  FaLink,
  FaUsers,
  FaBook,
} from "react-icons/fa";

const ProfileCard = ({ profile, onAddFavorite }) => {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-6">

        {/* Avatar */}
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-36 h-36 rounded-full border-4 border-cyan-500"
        />

        {/* Profile Info */}
        <div className="flex-1">

          <h2 className="text-3xl font-bold">
            {profile.name || profile.login}
          </h2>

          <p className="text-cyan-400 text-lg">
            @{profile.login}
          </p>

          <p className="text-gray-300 mt-3">
            {profile.bio || "No bio available."}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold">
                {profile.public_repos}
              </h3>
              <p className="text-gray-400">Repositories</p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold">
                {profile.followers}
              </h3>
              <p className="text-gray-400">Followers</p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold">
                {profile.following}
              </h3>
              <p className="text-gray-400">Following</p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold">
                {profile.public_gists}
              </h3>
              <p className="text-gray-400">Gists</p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">

            <a
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold"
            >
              View GitHub
            </a>

            <button
              onClick={() => onAddFavorite(profile)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-3 rounded-lg font-semibold"
            >
              ⭐ Add to Favorites
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfileCard;