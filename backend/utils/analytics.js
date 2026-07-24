export const calculateAnalytics = (repositories) => {
  const totalStars = repositories.reduce(
    (total, repo) => total + repo.stars,
    0
  );

  const totalForks = repositories.reduce(
    (total, repo) => total + repo.forks,
    0
  );

  const repositoryCount = repositories.length;

  const mostPopularRepository = repositories.reduce((max, repo) =>
    repo.stars > max.stars ? repo : max
  );

  const languageStats = {};

  repositories.forEach((repo) => {
    if (repo.language) {
      languageStats[repo.language] =
        (languageStats[repo.language] || 0) + 1;
    }
  });

  let mostUsedLanguage = "N/A";
  let maxCount = 0;

  for (const language in languageStats) {
    if (languageStats[language] > maxCount) {
      maxCount = languageStats[language];
      mostUsedLanguage = language;
    }
  }

  return {
    repositoryCount,
    totalStars,
    totalForks,
    mostPopularRepository: mostPopularRepository.name,
    mostUsedLanguage,
    languageStats,
  };
};