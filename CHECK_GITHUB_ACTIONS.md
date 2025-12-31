# How to See GitHub Actions Workflows

## Where to Find Your Workflows

1. **Go to your repository**: https://github.com/KIONT12/Hodgins-Insurance-Group

2. **Click the "Actions" tab** at the top of the repository page
   - If you don't see "Actions", it might be disabled
   - Go to Settings → Actions → General → Allow all actions

3. **You should see two workflows**:
   - "Build and Test" (simplified)
   - "CI" (detailed)

## If Actions Tab is Missing

If you don't see the Actions tab:

1. Go to **Settings** (top right of repository)
2. Click **Actions** in the left sidebar
3. Under **Actions permissions**, select **"Allow all actions and reusable workflows"**
4. Click **Save**

## Check Status Badge

You can also see the status on commit pages:
- Green checkmark ✅ = Passed
- Red X ❌ = Failed
- Yellow circle ⏳ = Running

## Manual Trigger

To manually trigger a workflow:
1. Go to Actions tab
2. Click on a workflow name
3. Click "Run workflow" button (top right)

## Current Workflows

- **build.yml**: Simple build and test workflow
- **ci.yml**: Detailed CI workflow with linting

Both workflows will:
- Install dependencies
- Run linter (warnings allowed)
- Build frontend
- Build backend

