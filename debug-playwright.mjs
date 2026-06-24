import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  page.on('response', response => console.log('RESPONSE:', response.status(), response.url()));
  
  console.log('Navigating to http://localhost:5173/checkout...');
  await page.goto('http://localhost:5173/checkout');
  
  console.log('Waiting 2 seconds...');
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Current URL:', page.url());
  const content = await page.content();
  console.log('Page Content Length:', content.length);
  
  await browser.close();
})();
