function generateAISummary(profile, repositories, analytics) {
  const languages = Object.keys(analytics.languageStats || {});

  let summary = `${profile.name || profile.login} is an active GitHub developer`;

  if (languages.length > 0) {
    summary += ` primarily working with ${languages.join(", ")}.`;
  }

  summary += ` They have ${profile.public_repos} public repositories`;

  if (profile.followers > 0) {
    summary += ` and ${profile.followers} followers`;
  }

  summary += `.`;

  summary += ` Their repositories have earned ${
    analytics.totalStars || 0
  } stars and ${
    analytics.totalForks || 0
  } forks.`;

  if (analytics.totalRepos >= 20) {
    summary +=
      " This demonstrates strong project development experience.";
  } else if (analytics.totalRepos >= 10) {
    summary +=
      " This indicates consistent development activity.";
  } else {
    summary +=
      " Increasing repository count could further strengthen the profile.";
  }

  return {
    summary,
  };
}

export default generateAISummary;