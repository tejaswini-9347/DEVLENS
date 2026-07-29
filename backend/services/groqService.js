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
export const analyzeReadme = async (readme) => {
  try {
    const prompt = `
You are an expert software engineer.

Analyze the following GitHub README and return your answer in Markdown.

README:
${readme}

Provide the following sections:

# Project Summary

# Main Features

# Technologies Used

# Installation Steps

# Documentation Improvements

# Interview Questions (5)
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
    console.error("Groq README Error:", error);
    throw error;
  }
};
export const generateResume = async (profile, repositories) => {
  try {
    // Keep only important profile data
    const profileData = {
      name: profile.name,
      username: profile.login,
      bio: profile.bio,
      location: profile.location,
      company: profile.company,
      blog: profile.blog,
      followers: profile.followers,
      following: profile.following,
      publicRepos: profile.public_repos,
    };

    // Top 5 repositories
    const topRepositories = repositories
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      }));

    const prompt = `
You are an expert ATS Resume Writer.

Based on the GitHub profile and repositories, generate a professional resume.

Return ONLY valid JSON.

Do NOT use Markdown.
Do NOT use triple backticks.
Do NOT explain anything.

Use this exact JSON structure:

{
  "summary": "",
  "skills": [],
  "training": [],
  "projects": [
    {
      "name": "",
      "description": ""
    }
  ],
  "certificates": [],
  "education": {
    "college": "",
    "degree": "",
    "cgpa": ""
  }
}

GitHub Profile:
${JSON.stringify(profileData, null, 2)}

Top GitHub Projects:
${JSON.stringify(topRepositories, null, 2)}
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

    let content = completion.choices[0].message.content.trim();

    // Remove markdown code block if AI accidentally adds it
    if (content.startsWith("```")) {
      content = content
        .replace(/```json/i, "")
        .replace(/```/g, "")
        .trim();
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Resume Generation Error:", error);
    throw error;
  }
};