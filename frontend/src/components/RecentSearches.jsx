const RecentSearches = ({ searches, onSearch }) => {
  if (searches.length === 0) return null;

  return (
    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4 text-center">
        🕒 Recent Searches
      </h2>

      <div className="flex flex-wrap justify-center gap-3">

        {searches.map((username, index) => (

          <button
            key={index}
            onClick={() => onSearch(username)}
            className="bg-slate-800 hover:bg-cyan-600 px-4 py-2 rounded-lg transition"
          >
            {username}
          </button>

        ))}

      </div>

    </div>
  );
};

export default RecentSearches;