import express from "express";

import {
  getGithubProfile,
  getUserRepositories,
  getFollowers,
  getFollowing,
  getAnalytics,
  getActivityAnalytics,
  getDeveloperScore,
  getAISummary,
  getDetectedSkills,
  getCareerRecommendations,
  getResumeAnalysis,
  getGrowthPrediction,
  getRepository,
  analyzeRepo,
  analyzeRepositoryReadme,
  getRepositoryHealth,
  generateAIResume,
} from "../controllers/githubController.js";

const router = express.Router();

router.get("/user/:username", getGithubProfile);
router.get("/repos/:username", getUserRepositories);
router.get("/followers/:username", getFollowers);
router.get("/following/:username", getFollowing);
router.get("/analytics/:username", getAnalytics);
router.get("/activity/:username", getActivityAnalytics);
router.get("/developer-score/:username", getDeveloperScore);
router.get("/ai-summary/:username", getAISummary);
router.get("/skills/:username", getDetectedSkills);
router.get("/growth-prediction/:username", getGrowthPrediction);
router.get(
  "/career-recommendations/:username",
  getCareerRecommendations
);
router.get("/resume-analysis/:username", getResumeAnalysis);

router.get("/repository/:owner/:repo", getRepository);

router.post("/repository/analyze", analyzeRepo);

router.get(
  "/repository/:owner/:repo/health",
  getRepositoryHealth
);

router.get(
  "/repository/:owner/:repo/readme-analysis",
  analyzeRepositoryReadme
);

router.get(
  "/resume/:username",
  generateAIResume
);
export default router;