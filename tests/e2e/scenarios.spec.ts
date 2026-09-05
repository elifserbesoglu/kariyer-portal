import { test, expect } from '@playwright/test';

test.describe('KTÜN Kariyer Portalı — 30 Scenario Comprehensive Enterprise UAT & Functional QA Suite', () => {

  // ==========================================
  // SECTION 1: PUBLIC NAVIGATION & BRANDING AUDIT (Scenarios 1-6)
  // ==========================================

  test('Scenario 01: Home Page Render & Official Brand Logo Audit', async ({ page }) => {
    await page.goto('/#/home');
    await expect(page.getByText(/Kariyer Yolculuğunu Buradan Başlat/i).first()).toBeVisible({ timeout: 5000 });
    const logoImg = page.locator('img[alt="Konya Teknik Üniversitesi Amblemi"]').first();
    await expect(logoImg).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 02: Public Navigation — Corporate Pages (Mission & Vision)', async ({ page }) => {
    await page.goto('/#/mission');
    await expect(page.getByText(/Misyon & Vizyon/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 03: Public Navigation — Job Search & Filter Page', async ({ page }) => {
    await page.goto('/#/jobs');
    await expect(page.getByText(/İş ve Staj İlanları/i).first()).toBeVisible({ timeout: 5000 });
    const searchInput = page.locator('input[placeholder*="Pozisyon"]').first();
    await searchInput.fill('ASELSAN');
    await expect(page.getByText(/ASELSAN/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 04: Public Navigation — Companies Directory & Detail', async ({ page }) => {
    await page.goto('/#/companies');
    await expect(page.getByText(/Anlaşmalı Kurumlar/i).first()).toBeVisible({ timeout: 5000 });
    await page.goto('/#/company-detail?id=aselsan');
    await expect(page.getByText(/ASELSAN Konya/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 05: Public Navigation — Career Center Services Page', async ({ page }) => {
    await page.goto('/#/career-center');
    await expect(page.getByText(/Kariyer/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 06: Public Navigation — Contact & Legal KVKK Pages', async ({ page }) => {
    await page.goto('/#/contact');
    await expect(page.getByText(/İletişim/i).first()).toBeVisible({ timeout: 5000 });
    await page.goto('/#/kvkk');
    await expect(page.getByText(/KVKK/i).first()).toBeVisible({ timeout: 5000 });
  });

  // ==========================================
  // SECTION 2: AUTHENTICATION & REGISTER FLOWS (Scenarios 7-10)
  // ==========================================

  test('Scenario 07: Public Visitor Application Triggers Login Required Modal', async ({ page }) => {
    await page.goto('/#/job-detail');
    const applyBtn = page.getByRole('button', { name: 'Hemen Başvur', exact: true });
    await expect(applyBtn).toBeVisible({ timeout: 5000 });
    await applyBtn.click();
    await expect(page.getByText(/Giriş Yapılması Gerekiyor/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 08: Register Panel — Student Form Validation & Submission', async ({ page }) => {
    await page.goto('/');
    const loginNavBtn = page.getByRole('button', { name: '🔑 Giriş Yap', exact: true });
    await loginNavBtn.click();

    const registerLinkBtn = page.getByRole('button', { name: 'Hemen Kaydolun', exact: true });
    await registerLinkBtn.click();

    await page.locator('input[placeholder="Adınız..."]').fill('Selim');
    await page.locator('input[placeholder="Soyadınız..."]').fill('Kaya');
    await page.locator('input[placeholder="11 haneli T.C. No"]').fill('12345678901');
    await page.locator('input[placeholder="ör. 20120033001"]').fill('20120033999');
    await page.locator('input[placeholder="kullanici@ogr.ktun.edu.tr"]').fill('selim.kaya@ogr.ktun.edu.tr');
    await page.locator('input[placeholder="En az 6 karakter"]').fill('123456');
    await page.locator('input[type="checkbox"]').check({ force: true });

    const submitBtn = page.getByRole('button', { name: 'Öğrenci Kaydını Tamamla', exact: true });
    await submitBtn.click({ noWaitAfter: true });
    await expect(page.getByText(/Öğrenci kaydınız başarıyla oluşturulmuştur/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 09: Register Panel — Employer Form Validation & VKN Verification', async ({ page }) => {
    await page.goto('/');
    const loginNavBtn = page.getByRole('button', { name: '🔑 Giriş Yap', exact: true });
    await loginNavBtn.click();

    const registerLinkBtn = page.getByRole('button', { name: 'Hemen Kaydolun', exact: true });
    await registerLinkBtn.click();

    const employerTabBtn = page.getByText('İşveren Kaydı').first();
    await employerTabBtn.click();

    await page.locator('input[placeholder="Örnek Teknoloji A.Ş."]').fill('Yeni Teknoloji A.Ş.');
    await page.locator('input[placeholder="10 Haneli Vergi Kimlik No"]').fill('9876543210');
    await page.locator('input[placeholder="ör. Meram V.D."]').fill('Selçuklu V.D.');
    await page.locator('input[placeholder="Ad Soyad..."]').fill('Ahmet Yılmaz');
    await page.locator('input[placeholder="ik@sirketiniz.com"]').fill('ik@yeni-teknoloji.com');
    await page.locator('input[placeholder="En az 6 karakter"]').fill('123456');
    await page.locator('input[type="checkbox"]').check({ force: true });

    const submitBtn = page.getByRole('button', { name: 'İşveren Kaydını Gönder', exact: true });
    await submitBtn.click({ noWaitAfter: true });
    await expect(page.getByText(/İşveren kaydınız alınmıştır/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 10: Forgot Password Modal Flow', async ({ page }) => {
    await page.goto('/');
    const loginNavBtn = page.getByRole('button', { name: '🔑 Giriş Yap', exact: true });
    await loginNavBtn.click();

    const forgotBtn = page.getByRole('button', { name: 'Şifrenizi mi unuttunuz?', exact: true });
    await forgotBtn.click();
    await expect(page.getByText(/Şifre Sıfırlama Bağlantısı Gönder/i).first()).toBeVisible({ timeout: 5000 });
  });

  // ==========================================
  // SECTION 3: STUDENT DASHBOARD & CV BUILDER (Scenarios 11-15)
  // ==========================================

  test('Scenario 11: Student Role Application Modal & Submission', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-student-1',
        email: 'emre.tunc@ogr.ktun.edu.tr',
        fullName: 'Emre Tunç',
        role: 'Student',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/#/job-detail');
    const applyBtn = page.getByRole('button', { name: 'Hemen Başvur', exact: true });
    await expect(applyBtn).toBeVisible({ timeout: 5000 });
    await applyBtn.click();

    await expect(page.getByText(/İş Başvurusu Gönder/i).first()).toBeVisible({ timeout: 5000 });
    const finishBtn = page.getByRole('button', { name: 'Başvuruyu Tamamla' });
    await finishBtn.click();
    await expect(page.getByText(/Başvurunuz Başarıyla İletildi/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 12: Student CV Builder — Manual Save Action & Feedback', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-student-1',
        email: 'emre.tunc@ogr.ktun.edu.tr',
        fullName: 'Emre Tunç',
        role: 'Student',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const studentBtn = page.getByRole('button', { name: '🎓 Öğrenci / Mezun', exact: true });
    await studentBtn.click();

    const saveCvBtn = page.getByRole('button', { name: 'CV Kaydet', exact: true });
    await expect(saveCvBtn).toBeVisible({ timeout: 5000 });
    await saveCvBtn.click();
    await expect(page.getByText(/CV verileriniz başarıyla veritabanına kaydedildi/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 13: Student CV Builder — Live CV Preview Modal', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-student-1',
        email: 'emre.tunc@ogr.ktun.edu.tr',
        fullName: 'Emre Tunç',
        role: 'Student',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const studentBtn = page.getByRole('button', { name: '🎓 Öğrenci / Mezun', exact: true });
    await studentBtn.click();

    const previewCvBtn = page.getByRole('button', { name: 'CV Önizle', exact: true });
    await expect(previewCvBtn).toBeVisible({ timeout: 5000 });
    await previewCvBtn.click();
    await expect(page.getByText(/Özgeçmiş Canlı Önizleme/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 14: Student Dashboard Access & Action Panel', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-student-1',
        email: 'emre.tunc@ogr.ktun.edu.tr',
        fullName: 'Emre Tunç',
        role: 'Student',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const studentBtn = page.getByRole('button', { name: '🎓 Öğrenci / Mezun', exact: true });
    await studentBtn.click();
    await expect(page.getByText(/Emre Tunç/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 15: Student Applications List Verification', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-student-1',
        email: 'emre.tunc@ogr.ktun.edu.tr',
        fullName: 'Emre Tunç',
        role: 'Student',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const studentBtn = page.getByRole('button', { name: '🎓 Öğrenci / Mezun', exact: true });
    await studentBtn.click();

    const appsTab = page.getByRole('button', { name: /Başvurularım/i }).first();
    await appsTab.click();
    await expect(page.getByText(/ASELSAN Konya/i).first()).toBeVisible({ timeout: 5000 });
  });

  // ==========================================
  // SECTION 4: ALUMNI ROLE SCENARIOS (Scenarios 16-18)
  // ==========================================

  test('Scenario 16: Alumni Role Job Application Flow', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-alumni-1',
        email: 'zeynep.yilmaz@mezun.ktun.edu.tr',
        fullName: 'Zeynep Yılmaz',
        role: 'Alumni',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/#/job-detail');
    const applyBtn = page.getByRole('button', { name: 'Hemen Başvur', exact: true });
    await expect(applyBtn).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 17: Alumni Career Center Access', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-alumni-1',
        email: 'zeynep.yilmaz@mezun.ktun.edu.tr',
        fullName: 'Zeynep Yılmaz',
        role: 'Alumni',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/#/career-center');
    await expect(page.getByText(/Kariyer/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 18: Alumni Dashboard Access', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-alumni-1',
        email: 'zeynep.yilmaz@mezun.ktun.edu.tr',
        fullName: 'Zeynep Yılmaz',
        role: 'Alumni',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const studentBtn = page.getByRole('button', { name: '🎓 Öğrenci / Mezun', exact: true });
    await studentBtn.click();
    await expect(page.getByText(/Zeynep Yılmaz/i).first()).toBeVisible({ timeout: 5000 });
  });

  // ==========================================
  // SECTION 5: EMPLOYER ROLE SCENARIOS (Scenarios 19-22)
  // ==========================================

  test('Scenario 19: Employer Application Blocking & Governance Alert', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-employer-1',
        email: 'ik@aselsankonya.com.tr',
        fullName: 'ASELSAN Konya İK',
        role: 'Employer',
        companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
        approvalStatus: 'Approved',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/#/job-detail');
    const applyBtn = page.getByRole('button', { name: 'Hemen Başvur', exact: true });
    await expect(applyBtn).toHaveCount(0);
    await expect(page.getByText(/Bu hesap türü kurumsal işveren hesabıdır/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 20: Employer ATS Kanban Dashboard', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-employer-1',
        email: 'ik@aselsankonya.com.tr',
        fullName: 'ASELSAN Konya İK',
        role: 'Employer',
        approvalStatus: 'Approved',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const employerBtn = page.getByRole('button', { name: '🏢 İşveren', exact: true });
    await employerBtn.click();
    await expect(page.getByText(/ATS İşe Alım Panosu/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 21: Employer Job Creation Wizard Launch', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-employer-1',
        email: 'ik@aselsankonya.com.tr',
        fullName: 'ASELSAN Konya İK',
        role: 'Employer',
        approvalStatus: 'Approved',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const employerBtn = page.getByRole('button', { name: '🏢 İşveren', exact: true });
    await employerBtn.click();

    const createJobBtn = page.getByRole('button', { name: /Yeni İlan Oluştur/i }).first();
    await createJobBtn.click();
    await expect(page.getByText(/Yeni İş veya Staj İlanı Oluşturma/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 22: Employer Bulk Candidate Email Modal', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-employer-1',
        email: 'ik@aselsankonya.com.tr',
        fullName: 'ASELSAN Konya İK',
        role: 'Employer',
        approvalStatus: 'Approved',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const employerBtn = page.getByRole('button', { name: '🏢 İşveren', exact: true });
    await employerBtn.click();

    const bulkMailBtn = page.getByRole('button', { name: /Toplu E-Posta/i }).first();
    await bulkMailBtn.click();
    await expect(page.getByText(/Toplu Bildirim ve E-Posta Gönderimi/i).first()).toBeVisible({ timeout: 5000 });
  });

  // ==========================================
  // SECTION 6: CAREER CENTER & ADMIN MODULE (Scenarios 23-30)
  // ==========================================

  test('Scenario 23: Career Center Cockpit Launch & Header Banner', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-career-center',
        email: 'kariyer@ktun.edu.tr',
        fullName: 'Kariyer Merkezi Yönetimi',
        role: 'CareerCenter',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const ccBtn = page.getByRole('button', { name: '🏛️ Kariyer Mer. (Admin)', exact: true });
    await ccBtn.click();

    await expect(page.getByText(/KTÜN Kariyer Gelişim ve Mezun İzleme Merkezi/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 24: Career Center — Company Approval & VKN Review Screen', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-career-center',
        email: 'kariyer@ktun.edu.tr',
        fullName: 'Kariyer Merkezi Yönetimi',
        role: 'CareerCenter',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const ccBtn = page.getByRole('button', { name: '🏛️ Kariyer Mer. (Admin)', exact: true });
    await ccBtn.click();

    const reviewBtn = page.getByRole('button', { name: /Firma Detayını Gör/i }).first();
    await reviewBtn.click();
    await expect(page.getByText(/Firma İnceleme Ekranı/i).first()).toBeVisible({ timeout: 5000 });

    const approveBtn = page.getByRole('button', { name: /Firmayı Onayla/i }).first();
    await approveBtn.click();
    await expect(page.getByText(/Firma vergi kimliği onaylandı/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 25: Career Center — Counseling Pool & Appointment Approval', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-career-center',
        email: 'kariyer@ktun.edu.tr',
        fullName: 'Kariyer Merkezi Yönetimi',
        role: 'CareerCenter',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const ccBtn = page.getByRole('button', { name: '🏛️ Kariyer Mer. (Admin)', exact: true });
    await ccBtn.click();

    const counselingTab = page.getByRole('button', { name: 'Danışmanlık', exact: true });
    await counselingTab.click();

    const actionBtn = page.getByRole('button', { name: 'Detay & İşlem Yap', exact: true }).first();
    await actionBtn.click();
    await expect(page.getByText(/Randevu Detayı/i).first()).toBeVisible({ timeout: 5000 });

    const saveApproveBtn = page.getByRole('button', { name: /Randevuyu Onayla/i }).first();
    await saveApproveBtn.click();
    await expect(page.getByText(/Randevu onaylandı/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 26: Career Center — Analytics & Report Export (PDF, Excel, CSV)', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-career-center',
        email: 'kariyer@ktun.edu.tr',
        fullName: 'Kariyer Merkezi Yönetimi',
        role: 'CareerCenter',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const ccBtn = page.getByRole('button', { name: '🏛️ Kariyer Mer. (Admin)', exact: true });
    await ccBtn.click();

    const analyticsTab = page.getByRole('button', { name: 'Analitik', exact: true });
    await analyticsTab.click();

    const exportBtn = page.getByRole('button', { name: /Kurumsal BI Raporu İndir/i }).first();
    await exportBtn.click();
    await expect(page.getByText(/Kurumsal BI Raporu İhraç Et/i).first()).toBeVisible({ timeout: 5000 });

    const pdfOption = page.getByText(/PDF Raporu/i).first();
    await pdfOption.click();
    await expect(page.getByText(/KTUN_Kariyer_Istihdam_BI_Raporu_2026.pdf/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 27: Admin User Management — Edit User & Role Change', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-career-center',
        email: 'kariyer@ktun.edu.tr',
        fullName: 'Kariyer Merkezi Yönetimi',
        role: 'CareerCenter',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const ccBtn = page.getByRole('button', { name: '🏛️ Kariyer Mer. (Admin)', exact: true });
    await ccBtn.click();

    const usersTab = page.getByRole('button', { name: 'Kullanıcı Yönetimi', exact: true });
    await usersTab.click();

    const editBtn = page.getByRole('button', { name: 'Düzenle', exact: true }).first();
    await editBtn.click();
    await expect(page.getByText(/Kullanıcı Hesabı Düzenleme/i).first()).toBeVisible({ timeout: 5000 });

    const saveChangesBtn = page.getByRole('button', { name: 'Değişiklikleri Kaydet', exact: true });
    await saveChangesBtn.click();
    await expect(page.getByText(/başarıyla güncellendi/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 28: Admin System Settings — Save & Redis Cache Flush', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-career-center',
        email: 'kariyer@ktun.edu.tr',
        fullName: 'Kariyer Merkezi Yönetimi',
        role: 'CareerCenter',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const ccBtn = page.getByRole('button', { name: '🏛️ Kariyer Mer. (Admin)', exact: true });
    await ccBtn.click();

    const settingsTab = page.getByRole('button', { name: 'Sistem Ayarları', exact: true });
    await settingsTab.click();

    const flushCacheBtn = page.getByRole('button', { name: /Redis Cache Flush/i }).first();
    await flushCacheBtn.click();
    await expect(page.getByText(/Redis Distributed Önbelleği başarıyla temizlendi/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 29: Admin RBAC Permission Matrix Verification', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-career-center',
        email: 'kariyer@ktun.edu.tr',
        fullName: 'Kariyer Merkezi Yönetimi',
        role: 'CareerCenter',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const ccBtn = page.getByRole('button', { name: '🏛️ Kariyer Mer. (Admin)', exact: true });
    await ccBtn.click();

    const rbacTab = page.getByRole('button', { name: 'Rol & RBAC Matrisi', exact: true });
    await rbacTab.click();
    await expect(page.getByText(/RBAC Yetkilendirme Matrisi/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Scenario 30: Admin Categorized Audit Log Viewer', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ktun_auth_user', JSON.stringify({
        id: 'usr-career-center',
        email: 'kariyer@ktun.edu.tr',
        fullName: 'Kariyer Merkezi Yönetimi',
        role: 'CareerCenter',
        emailVerified: true
      }));
      window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
    });

    await page.goto('/');
    const ccBtn = page.getByRole('button', { name: '🏛️ Kariyer Mer. (Admin)', exact: true });
    await ccBtn.click();

    const logsTab = page.getByRole('button', { name: 'Audit Logs', exact: true });
    await logsTab.click();
    await expect(page.getByText(/Kategorize Edilmiş Denetim Logları/i).first()).toBeVisible({ timeout: 5000 });
  });

});
