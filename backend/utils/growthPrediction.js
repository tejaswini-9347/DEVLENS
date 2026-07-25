function predictGrowth(profile, analytics) {
  const currentRepos = profile.public_repos;
  const currentFollowers = profile.followers;
  const currentStars = analytics.totalStars;

  // Growth estimates (next 6 months)
  const predictedRepos = Math.round(currentRepos * 1.5);
  const predictedFollowers = Math.round(currentFollowers * 1.5);
  const predictedStars = Math.round(currentStars * 1.5);

  let trend = "📈 Stable";

  if (
    currentRepos >= 20 ||
    currentFollowers >= 100 ||
    currentStars >= 100
  ) {
    trend = "🚀 Growing Fast";
  } else if (
    currentRepos >= 10 ||
    currentFollowers >= 30 ||
    currentStars >= 30
  ) {
    trend = "📈 Improving";
  }

  return {
    repositories: {
      current: currentRepos,
      predicted: predictedRepos,
    },
    followers: {
      current: currentFollowers,
      predicted: predictedFollowers,
    },
    stars: {
      current: currentStars,
      predicted: predictedStars,
    },
    trend,
  };
}

export default predictGrowth;