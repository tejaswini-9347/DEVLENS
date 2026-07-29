import axios from "axios";
import { analyzeRepository } from "../services/geminiService.js";

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
    console.error(error.response?.data || error.message);

    res.status(500).json({
      message: "AI analysis failed.",
    });
  }
};