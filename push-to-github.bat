@echo off
REM GitHub Push Script for Hodgins Insurance Group
REM Replace YOUR_USERNAME with your actual GitHub username

set GITHUB_USERNAME=YOUR_USERNAME
set REPO_NAME=Hodgins-Insurance-Group

echo Setting up GitHub remote...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo Pushing to GitHub...
git push -u origin master

echo Done! Your code is now on GitHub at: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%

