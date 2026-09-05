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

  console.log('1. Logging in as Admin...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await clickByText('🔑 Login');
  await clickByText('⚙️ Sistem Admini');
  await clickByText('Giriş Yap');
  await clickByText('⚙️ /admin');

  console.log('2. Capturing User Management Panel...');
  await clickByText('Kullanıcı Yönetimi');
  await page.screenshot({ path: path.join(outputDir, 'admin_01_user_management.png') });

  console.log('3. Capturing Role Permission Matrix (RBAC)...');
  await clickByText('Rol & Yetki Matrisi (RBAC)');
  await page.screenshot({ path: path.join(outputDir, 'admin_02_role_permission_matrix.png') });

  console.log('4. Capturing Academic Structure Panel...');
  await clickByText('Fakülte & Bölümler');
  await page.screenshot({ path: path.join(outputDir, 'admin_03_academic_structure.png') });

  console.log('5. Capturing Audit Logs & Security Trail...');
  await clickByText('Audit Logs & İzler');
  await page.screenshot({ path: path.join(outputDir, 'admin_04_audit_logs.png') });

  console.log('6. Capturing System & SMTP Settings...');
  await clickByText('Sistem & SMTP Ayarları');
  await page.screenshot({ path: path.join(outputDir, 'admin_05_system_settings.png') });

  console.log('PR-04 Admin Screenshots Completed!');
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
