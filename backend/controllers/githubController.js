import {
  fetchUserProfile,
  fetchUserRepositories,
  fetchFollowers,
  fetchFollowing,
  fetchContributionData,
} from "../services/githubService.js";
import { calculateAnalytics } from "../utils/analytics.js";
import { calculateActivityAnalytics } from "../utils/activityAnalytics.js";
import { calculateDeveloperScore } from "../utils/developerScore.js";
import generateAISummary from "../utils/aiSummary.js";
import detectSkills from "../utils/skillDetection.js";
import generateCareerRecommendations from "../utils/careerRecommendation.js";
import analyzeResume from "../utils/resumeAnalysis.js";
import predictGrowth from "../utils/growthPrediction.js";
import axios from "axios";
import { analyzeRepository } from "../services/groqService.js";
import { calculateRepositoryHealth } from "../services/repositoryHealthService.js";
console.log("Developer Score:", calculateDeveloperScore);
export const getGithubProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await fetchUserProfile(username);

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: "GitHub user not found",
    });
  }
};
export const getUserRepositories = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch raw repositories from GitHub
    const githubRepositories = await fetchUserRepositories(username);

    // Keep only required fields
    const repositories = githubRepositories.map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      repositoryUrl: repo.html_url,
    }));

    // Calculate analytics
    const analytics = calculateAnalytics(repositories);

    res.status(200).json({
      analytics,
      repositories,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Repositories not found",
      error: error.message,
    });
  }
};
export const getFollowers = async (req, res) => {
  try {
    const { username } = req.params;

    const followers = await fetchFollowers(username);

    const formattedFollowers = followers.map((user) => ({
      login: user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
    }));

    res.status(200).json(formattedFollowers);
  } catch (error) {
    res.status(500).json({
      message: "Followers not found",
      error: error.message,
    });
  }
};
export const getFollowing = async (req, res) => {
  try {
    const { username } = req.params;

    const following = await fetchFollowing(username);

    const formattedFollowing = following.map((user) => ({
      login: user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
    }));

    res.status(200).json(formattedFollowing);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Following not found",
      error: error.message,
    });
  }
};
export const getAnalytics = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch repositories
    const githubRepositories = await fetchUserRepositories(username);

    // Format repositories
    const repositories = githubRepositories.map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      repositoryUrl: repo.html_url,
    }));

    // Calculate analytics
    const analytics = calculateAnalytics(repositories);

    res.status(200).json(analytics);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Analytics not found",
      error: error.message,
    });
  }
};
export const getContributions = async (req, res) => {
  try {
    const { username } = req.params;

    const contributionData = await fetchContributionData(username);

    res.status(200).json({
      totalContributions: contributionData.totalContributions,
      weeks: contributionData.weeks,
    });

  } catch (error) {
    console.error("Contribution API Error:", error);

    res.status(500).json({
      message: "Unable to fetch contribution data",
      error: error.message,
    });
  }
};
export const getActivityAnalytics = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch repositories
    const githubRepositories = await fetchUserRepositories(username);

    // Format repositories
    const repositories = githubRepositories.map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      repositoryUrl: repo.html_url,
    }));

    // Calculate activity analytics
    const activityAnalytics = calculateActivityAnalytics(repositories);

    res.status(200).json(activityAnalytics);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Activity analytics not found",
      error: error.message,
    });
  }
};
export const getDeveloperScore = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch profile
    const profile = await fetchUserProfile(username);

    // Fetch repositories
    const githubRepositories = await fetchUserRepositories(username);

    // Format repositories
    const repositories = githubRepositories.map((repo) => ({
      name: repo.name,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
    }));

    // Calculate activity score
    const activityScore = repositories.length
      ? Math.round(
          (repositories.filter((repo) => {
            const updated = new Date(repo.updatedAt);
            const sixMonthsAgo = new Date();

            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

            return updated >= sixMonthsAgo;
          }).length /
            repositories.length) *
            100
        )
      : 0;

    // Calculate developer score
    const score = calculateDeveloperScore(
      repositories,
      profile.followers,
      activityScore
    );

    res.status(200).json(score);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to calculate developer score",
      error: error.message,
    });
  }
};
export const getAISummary = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch profile
    const profile = await fetchUserProfile(username);

    // Fetch repositories
    const githubRepositories = await fetchUserRepositories(username);

    // Format repositories
    const repositories = githubRepositories.map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      repositoryUrl: repo.html_url,
    }));

    // Calculate analytics
    const analytics = calculateAnalytics(repositories);

    // Generate AI Summary
    const aiSummary = generateAISummary(
      profile,
      repositories,
      analytics
    );

    res.status(200).json(aiSummary);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate AI summary",
      error: error.message,
    });
  }
};
export const getDetectedSkills = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch repositories
    const githubRepositories = await fetchUserRepositories(username);

    // Format repositories
    const repositories = githubRepositories.map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
    }));

    // Detect skills
    const skills = detectSkills(repositories);

    res.status(200).json({
      totalSkills: skills.length,
      skills,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to detect skills",
      error: error.message,
    });
  }
};
export const getCareerRecommendations = async (req, res) => {
  try {
    const { username } = req.params;

    const githubRepositories = await fetchUserRepositories(username);

    const repositories = githubRepositories.map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
    }));

    const skills = detectSkills(repositories);

    const recommendations =
      generateCareerRecommendations(skills);

    res.status(200).json({
      totalSkills: skills.length,
      skills,
      recommendations,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate career recommendations",
      error: error.message,
    });
  }
};
export const getResumeAnalysis = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch profile
    const profile = await fetchUserProfile(username);

    // Fetch repositories
    const githubRepositories = await fetchUserRepositories(username);

    // Format repositories
    const repositories = githubRepositories.map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      repositoryUrl: repo.html_url,
    }));

    // Calculate analytics
    const analytics = calculateAnalytics(repositories);

    // Analyse resume
    const resumeAnalysis = analyzeResume(
      profile,
      repositories,
      analytics
    );

    res.status(200).json(resumeAnalysis);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to analyse resume",
      error: error.message,
    });
  }
};
export const getGrowthPrediction = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch profile
    const profile = await fetchUserProfile(username);

    // Fetch repositories
    const githubRepositories = await fetchUserRepositories(username);

    // Format repositories
    const repositories = githubRepositories.map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      repositoryUrl: repo.html_url,
    }));

    // Calculate analytics
    const analytics = calculateAnalytics(repositories);

    // Predict growth
    const prediction = predictGrowth(profile, analytics);

    res.status(200).json(prediction);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to predict GitHub growth",
      error: error.message,
    });
  }
};
export const getRepository = async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to fetch repository.",
    });
  }
};

export const analyzeRepo = async (req, res) => {
  try {
    const { owner, repo } = req.body;

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const analysis = await analyzeRepository(response.data);

    res.json({
      repository: response.data,
      analysis,
    });
  } catch (error) {
  console.error("========== AI ERROR ==========");
  console.error(error);

  if (error.response) {
    console.error(error.response.data);
  }

  res.status(500).json({
    message: error.message,
  });
}
};
export const getRepositoryHealth = async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const health = calculateRepositoryHealth(response.data);

    res.json(health);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to calculate repository health",
    });
  }
};