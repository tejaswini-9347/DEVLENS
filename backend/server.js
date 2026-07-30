import express from "express";
import cors from "cors";
import githubRoutes from "./routes/githubRoutes.js";
import dotenv from "dotenv";

dotenv.config();

// Debug logs
console.log(
  "GitHub Token Loaded:",
  process.env.GITHUB_TOKEN ? "YES ✅" : "NO ❌"
);

console.log(
  "Gemini API Key Loaded:",
  process.env.GEMINI_API_KEY ? "YES ✅" : "NO ❌"
);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("DevLens Backend Running 🚀");
});

app.use("/api/github", githubRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});