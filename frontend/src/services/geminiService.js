import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const analyzeRepository = async (repo) => {
  const prompt = `
Analyze this GitHub repository.

Repository Name: ${repo.full_name}
Description: ${repo.description}
Language: ${repo.language}
Stars: ${repo.stargazers_count}
Forks: ${repo.forks_count}
Topics: ${repo.topics?.join(", ")}

Generate:
1. Project Purpose
2. Tech Stack
3. Difficulty Level
4. Skills Required
5. Resume Worthiness
6. Placement Recommendation

Keep the response clear and student-friendly.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};