function analyzeResume(profile, repositories, analytics) {
  let score = 0;

  const strengths = [];
  const improvements = [];

  // Repository count
  if (repositories.length >= 20) {
    score += 20;
    strengths.push("Excellent number of repositories");
  } else if (repositories.length >= 10) {
    score += 15;
    strengths.push("Good repository count");
  } else {
    score += 8;
    improvements.push("Create more public repositories");
  }

  // Followers
  if (profile.followers >= 100) {
    score += 15;
    strengths.push("Strong GitHub community");
  } else if (profile.followers >= 25) {
    score += 10;
    strengths.push("Growing GitHub presence");
  } else {
    improvements.push("Increase GitHub followers");
  }

  // Stars
  if (analytics.totalStars >= 100) {
    score += 20;
    strengths.push("Repositories are well appreciated");
  } else if (analytics.totalStars >= 20) {
    score += 10;
    strengths.push("Repositories have received stars");
  } else {
    improvements.push("Build projects that attract more stars");
  }

  // Languages
  const languages = Object.keys(analytics.languageStats || {});

  if (languages.length >= 5) {
    score += 15;
    strengths.push("Strong technical diversity");
  } else if (languages.length >= 3) {
    score += 10;
    strengths.push("Good language diversity");
  } else {
    improvements.push("Learn additional technologies");
  }

  // Activity
  const activeRepos = repositories.filter((repo) => {
    const updated = new Date(repo.updatedAt);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return updated >= sixMonthsAgo;
  });

  if (activeRepos.length >= 5) {
    score += 15;
    strengths.push("Recently active on GitHub");
  } else {
    improvements.push("Contribute more frequently");
  }

  // Profile Bio
  if (profile.bio) {
    score += 10;
    strengths.push("Profile has a bio");
  } else {
    improvements.push("Add a GitHub bio");
  }

  // Avatar
  if (profile.avatar_url) {
    score += 5;
  }

  return {
    score: Math.min(score, 100),
    strengths,
    improvements,
  };
}

export default analyzeResume;