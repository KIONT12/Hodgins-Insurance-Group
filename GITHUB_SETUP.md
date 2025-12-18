# GitHub Setup Instructions

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `Hodgins-Insurance-Group`
3. Choose Public or Private
4. **DO NOT** check "Initialize this repository with a README"
5. Click "Create repository"

## Step 2: Connect and Push

After creating the repository, run these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/Hodgins-Insurance-Group.git
git branch -M main
git push -u origin main
```

Or if you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/Hodgins-Insurance-Group.git
git branch -M main
git push -u origin main
```

## Alternative: If you already created the repository

If you've already created the repository on GitHub, just run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/Hodgins-Insurance-Group.git
git push -u origin master
```

Note: GitHub now uses `main` as the default branch name, but your local branch is `master`. You can either:
- Push to `master`: `git push -u origin master`
- Or rename to `main`: `git branch -M main` then `git push -u origin main`

