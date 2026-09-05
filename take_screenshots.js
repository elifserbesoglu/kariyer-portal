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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  console.log('1. Navigating to Home Page (Desktop 1440px)...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outputDir, '01_homepage_desktop.png'), fullPage: false });

  console.log('2. Responsive Tablet View (768px)...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.screenshot({ path: path.join(outputDir, '02_homepage_tablet.png') });

  console.log('3. Responsive Mobile View (375px)...');
  await page.setViewport({ width: 375, height: 812 });
  await page.screenshot({ path: path.join(outputDir, '03_homepage_mobile.png') });

  // Reset viewport to desktop
  await page.setViewport({ width: 1440, height: 900 });

  // Helper to click link text or button text inside header/page
  const clickByText = async (text) => {
    await page.evaluate((t) => {
      const elements = Array.from(document.querySelectorAll('button, a, div'));
      const target = elements.find((el) => el.textContent?.trim().includes(t));
      if (target) target.click();
    }, text);
    await new Promise((r) => setTimeout(r, 600));
  };

  console.log('4. Navigating to İş ve Staj İlanları...');
  await clickByText('İLANLAR');
  await page.screenshot({ path: path.join(outputDir, '04_jobs_page.png') });

  console.log('5. Clicking Job Detail...');
  await clickByText('Yazılım Mühendisi');
  await page.screenshot({ path: path.join(outputDir, '05_job_detail_page.png') });

  console.log('6. Clicking Hemen Başvur (Modal Test)...');
  await clickByText('Hemen Başvur');
  await page.screenshot({ path: path.join(outputDir, '06_job_apply_modal.png') });

  // Close modal by clicking Student Login in modal
  await clickByText('Öğrenci / Mezun Girişi');
  await new Promise((r) => setTimeout(r, 400));
  // Switch back to Public view via top switcher bar
  await clickByText('🏛️ Public Website (20 Sayfa)');
  await new Promise((r) => setTimeout(r, 400));

  console.log('7. Navigating to Firmalar...');
  await clickByText('FİRMALAR');
  await page.screenshot({ path: path.join(outputDir, '07_companies_page.png') });

  console.log('8. Clicking Company Detail (ASELSAN)...');
  await clickByText('ASELSAN Konya');
  await page.screenshot({ path: path.join(outputDir, '08_company_detail_page.png') });

  console.log('9. Navigating to Etkinlikler...');
  await clickByText('ETKİNLİKLER');
  await page.screenshot({ path: path.join(outputDir, '09_events_page.png') });

  console.log('10. Clicking Event Detail...');
  await clickByText('Kariyer Günleri 2024');
  await page.screenshot({ path: path.join(outputDir, '10_event_detail_page.png') });

  console.log('11. Navigating to Duyurular...');
  await clickByText('DUYURULAR');
  await page.screenshot({ path: path.join(outputDir, '11_announcements_page.png') });

  console.log('12. Clicking Announcement Detail...');
  await clickByText('Yetenek Kapısı 2024');
  await page.screenshot({ path: path.join(outputDir, '12_announcement_detail_page.png') });

  console.log('13. Navigating to Hakkımızda...');
  await clickByText('KURUMSAL');
  await clickByText('Hakkımızda');
  await page.screenshot({ path: path.join(outputDir, '13_about_page.png') });

  console.log('14. Navigating to Misyonumuz...');
  await clickByText('KURUMSAL');
  await clickByText('Misyonumuz');
  await page.screenshot({ path: path.join(outputDir, '14_mission_page.png') });

  console.log('15. Navigating to Vizyonumuz...');
  await clickByText('KURUMSAL');
  await clickByText('Vizyonumuz');
  await page.screenshot({ path: path.join(outputDir, '15_vision_page.png') });

  console.log('16. Navigating to Kariyer Danışmanları...');
  await clickByText('KURUMSAL');
  await clickByText('Kariyer Danışmanları');
  await page.screenshot({ path: path.join(outputDir, '16_counselors_page.png') });

  console.log('17. Navigating to Yönetim Kadrosu...');
  await clickByText('KURUMSAL');
  await clickByText('Yönetim Kadrosu');
  await page.screenshot({ path: path.join(outputDir, '17_management_page.png') });

  console.log('18. Navigating to İletişim...');
  await clickByText('İLETİŞİM');
  await page.screenshot({ path: path.join(outputDir, '18_contact_page.png') });

  console.log('19. Navigating to KVKK...');
  await clickByText('KVKK Aydınlatma Metni');
  await page.screenshot({ path: path.join(outputDir, '19_kvkk_page.png') });

  console.log('Screenshots completed successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
