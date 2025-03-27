#!/usr/bin/env node

const { execSync } = require("child_process");
const axios = require("axios");
require("dotenv").config();

const GIT_REPO_PATH = process.env.GIT_REPO_PATH || ".";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GITHUB_REMOTE = process.env.GITHUB_REMOTE || "origin";
const BRANCH = process.env.BRANCH || "main";

if (!GEMINI_API_KEY) {
  console.error("❌ Please set GEMINI_API_KEY in your .env file");
  process.exit(1);
}

function getChangedFiles() {
  try {
    const changes = execSync("git status --short", { cwd: GIT_REPO_PATH })
      .toString()
      .trim();
    return changes || null;
  } catch (error) {
    console.error("❌ Error getting changed files:", error);
    return null;
  }
}

async function getCommitMessage(changes) {
  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro-latest:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [
              {
                text: `Generate a concise commit message for the following Git changes:\n${changes}`,
              },
            ],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const commitMessage =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return commitMessage ? commitMessage.replace(/"/g, "'") : "Update code";
  } catch (error) {
    console.error(
      "❌ Error getting commit message:",
      error.response?.data || error.message
    );
    return "Update code";
  }
}

async function commitAndPush() {
  const changes = getChangedFiles();
  if (!changes) {
    console.log("✅ No changes detected.");
    return;
  }

  const commitMessage = await getCommitMessage(changes);
  console.log(`📝 Commit Message: "${commitMessage}"`);

  try {
    // Stash changes before pulling to avoid conflicts
    execSync("git stash --include-untracked", {
      cwd: GIT_REPO_PATH,
      stdio: "inherit",
    });

    // Pull latest changes
    execSync(`git pull --rebase ${GITHUB_REMOTE} ${BRANCH}`, {
      cwd: GIT_REPO_PATH,
      stdio: "inherit",
    });

    // Restore changes
    execSync("git stash pop", { cwd: GIT_REPO_PATH, stdio: "inherit" });

    // Commit and push
    execSync("git add .", { cwd: GIT_REPO_PATH });
    execSync(`git commit -m "${commitMessage}"`, { cwd: GIT_REPO_PATH });
    execSync(`git push ${GITHUB_REMOTE} ${BRANCH}`, { cwd: GIT_REPO_PATH });

    console.log("🚀 Changes pushed successfully!");
  } catch (error) {
    console.error("❌ Error committing or pushing changes:", error);
  }
}

commitAndPush();
