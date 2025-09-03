# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9481064b-fc84-4f28-8888-bc353c77abd7

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9481064b-fc84-4f28-8888-bc353c77abd7) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## 🚀 Deployment

This portfolio is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

Every push to the `main` branch will automatically trigger a deployment to GitHub Pages. The site will be available at:
`https://abh2050.github.io/abhishek-shah-portfolio/`

### Manual Deployment

You can also deploy manually using the provided script:

```sh
# Option 1: Use npm script (builds and deploys)
npm run deploy

# Option 2: Use deployment script directly
./deploy.sh
```

### Deployment Process

1. **GitHub Actions**: The `.github/workflows/deploy.yml` file defines the CI/CD pipeline
2. **Build Process**: Runs `npm run build` to create production assets
3. **Deploy**: Uploads the `dist` folder to GitHub Pages

### Requirements for Deployment

- Ensure GitHub Pages is enabled in your repository settings
- Set the source to "GitHub Actions" in Pages settings
- The repository must be public (for free GitHub Pages) or you need GitHub Pro/Team

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9481064b-fc84-4f28-8888-bc353c77abd7) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
