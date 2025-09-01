# 🚀 Git Setup and GitHub Deployment Guide

## Step 1: Install Git (Required)

### Download and Install Git:
1. Go to [git-scm.com](https://git-scm.com/download/win)
2. Download Git for Windows
3. Run the installer with default settings
4. Restart your terminal/PowerShell

### Verify Installation:
```bash
git --version
```

## Step 2: Configure Git (First Time Only)

```bash
git config --global user.name "Sarvesh Swami"
git config --global user.email "sarveshswami10701@gmail.com"
```

## Step 3: Initialize Repository

```bash
# Navigate to your project directory
cd "c:\Users\ABC\Music\portfolio_demo"

# Initialize Git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: AI Developer Portfolio"
```

## Step 4: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click "New repository" (green button)
3. Repository settings:
   - **Name**: `ai-portfolio` or `sarvesh-portfolio`
   - **Description**: "AI Developer Portfolio - Sarvesh Swami"
   - **Visibility**: Public
   - **Don't** initialize with README (we already have one)
4. Click "Create repository"

## Step 5: Connect to GitHub

```bash
# Add GitHub repository as remote origin
git remote add origin https://github.com/Sarvesh-Swami/ai-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 6: Deploy on Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "Add new site" → "Import from Git"
4. Choose GitHub and authorize
5. Select your `ai-portfolio` repository
6. Deploy settings:
   - **Build command**: (leave empty)
   - **Publish directory**: (leave empty)
7. Click "Deploy site"

## 🎉 Done! Your Portfolio Will Be Live

- **GitHub Repository**: https://github.com/Sarvesh-Swami/ai-portfolio
- **Live Website**: https://amazing-name-123456.netlify.app (Netlify will provide URL)
- **Contact Form**: Will send emails to sarveshswami10701@gmail.com

## 📧 After Deployment

- Test the contact form on your live site
- Update the live URL in your README.md
- Share your portfolio link!

## 🔄 Future Updates

When you make changes:
```bash
git add .
git commit -m "Update portfolio"
git push
```
Netlify will automatically redeploy!

---

**Need Help?** 
- Git Issues: [git-scm.com/docs](https://git-scm.com/docs)
- GitHub Help: [docs.github.com](https://docs.github.com)
- Netlify Support: [docs.netlify.com](https://docs.netlify.com)