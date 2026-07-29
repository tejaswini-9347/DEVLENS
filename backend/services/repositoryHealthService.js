export const calculateRepositoryHealth = (repo) => {
  let score = 0;

  // ⭐ Stars (20)
  const popularity = Math.min((repo.stargazers_count / 500) * 20, 20);

  // 🍴 Forks (15)
  const forks = Math.min((repo.forks_count / 200) * 15, 15);

  // 👀 Watchers (10)
  const watchers = Math.min((repo.watchers_count / 100) * 10, 10);

  // 🐞 Open Issues (10)
  const issues =
    repo.open_issues_count === 0
      ? 10
      : Math.max(10 - repo.open_issues_count, 0);

  // 📅 Recent Activity (20)
  const lastUpdated = new Date(repo.updated_at);
  const days =
    (Date.now() - lastUpdated.getTime()) /
    (1000 * 60 * 60 * 24);

  const activity =
    days <= 30
      ? 20
      : days <= 90
      ? 15
      : days <= 180
      ? 10
      : 5;

  // 📚 README (10)
  const documentation = repo.has_wiki ? 10 : 5;

  // 📜 License (5)
  const license = repo.license ? 5 : 0;

  // 🧑‍💻 Size (10)
  const size = repo.size > 100 ? 10 : 5;

  score =
    popularity +
    forks +
    watchers +
    issues +
    activity +
    documentation +
    license +
    size;

  score = Math.round(score);

  let status = "Poor";

  if (score >= 85) status = "Excellent";
  else if (score >= 70) status = "Good";
  else if (score >= 50) status = "Average";

  return {
    score,
    status,

    popularity: Math.round((popularity / 20) * 100),

    activity: Math.round((activity / 20) * 100),

    documentation: Math.round((documentation / 10) * 100),

    maintenance: Math.round(
      ((issues + activity) / 30) * 100
    ),

    community: Math.round(
      ((forks + watchers) / 25) * 100
    ),
  };
};