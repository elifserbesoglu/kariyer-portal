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
      const elements = Array.from(document.querySelectorAll('button, a, div'));
      const target = elements.find((el) => el.textContent?.trim().includes(t));
      if (target) target.click();
    }, text);
    await new Promise((r) => setTimeout(r, 600));
  };

  console.log('1. Capturing Login Page...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await clickByText('🔑 Login');
  await page.screenshot({ path: path.join(outputDir, 'auth_01_login.png') });

  console.log('2. Capturing Register Student Page...');
  await clickByText('📝 Register');
  await page.screenshot({ path: path.join(outputDir, 'auth_02_register_student.png') });

  console.log('3. Capturing Register Employer Page...');
  await clickByText('İşveren Kaydı');
  await page.screenshot({ path: path.join(outputDir, 'auth_03_register_employer.png') });

  console.log('4. Capturing Forgot Password Page...');
  await clickByText('🔑 Login');
  await clickByText('Şifremi Unuttum?');
  await page.screenshot({ path: path.join(outputDir, 'auth_04_forgot_password.png') });

  console.log('5. Capturing Protected Student Screen (LoggedIn)...');
  await clickByText('🔑 Login');
  await clickByText('🎓 Öğrenci: 20120033001');
  await clickByText('Giriş Yap');
  await page.screenshot({ path: path.join(outputDir, 'auth_05_protected_student.png') });

  console.log('6. Capturing Protected Employer Screen (LoggedIn)...');
  await clickByText('🏢 /employer');
  await page.screenshot({ path: path.join(outputDir, 'auth_06_protected_employer.png') });

  console.log('7. Capturing Employer Pending Approval Screen...');
  await clickByText('Çıkış Yap');
  await clickByText('🔑 Login');
  await clickByText('info@yeni-teknoloji.com');
  await clickByText('Giriş Yap');
  await page.screenshot({ path: path.join(outputDir, 'auth_07_pending_approval.png') });

  console.log('8. Capturing Unauthorized Access (Logged Out)...');
  await clickByText('Çıkış Yap');
  await clickByText('⚙️ /admin');
  await page.screenshot({ path: path.join(outputDir, 'auth_08_unauthorized_access.png') });

  console.log('Auth Screenshots Completed!');
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
