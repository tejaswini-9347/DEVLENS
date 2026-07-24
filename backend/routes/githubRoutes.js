import express from "express";

import {
  getGithubProfile,
  getUserRepositories,
  getFollowers,
  getFollowing,
  getAnalytics,
} from "../controllers/githubController.js";

const router = express.Router();

// Profile
router.get("/user/:username", getGithubProfile);

// Repositories
router.get("/repos/:username", getUserRepositories);

// Followers
router.get("/followers/:username", getFollowers);

// Following
router.get("/following/:username", getFollowing);

// Analytics
router.get("/analytics/:username", getAnalytics);

export default router;