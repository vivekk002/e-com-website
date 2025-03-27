#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
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
    return changes;
  } catch (error) {
    console.error("❌ Error getting changed files:", error);
    return null;
  }
}

async function getCommitMessage(changes) {
  try {
    const response = await axios.post(
      "https://api.gemini.com/generate",
      {
        prompt: `Generate a commit message for the following changes:\n${changes}`,
      },
      { headers: { Authorization: `Bearer ${GEMINI_API_KEY}` } }
    );
    return response.data.message || "Update code";
  } catch (error) {
    console.error("❌ Error getting commit message:", error);
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
  execSync("git add .", { cwd: GIT_REPO_PATH });
  execSync(`git commit -m "${commitMessage}"`, { cwd: GIT_REPO_PATH });
  execSync(`git push ${GITHUB_REMOTE} ${BRANCH}`, { cwd: GIT_REPO_PATH });
  console.log("🚀 Changes pushed successfully!");
}

commitAndPush();
