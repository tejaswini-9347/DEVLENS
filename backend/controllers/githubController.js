import {
  fetchUserProfile,
  fetchUserRepositories,
  fetchFollowers,
  fetchFollowing,
  fetchContributionData,
} from "../services/githubService.js";
import { calculateAnalytics } from "../utils/analytics.js";
import { calculateActivityAnalytics } from "../utils/activityAnalytics.js";
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