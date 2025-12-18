#!/bin/bash
# GitHub Push Script for Hodgins Insurance Group
# Replace YOUR_USERNAME with your actual GitHub username

GITHUB_USERNAME="YOUR_USERNAME"
REPO_NAME="Hodgins-Insurance-Group"

echo "Setting up GitHub remote..."
git remote add origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git

echo "Pushing to GitHub..."
git push -u origin master

echo "Done! Your code is now on GitHub at: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"

