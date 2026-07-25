export const calculateActivityAnalytics = (repositories) => {
  const now = new Date();

  let activeRepositories = 0;
  let inactiveRepositories = 0;

  let mostRecentlyUpdated = null;
  let oldestRepository = null;

  repositories.forEach((repo) => {
    const updatedDate = new Date(repo.updatedAt);

    // Days since last update
    const daysDifference =
      (now - updatedDate) / (1000 * 60 * 60 * 24);

    // Active within last 30 days
    if (daysDifference <= 30) {
      activeRepositories++;
    } else {
      inactiveRepositories++;
    }

    // Most recently updated
    if (
      !mostRecentlyUpdated ||
      updatedDate > new Date(mostRecentlyUpdated.updatedAt)
    ) {
      mostRecentlyUpdated = repo;
    }

    // Oldest repository
    if (
      !oldestRepository ||
      updatedDate < new Date(oldestRepository.updatedAt)
    ) {
      oldestRepository = repo;
    }
  });

  // Activity Score (0–100)
  const activityScore =
    repositories.length === 0
      ? 0
      : Math.round(
          (activeRepositories / repositories.length) * 100
        );

  return {
    totalRepositories: repositories.length,
    activeRepositories,
    inactiveRepositories,
    activityScore,
    mostRecentlyUpdated,
    oldestRepository,
  };
};