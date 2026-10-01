import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 45_000, fullyParallel: false, workers: 1,
  reporter: [['list'], ['json', {outputFile:'docs/portfolio/verification/playwright.json'}], ['html',{outputFolder:'playwright-report',open:'never'}]],
  use: {baseURL:'http://127.0.0.1:4173/abhishek-shah-portfolio/', channel: 'chrome', screenshot:'only-on-failure', trace:'retain-on-failure', viewport:{width:1440,height:1000}},
  webServer:{command:'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',url:'http://127.0.0.1:4173/abhishek-shah-portfolio/',reuseExistingServer:!process.env.CI},
});
