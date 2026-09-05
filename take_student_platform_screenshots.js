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

  console.log('1. Logging in as Student (Emre Tunç)...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await clickByText('🔑 Login');
  await clickByText('🎓 Öğrenci');
  await clickByText('Giriş Yap');
  await clickByText('🎓 /student');

  console.log('2. Capturing Student Dashboard...');
  await page.screenshot({ path: path.join(outputDir, 'student_01_dashboard.png') });

  console.log('3. Capturing CV Builder...');
  await clickByText('CV Builder (ATS Formatı)');
  await page.screenshot({ path: path.join(outputDir, 'student_03_cv_builder.png') });

  console.log('4. Capturing Belgelerim & Kasa...');
  await clickByText('Belgelerim & Kasa');
  await page.screenshot({ path: path.join(outputDir, 'student_04_documents.png') });

  console.log('5. Capturing Başvurularım & ATS Takibi...');
  await clickByText('Başvurularım & ATS Takibi');
  await page.screenshot({ path: path.join(outputDir, 'student_05_applications.png') });

  console.log('6. Capturing Mülakatlarım...');
  await clickByText('Mülakatlarım');
  await page.screenshot({ path: path.join(outputDir, 'student_07_interviews.png') });

  console.log('7. Capturing Mesajlaşma...');
  await clickByText('Mesajlaşma');
  await page.screenshot({ path: path.join(outputDir, 'student_08_messaging.png') });

  console.log('8. Capturing Mühendislik Portfolyosu...');
  await clickByText('Mühendislik Portfolyosu');
  await page.screenshot({ path: path.join(outputDir, 'student_10_portfolio.png') });

  console.log('9. Capturing Kariyer Hedefleri...');
  await clickByText('Kariyer Hedefleri');
  await page.screenshot({ path: path.join(outputDir, 'student_09_career_goals.png') });

  console.log('10. Capturing Favori İlanlar...');
  await clickByText('Favori İlanlar');
  await page.screenshot({ path: path.join(outputDir, 'student_06_bookmarks.png') });

  console.log('PR-06 Student Platform Screenshots Completed!');
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
