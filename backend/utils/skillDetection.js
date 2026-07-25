function detectSkills(repositories) {
  const detectedSkills = new Set();

  const skillKeywords = {
    React: ["react", "jsx"],
    "Next.js": ["next"],
    NodeJS: ["node"],
    Express: ["express"],
    MongoDB: ["mongodb", "mongoose"],
    PostgreSQL: ["postgres", "postgresql"],
    Prisma: ["prisma"],
    MySQL: ["mysql"],
    TypeScript: ["typescript", "ts"],
    JavaScript: ["javascript", "js"],
    Python: ["python"],
    Java: ["java"],
    C: ["c"],
    "C++": ["cpp", "c++"],
    Docker: ["docker"],
    Firebase: ["firebase"],
    TailwindCSS: ["tailwind"],
    Bootstrap: ["bootstrap"],
    HTML: ["html"],
    CSS: ["css"],
    Vite: ["vite"],
    AWS: ["aws"],
    Git: ["git"],
  };

  repositories.forEach((repo) => {
    const text = `
      ${repo.name || ""}
      ${repo.description || ""}
      ${repo.language || ""}
    `.toLowerCase();

    Object.entries(skillKeywords).forEach(([skill, keywords]) => {
      if (keywords.some((keyword) => text.includes(keyword))) {
        detectedSkills.add(skill);
      }
    });
  });

  return [...detectedSkills].sort();
}

export default detectSkills;