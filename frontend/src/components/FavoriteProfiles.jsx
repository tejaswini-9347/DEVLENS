const FavoriteProfiles = ({ favorites, onSelect }) => {
  if (favorites.length === 0) return null;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        ⭐ Favorite Profiles
      </h2>

      <div className="flex flex-wrap justify-center gap-3">
        {favorites.map((user) => (
          <button
            key={user.login}
            onClick={() => onSelect(user.login)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition"
          >
            {user.login}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FavoriteProfiles;