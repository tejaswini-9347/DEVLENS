import { GoogleGenerativeAI } from "@google/generative-ai";

// Debug: Check if API key is loaded
console.log(
  "Gemini API Key Loaded:",
  process.env.GEMINI_API_KEY ? "YES ✅" : "NO ❌"
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const analyzeRepository = async (repository) => {
  try {
    const prompt = `
You are an expert software engineer.

Analyze this GitHub repository.

Repository Name: ${repository.full_name}
Description: ${repository.description}
Primary Language: ${repository.language}
Stars: ${repository.stargazers_count}
Forks: ${repository.forks_count}
Open Issues: ${repository.open_issues_count}

Provide:

1. Project Purpose
2. Tech Stack
3. Difficulty Level
4. Skills Required
5. Resume Worthiness
6. Placement Recommendation

Keep the response short, professional, and easy to understand.
`;

    const result = await model.generateContent(prompt);
     console.log(process.env.GEMINI_API_KEY.substring(0, 10));
    return result.response.text();
  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);

    throw error;
  }
};