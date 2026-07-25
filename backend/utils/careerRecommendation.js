function getCareerRecommendations(skills) {
  const recommendations = [];

  const has = (skill) => skills.includes(skill);

  // Frontend
  let frontend = 0;
  if (has("React")) frontend += 35;
  if (has("Next.js")) frontend += 25;
  if (has("JavaScript")) frontend += 15;
  if (has("TypeScript")) frontend += 10;
  if (has("HTML")) frontend += 10;
  if (has("CSS")) frontend += 5;

  // Backend
  let backend = 0;
  if (has("NodeJS")) backend += 30;
  if (has("Express")) backend += 20;
  if (has("MongoDB")) backend += 20;
  if (has("PostgreSQL")) backend += 20;
  if (has("MySQL")) backend += 15;
  if (has("Prisma")) backend += 10;

  // Full Stack
  let fullstack = 0;
  if (frontend >= 40) fullstack += 50;
  if (backend >= 40) fullstack += 50;

  // DevOps
  let devops = 0;
  if (has("Docker")) devops += 40;
  if (has("AWS")) devops += 40;
  if (has("Git")) devops += 20;

  // Data Engineer
  let data = 0;
  if (has("Python")) data += 40;
  if (has("PostgreSQL")) data += 30;
  if (has("MySQL")) data += 30;

  recommendations.push({
    role: "Frontend Developer",
    score: Math.min(frontend, 100),
  });

  recommendations.push({
    role: "Backend Developer",
    score: Math.min(backend, 100),
  });

  recommendations.push({
    role: "Full Stack Developer",
    score: Math.min(fullstack, 100),
  });

  recommendations.push({
    role: "DevOps Engineer",
    score: Math.min(devops, 100),
  });

  recommendations.push({
    role: "Data Engineer",
    score: Math.min(data, 100),
  });

  return recommendations.sort((a, b) => b.score - a.score);
}

export default getCareerRecommendations;