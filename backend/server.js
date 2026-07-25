import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import githubRoutes from "./routes/githubRoutes.js";

dotenv.config();
console.log("GitHub Token:", process.env.GITHUB_TOKEN?.slice(0, 8));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("DevLens Backend Running 🚀");
});

app.use("/api/github", githubRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});