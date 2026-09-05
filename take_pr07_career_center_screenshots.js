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

  console.log('1. Logging in as Career Center Admin...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await clickByText('🔑 Login');
  await clickByText('🏢 Kariyer Merkezi');
  await clickByText('Giriş Yap');
  await clickByText('🏢 /career-center');

  console.log('2. Capturing Career Counseling Pool...');
  await clickByText('Danışmanlık');
  await page.screenshot({ path: path.join(outputDir, 'career_center_06_counseling.png') });

  console.log('3. Capturing Ortak Takvim...');
  await clickByText('Ortak Takvim');
  await page.screenshot({ path: path.join(outputDir, 'career_center_07_calendar.png') });

  console.log('4. Capturing Mezun Takip...');
  await clickByText('Mezun Takip');
  await page.screenshot({ path: path.join(outputDir, 'career_center_08_alumni.png') });

  console.log('5. Capturing Mentorluk Platformu...');
  await clickByText('Mentorluk');
  await page.screenshot({ path: path.join(outputDir, 'career_center_09_mentor.png') });

  console.log('6. Capturing Analitik & Raporlar...');
  await clickByText('Analitik & Raporlar');
  await page.screenshot({ path: path.join(outputDir, 'career_center_10_analytics.png') });

  console.log('7. Capturing Global Arama...');
  await clickByText('Global Arama');
  await page.screenshot({ path: path.join(outputDir, 'career_center_11_search.png') });

  console.log('PR-07 Screenshots Captured Successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
