import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outputDir = '/Users/elifserbesoglu/.gemini/antigravity/brain/d843d11c-5965-40ad-836c-599ae7b4e386/screenshots';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const clickByText = async (text) => {
    await page.evaluate((t) => {
      const elements = Array.from(document.querySelectorAll('button, a, div, span'));
      const target = elements.find((el) => el.textContent?.trim() === t || el.textContent?.trim().includes(t));
      if (target) target.click();
    }, text);
    await new Promise((r) => setTimeout(r, 600));
  };

  console.log('1. Logging in as Career Center...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await clickByText('🔑 Login');
  await clickByText('🏛️ Kariyer Merkezi');
  await clickByText('Giriş Yap');
  await clickByText('🏛️ /career-center');

  console.log('2. Capturing Career Center Cockpit & Widgets...');
  await page.screenshot({ path: path.join(outputDir, 'career_center_01_dashboard_widgets.png') });

  console.log('3. Capturing Company Approvals Pool...');
  await clickByText('Firma Onayları');
  await page.screenshot({ path: path.join(outputDir, 'career_center_02_company_approvals.png') });

  console.log('4. Capturing Job Moderation Pool & Department Targeting...');
  await clickByText('İlan Moderasyonu');
  await page.screenshot({ path: path.join(outputDir, 'career_center_03_job_moderation.png') });

  console.log('5. Capturing Bulk Email Engine...');
  await clickByText('Hedefli Toplu Mail');
  await page.screenshot({ path: path.join(outputDir, 'career_center_04_bulk_email.png') });

  console.log('6. Capturing Event Management & QR Tickets...');
  await clickByText('Kariyer Günleri & QR');
  await page.screenshot({ path: path.join(outputDir, 'career_center_05_events_qr.png') });

  console.log('PR-05 Career Center Screenshots Completed!');
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
