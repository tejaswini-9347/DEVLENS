import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

console.log(
  "Groq API Key Loaded:",
  process.env.GROQ_API_KEY ? "YES ✅" : "NO ❌"
);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
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

Keep the response short, professional and easy to understand.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("========== GROQ ERROR ==========");
    console.error(error);
    throw error;
  }
};