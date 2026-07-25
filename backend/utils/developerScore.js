export const calculateDeveloperScore = (
  repositories,
  followersCount,
  activityScore
) => {
  const totalRepos = repositories.length;

  const totalStars = repositories.reduce(
    (sum, repo) => sum + repo.stars,
    0
  );

  const totalForks = repositories.reduce(
    (sum, repo) => sum + repo.forks,
    0
  );

  const languages = new Set(
    repositories
      .map((repo) => repo.language)
      .filter(Boolean)
  );

  const repoPoints = Math.min(totalRepos * 2, 20);
  const starPoints = Math.min(totalStars / 5, 20);
  const forkPoints = Math.min(totalForks / 3, 15);
  const followerPoints = Math.min(followersCount / 2, 20);
  const activityPoints = Math.min(activityScore * 0.15, 15);
  const languagePoints = Math.min(languages.size * 2, 10);

  const score = Math.round(
    repoPoints +
      starPoints +
      forkPoints +
      followerPoints +
      activityPoints +
      languagePoints
  );

  return {
    score,
    repoPoints,
    starPoints,
    forkPoints,
    followerPoints,
    activityPoints,
    languagePoints,
  };
};