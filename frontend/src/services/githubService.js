import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/github",
});

export const getProfile = async (username) => {
  const response = await API.get(`/user/${username}`);
  return response.data;
};

export const getRepositories = async (username) => {
  const response = await API.get(`/repos/${username}`);
  return response.data;
};

export const getFollowers = async (username) => {
  const response = await API.get(`/followers/${username}`);
  return response.data;
};

export const getFollowing = async (username) => {
  const response = await API.get(`/following/${username}`);
  return response.data;
};

export const getAnalytics = async (username) => {
  const response = await API.get(`/analytics/${username}`);
  return response.data;
};
export const getActivityAnalytics = async (username) => {
  const response = await API.get(`/activity/${username}`);
  return response.data;
};

export const getDeveloperScore = async (username) => {
  const response = await API.get(`/developer-score/${username}`);
  return response.data;
};

export const getAISummary = async (username) => {
  const response = await API.get(`/ai-summary/${username}`);
  return response.data;
};

export const getDetectedSkills = async (username) => {
  const response = await API.get(`/skills/${username}`);
  return response.data;
};

export const getCareerRecommendations = async (username) => {
  const response = await API.get(`/career-recommendations/${username}`);
  return response.data;
};

export const getResumeAnalysis = async (username) => {
  const response = await API.get(`/resume-analysis/${username}`);
  return response.data;
};

export const getGrowthPrediction = async (username) => {
  const response = await API.get(`/growth-prediction/${username}`);
  return response.data;
};

export const getRepository = async (owner, repo) => {
  const response = await API.get(`/repository/${owner}/${repo}`);
  return response.data;
};

export const analyzeRepository = async (owner, repo) => {
  const response = await API.post("/repository/analyze", {
    owner,
    repo,
  });
  return response.data;
};

export const getRepositoryHealth = async (owner, repo) => {
  const response = await API.get(`/repository/${owner}/${repo}/health`);
  return response.data;
};

export const getReadmeAnalysis = async (owner, repo) => {
  const response = await API.get(
    `/repository/${owner}/${repo}/readme-analysis`
  );

  return response.data;
};