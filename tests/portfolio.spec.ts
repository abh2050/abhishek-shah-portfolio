import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { projects } from '../src/content/projects';
import { profile } from '../src/content/profile';

test('homepage leads to selected work and provides working contact paths', async ({page})=>{
  await page.goto('./');
  await expect(page.getByRole('heading',{level:1})).toHaveText(profile.headline);
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.getByRole('link',{name:'Explore selected work',exact:true}).click();
  await expect(page).toHaveURL(/section=work/);
  await expect(page.locator('#work')).toBeFocused();
  expect(await page.locator('#work').evaluate(el=>Math.round(el.getBoundingClientRect().top))).toBeGreaterThanOrEqual(80);
  await expect(page.getByRole('link',{name:'abh2050@gmail.com'})).toHaveAttribute('href','mailto:abh2050@gmail.com');
  await page.getByText('What is your current role?',{exact:true}).click();
  await expect(page.locator('.faq details').first()).toContainText(`${profile.title} at ${profile.employer}`);
  await expect(page.locator('iframe')).toHaveCount(0);
});

test('mobile menu supports keyboard, escape, focus return, route dismissal and scroll restoration', async ({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('./');
  const menu=page.locator('.mobile-toggle');await menu.focus();await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded','true');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('body')).toHaveAttribute('data-scroll-locked','1');
  await expect(page.getByRole('dialog').locator(':focus')).toHaveCount(1);
  // Radix attaches its Escape listener during the open transition; a human cannot press Escape inside that window.
  await page.waitForFunction(()=>document.getAnimations().every(a=>a.playState!=='running'));
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(menu).toBeFocused();
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
  await menu.click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Selected work'}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);await expect(menu).toHaveAttribute('aria-expanded','false');
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
  await menu.click();await page.setViewportSize({width:1024,height:900});await expect(page.getByRole('dialog')).toHaveCount(0);
});

for(const p of projects) test(`case study: ${p.title}`, async ({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:4173')&&r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.goto(`./#/projects/${p.slug}`);
  await expect(page.getByRole('heading',{level:1})).toHaveText(p.title);
  await expect(page.locator('.scope-note')).toContainText(p.cardFinding);
  await expect(page.locator('#limitations')).toContainText(p.limitations[0]);
  await expect(page.locator('[data-claim]')).toHaveCount(p.metrics.length);
  await expect(page.locator('figure')).toHaveCount(2);
  await expect(page.getByRole('link',{name:'Source code'})).toHaveAttribute('href',p.repository);
  await page.locator('figure').last().scrollIntoViewIfNeeded();
  for (const img of await page.locator('figure img').all()) await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
  await page.reload();await expect(page.getByRole('heading',{level:1})).toHaveText(p.title);
  await page.getByRole('link',{name:'Selected work',exact:true}).last().click();
  await page.getByRole('link',{name:`Read case study: ${p.title}`}).click();
  await page.goBack();await expect(page.locator('#work')).toBeFocused();
  expect(errors).toEqual([]);
});

test('figure viewer opens by keyboard and restores focus',async({page})=>{
  await page.goto(`./#/projects/${projects[0].slug}`);const trigger=page.getByRole('button',{name:/Enlarge figure:/}).first();await trigger.focus();await page.keyboard.press('Enter');await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('link',{name:'Open full-size image in a new tab'})).toHaveAttribute('href',/full.webp$/);
  await expect(page.getByRole('link',{name:'Open full-size image in a new tab'})).toBeFocused();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(trigger).toBeFocused();
});

test('legacy links and unknown routes recover without losing the project base',async({page})=>{
  for(const [hash,selector] of [['#portfolio','#work'],['#experience','#career'],['#education','#education']]){await page.goto(`./${hash}`);await expect(page.locator(selector)).toBeFocused();}
  await page.goto('./#podcasts');await expect(page.getByRole('heading',{level:1})).toHaveText('Writing & podcasts.');
  await page.goto('./#/missing-page');await expect(page.getByRole('heading',{level:1})).toContainText('There’s good work');await page.getByRole('link',{name:'Explore selected work',exact:true}).click();await expect(page).toHaveURL(/abhishek-shah-portfolio\/#\/\?section=work/);
  await page.goto('./#/projects/not-a-project');await expect(page.getByRole('heading',{level:1})).toContainText('There’s good work');
});

test('archive embeds are opt-in',async({page})=>{
  await page.goto('./#/writing');await expect(page.locator('iframe')).toHaveCount(0);await expect(page.locator('.archive-list article')).toHaveCount(25);
  await page.route('https://open.spotify.com/embed/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<html lang="en"><title>Embed transport fixture</title><body>Player availability checked separately</body></html>'}));
  await page.getByRole('button',{name:/Load podcast player/}).first().click();await expect(page.locator('iframe')).toHaveCount(1);
});

test('metadata, local assets and deliberate resume status',async({page,request})=>{
  await page.goto('./');
  const icon=await page.locator('link[rel="icon"]').getAttribute('href');expect(icon).toContain('/abhishek-shah-portfolio/');expect((await request.get(icon!)).ok()).toBe(true);
  const social=await page.locator('meta[property="og:image"]').getAttribute('content');expect(social).toBe(profile.canonical+'images/social/portfolio.png');const img=await request.get('images/social/portfolio.png');expect(img.ok()).toBe(true);expect(img.headers()['content-type']).toContain('image/png');
  if(profile.resume){const pdf=await request.get(profile.resume);expect(pdf.ok()).toBe(true);expect((await pdf.body()).subarray(0,5).toString()).toBe('%PDF-');}
  else {await expect(page.getByRole('link',{name:/Request résumé/}).first()).toHaveAttribute('href',/^mailto:/);await expect(page.getByRole('link',{name:/Download résumé/})).toHaveCount(0);}
});

for(const width of [390,1440])for(const route of ['','#/projects/enterprise-rag-aws'])test(`accessibility ${width} ${route||'home'}`,async({page})=>{
  await page.setViewportSize({width,height:1000});await page.goto(`./${route}`);const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});

test('reduced motion and skip link remain functional',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();await expect(page.getByRole('heading',{level:1})).toBeVisible();
});
