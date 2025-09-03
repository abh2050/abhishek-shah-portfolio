# GitHub Pages Deployment Checklist

## Before First Deployment

### 1. Repository Settings
- [ ] Repository is public (required for free GitHub Pages)
- [ ] Go to Repository Settings > Pages
- [ ] Set Source to "Deploy from a branch" and select "GitHub Actions"

### 2. Repository Permissions
- [ ] Ensure GitHub Actions are enabled in repository settings
- [ ] Check that Actions have write permissions

## Deployment Options

### Option 1: Automatic Deployment (Recommended)
1. Commit and push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Check the Actions tab for deployment status
4. Site will be available at: `https://abh2050.github.io/abhishek-shah-portfolio/`

### Option 2: Manual Deployment
```bash
# Run the deployment script
./deploy.sh

# Or use npm script
npm run deploy
```

## Troubleshooting

### Common Issues:
1. **404 Error**: Check that GitHub Pages is enabled and source is set correctly
2. **Build Fails**: Check the Actions tab for error logs
3. **Images Not Loading**: Ensure images are in `public/assets/` folder
4. **CSS/JS Not Loading**: Check the base URL configuration in `vite.config.ts`

### Useful Commands:
```bash
# Test production build locally
npm run build:prod
npm run preview

# Check for linting issues
npm run lint

# View deployment status
# Go to: https://github.com/abh2050/abhishek-shah-portfolio/actions
```

## Post-Deployment
- [ ] Test all pages and functionality
- [ ] Verify images and assets load correctly
- [ ] Check mobile responsiveness
- [ ] Test all links and navigation
- [ ] Verify animations work properly
