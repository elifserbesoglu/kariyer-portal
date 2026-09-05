# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scenarios.spec.ts >> KTÜN Kariyer Portalı — 30 Scenario Comprehensive Enterprise UAT & Functional QA Suite >> Scenario 09: Register Panel — Employer Form Validation & VKN Verification
- Location: tests/e2e/scenarios.spec.ts:83:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[placeholder="Örnek Teknoloji A.Ş."]')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: "KTÜN Portal (v21.0 Simplified Roles & Global Nav):"
      - generic [ref=e7]: 🔒 Oturum Kapalı (Anonim)
      - generic [ref=e8]: ⚡ Global Navigation Fixed
    - generic [ref=e9]:
      - button "🏛️ Public" [ref=e10]
      - button "🔑 Giriş Yap" [ref=e11]
      - button "🎓 Öğrenci / Mezun" [ref=e12]
      - button "🏢 İşveren" [ref=e13]
      - button "🏛️ Kariyer Mer. (Admin)" [ref=e14]
  - banner [ref=e15]:
    - generic [ref=e17]:
      - generic [ref=e18]:
        - link "+90 332 205 11 11" [ref=e19] [cursor=pointer]:
          - /url: tel:+903322051111
        - generic [ref=e23]: "|"
        - link "kariyer@ktun.edu.tr" [ref=e24] [cursor=pointer]:
          - /url: mailto:kariyer@ktun.edu.tr
      - button "🇹🇷 TR" [ref=e30]
    - generic [ref=e35]:
      - button [ref=e36]:
        - generic [ref=e37]:
          - img "Konya Teknik Üniversitesi Amblemi" [ref=e39]
          - generic [ref=e40]:
            - heading "KONYA TEKNİK ÜNİVERSİTESİ" [level=1] [ref=e41]
            - paragraph [ref=e43]: Kariyer Gelişim ve Mezun İzleme Uygulama ve Araştırma Merkezi
      - navigation [ref=e44]:
        - button "Ana Sayfa" [ref=e45]
        - button "Kurumsal" [ref=e47]
        - button "İş / Staj İlanları" [ref=e51]
        - button "Firmalar" [ref=e52]
        - button "Kariyer Hizmetleri" [ref=e53]
        - button "Mezun Ağı" [ref=e54]
        - button "Duyurular" [ref=e55]
        - button "İletişim" [ref=e56]
      - button "GİR Giriş Yap Kullanıcı Paneli" [ref=e60]:
        - generic [ref=e61]: GİR
        - generic [ref=e63]:
          - generic [ref=e64]: Giriş Yap
          - generic [ref=e65]: Kullanıcı Paneli
  - main [ref=e68]:
    - generic [ref=e71]:
      - generic [ref=e72]:
        - heading "Yeni Hesap Oluştur" [level=2] [ref=e73]
        - paragraph [ref=e74]: Kariyer Portalına katılmak için hesap türünüzü seçiniz.
      - generic [ref=e75]:
        - button "Öğrenci / Mezun Kaydı" [ref=e76]
        - button "İşveren Kaydı" [active] [ref=e82]
      - generic [ref=e89]:
        - generic [ref=e90]: İşveren kayıtları güvenlik amacıyla Kariyer Merkezi onayına tabidir. Hesabınız incelendikten sonra aktif edilecektir.
        - generic [ref=e94]:
          - generic [ref=e95]: Firma / Kurum Adı*
          - textbox "Firma / Kurum Adı*" [ref=e97]:
            - /placeholder: ör. ASELSAN Konya Silah Sistemleri A.Ş.
        - generic [ref=e98]:
          - generic [ref=e99]:
            - generic [ref=e100]: Vergi Kimlik Numarası (VKN)*
            - textbox "Vergi Kimlik Numarası (VKN)*" [ref=e102]:
              - /placeholder: 10 haneli vergi no
          - generic [ref=e103]:
            - generic [ref=e104]: Yetkili Kişi (Ad Soyad)*
            - textbox "Yetkili Kişi (Ad Soyad)*" [ref=e106]:
              - /placeholder: İletişim kişisi...
        - generic [ref=e107]:
          - generic [ref=e108]:
            - generic [ref=e109]: Telefon Numarası*
            - textbox "Telefon Numarası*" [ref=e111]:
              - /placeholder: +90 332 000 00 00
          - generic [ref=e112]:
            - generic [ref=e113]: Kurumsal E-Posta Adresi*
            - textbox "Kurumsal E-Posta Adresi*" [ref=e115]:
              - /placeholder: ik@kurum.com
        - generic [ref=e116]:
          - generic [ref=e117]: Şifre*
          - textbox "Şifre*" [ref=e119]:
            - /placeholder: En az 6 karakter
        - generic [ref=e120] [cursor=pointer]:
          - checkbox "Kurumsal verilerimin onay süreçlerinde işlenmesini kabul ediyorum." [ref=e122]
          - generic [ref=e126]: Kurumsal verilerimin onay süreçlerinde işlenmesini kabul ediyorum.
        - button "İşveren Kaydını Oluştur (Onay Bekler)" [ref=e128]
      - generic [ref=e134]:
        - text: Zaten hesabınız var mı?
        - button "Giriş Yapın" [ref=e135]
  - contentinfo [ref=e136]:
    - generic [ref=e137]:
      - generic [ref=e138]:
        - generic [ref=e139]:
          - generic [ref=e140]:
            - img "Konya Teknik Üniversitesi Amblemi" [ref=e142]
            - generic [ref=e143]:
              - heading "KONYA TEKNİK ÜNİVERSİTESİ" [level=1] [ref=e144]
              - paragraph [ref=e146]: Kariyer Gelişim ve Mezun İzleme Uygulama ve Araştırma Merkezi
          - paragraph [ref=e147]: Konya Teknik Üniversitesi Kariyer Gelişim ve Mezun İzleme Uygulama ve Araştırma Merkezi, öğrencilerimizin ve mezunlarımızın kariyer yolculuklarına profesyonel rehberlik sunar.
          - generic [ref=e148]: Resmi Kurumsal Üniversite Portalı
        - generic [ref=e152]:
          - heading "Hızlı Bağlantılar" [level=4] [ref=e153]
          - list [ref=e154]:
            - listitem [ref=e155]:
              - button "Hakkımızda" [ref=e156]
            - listitem [ref=e157]:
              - button "Misyon & Vizyon" [ref=e158]
            - listitem [ref=e159]:
              - button "Kariyer Merkezi Hizmetleri" [ref=e160]
            - listitem [ref=e161]:
              - button "Kariyer Danışmanları" [ref=e162]
            - listitem [ref=e163]:
              - button "Yönetim Kadrosu" [ref=e164]
        - generic [ref=e165]:
          - heading "Fırsatlar & Portallar" [level=4] [ref=e166]
          - list [ref=e167]:
            - listitem [ref=e168]:
              - button "İş & Staj İlanları" [ref=e169]
            - listitem [ref=e170]:
              - button "Anlaşmalı Kurumlar & Şirketler" [ref=e171]
            - listitem [ref=e172]:
              - button "Kariyer Hizmetleri & Danışmanlık" [ref=e173]
            - listitem [ref=e174]:
              - button "Duyurular & Haberler" [ref=e175]
            - listitem [ref=e176]:
              - button "KVKK Aydınlatma Metni" [ref=e177]
        - generic [ref=e178]:
          - heading "İletişim & Konum" [level=4] [ref=e179]
          - generic [ref=e180]:
            - generic [ref=e181]: Akademi Mah. Yeni İstanbul Cad. No:235/1 Selçuklu / KONYA
            - generic [ref=e186]: +90 332 205 11 11
            - generic [ref=e190]: kariyer@ktun.edu.tr
      - generic [ref=e195]:
        - generic [ref=e196]:
          - text: © 2026
          - strong [ref=e197]: Konya Teknik Üniversitesi
          - text: Kariyer Gelişim ve Mezun İzleme Uygulama ve Araştırma Merkezi. Tüm hakları saklıdır.
        - generic [ref=e198]: "Portal Version: v1.0.0"
      - generic [ref=e200]:
        - generic [ref=e205]:
          - strong [ref=e206]: "Portal Design & Development:"
          - text: Mohammad Taha Mohammad Yar & Elif Serbesoğlu (Computer Engineer)
        - generic [ref=e207]: KTÜN Computer Engineering
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('KTÜN Kariyer Portalı — 30 Scenario Comprehensive Enterprise UAT & Functional QA Suite', () => {
  4   | 
  5   |   // ==========================================
  6   |   // SECTION 1: PUBLIC NAVIGATION & BRANDING AUDIT (Scenarios 1-6)
  7   |   // ==========================================
  8   | 
  9   |   test('Scenario 01: Home Page Render & Official Brand Logo Audit', async ({ page }) => {
  10  |     await page.goto('/#/home');
  11  |     await expect(page.getByText(/Kariyer Yolculuğunu Buradan Başlat/i).first()).toBeVisible({ timeout: 5000 });
  12  |     const logoImg = page.locator('img[alt="Konya Teknik Üniversitesi Amblemi"]').first();
  13  |     await expect(logoImg).toBeVisible({ timeout: 5000 });
  14  |   });
  15  | 
  16  |   test('Scenario 02: Public Navigation — Corporate Pages (About, Mission, Vision)', async ({ page }) => {
  17  |     await page.goto('/#/about');
  18  |     await expect(page.getByText(/Hakkımızda/i).first()).toBeVisible({ timeout: 5000 });
  19  |     await page.goto('/#/mission');
  20  |     await expect(page.getByText(/Misyon & Vizyon/i).first()).toBeVisible({ timeout: 5000 });
  21  |   });
  22  | 
  23  |   test('Scenario 03: Public Navigation — Job Search & Filter Page', async ({ page }) => {
  24  |     await page.goto('/#/jobs');
  25  |     await expect(page.getByText(/İş ve Staj İlanları/i).first()).toBeVisible({ timeout: 5000 });
  26  |     const searchInput = page.locator('input[placeholder*="Pozisyon"]').first();
  27  |     await searchInput.fill('ASELSAN');
  28  |     await expect(page.getByText(/ASELSAN/i).first()).toBeVisible({ timeout: 5000 });
  29  |   });
  30  | 
  31  |   test('Scenario 04: Public Navigation — Companies Directory & Detail', async ({ page }) => {
  32  |     await page.goto('/#/companies');
  33  |     await expect(page.getByText(/Anlaşmalı Kurumlar/i).first()).toBeVisible({ timeout: 5000 });
  34  |     await page.goto('/#/company-detail?id=aselsan');
  35  |     await expect(page.getByText(/ASELSAN Konya/i).first()).toBeVisible({ timeout: 5000 });
  36  |   });
  37  | 
  38  |   test('Scenario 05: Public Navigation — Career Counselors Page', async ({ page }) => {
  39  |     await page.goto('/#/counselors');
  40  |     await expect(page.getByText(/Kariyer Danışmanları/i).first()).toBeVisible({ timeout: 5000 });
  41  |   });
  42  | 
  43  |   test('Scenario 06: Public Navigation — Contact & Legal KVKK Pages', async ({ page }) => {
  44  |     await page.goto('/#/contact');
  45  |     await expect(page.getByText(/İletişim/i).first()).toBeVisible({ timeout: 5000 });
  46  |     await page.goto('/#/kvkk');
  47  |     await expect(page.getByText(/KVKK/i).first()).toBeVisible({ timeout: 5000 });
  48  |   });
  49  | 
  50  |   // ==========================================
  51  |   // SECTION 2: AUTHENTICATION & REGISTER FLOWS (Scenarios 7-10)
  52  |   // ==========================================
  53  | 
  54  |   test('Scenario 07: Public Visitor Application Triggers Login Required Modal', async ({ page }) => {
  55  |     await page.goto('/#/job-detail');
  56  |     const applyBtn = page.getByRole('button', { name: 'Hemen Başvur', exact: true });
  57  |     await expect(applyBtn).toBeVisible({ timeout: 5000 });
  58  |     await applyBtn.click();
  59  |     await expect(page.getByText(/Giriş Yapılması Gerekiyor/i).first()).toBeVisible({ timeout: 5000 });
  60  |   });
  61  | 
  62  |   test('Scenario 08: Register Panel — Student Form Validation & Submission', async ({ page }) => {
  63  |     await page.goto('/');
  64  |     const loginNavBtn = page.getByRole('button', { name: '🔑 Giriş Yap', exact: true });
  65  |     await loginNavBtn.click();
  66  | 
  67  |     const registerLinkBtn = page.getByRole('button', { name: 'Hemen Kaydolun', exact: true });
  68  |     await registerLinkBtn.click();
  69  | 
  70  |     await page.locator('input[placeholder="Adınız..."]').fill('Selim');
  71  |     await page.locator('input[placeholder="Soyadınız..."]').fill('Kaya');
  72  |     await page.locator('input[placeholder="11 haneli T.C. No"]').fill('12345678901');
  73  |     await page.locator('input[placeholder="ör. 20120033001"]').fill('20120033999');
  74  |     await page.locator('input[placeholder="kullanici@ogr.ktun.edu.tr"]').fill('selim.kaya@ogr.ktun.edu.tr');
  75  |     await page.locator('input[placeholder="En az 6 karakter"]').fill('123456');
  76  |     await page.locator('input[type="checkbox"]').check({ force: true });
  77  | 
  78  |     const submitBtn = page.getByRole('button', { name: 'Öğrenci Kaydını Tamamla', exact: true });
  79  |     await submitBtn.click({ noWaitAfter: true });
  80  |     await expect(page.getByText(/Öğrenci kaydınız başarıyla oluşturulmuştur/i).first()).toBeVisible({ timeout: 5000 });
  81  |   });
  82  | 
  83  |   test('Scenario 09: Register Panel — Employer Form Validation & VKN Verification', async ({ page }) => {
  84  |     await page.goto('/');
  85  |     const loginNavBtn = page.getByRole('button', { name: '🔑 Giriş Yap', exact: true });
  86  |     await loginNavBtn.click();
  87  | 
  88  |     const registerLinkBtn = page.getByRole('button', { name: 'Hemen Kaydolun', exact: true });
  89  |     await registerLinkBtn.click();
  90  | 
  91  |     const employerTabBtn = page.getByRole('button', { name: 'İşveren Kaydı', exact: true });
  92  |     await employerTabBtn.click();
  93  | 
> 94  |     await page.locator('input[placeholder="Örnek Teknoloji A.Ş."]').fill('Yeni Teknoloji A.Ş.');
      |                                                                     ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  95  |     await page.locator('input[placeholder="10 Haneli Vergi Kimlik No"]').fill('9876543210');
  96  |     await page.locator('input[placeholder="ör. Meram V.D."]').fill('Selçuklu V.D.');
  97  |     await page.locator('input[placeholder="Ad Soyad..."]').fill('Ahmet Yılmaz');
  98  |     await page.locator('input[placeholder="ik@sirketiniz.com"]').fill('ik@yeni-teknoloji.com');
  99  |     await page.locator('input[placeholder="En az 6 karakter"]').fill('123456');
  100 |     await page.locator('input[type="checkbox"]').check({ force: true });
  101 | 
  102 |     const submitBtn = page.getByRole('button', { name: 'İşveren Kaydını Gönder', exact: true });
  103 |     await submitBtn.click({ noWaitAfter: true });
  104 |     await expect(page.getByText(/İşveren kaydınız alınmıştır/i).first()).toBeVisible({ timeout: 5000 });
  105 |   });
  106 | 
  107 |   test('Scenario 10: Forgot Password Modal Flow', async ({ page }) => {
  108 |     await page.goto('/');
  109 |     const loginNavBtn = page.getByRole('button', { name: '🔑 Giriş Yap', exact: true });
  110 |     await loginNavBtn.click();
  111 | 
  112 |     const forgotBtn = page.getByRole('button', { name: 'Şifrenizi mi unuttunuz?', exact: true });
  113 |     await forgotBtn.click();
  114 |     await expect(page.getByText(/Şifre Sıfırlama Bağlantısı Gönder/i).first()).toBeVisible({ timeout: 5000 });
  115 |   });
  116 | 
  117 |   // ==========================================
  118 |   // SECTION 3: STUDENT DASHBOARD & CV BUILDER (Scenarios 11-15)
  119 |   // ==========================================
  120 | 
  121 |   test('Scenario 11: Student Role Application Modal & Submission', async ({ page }) => {
  122 |     await page.addInitScript(() => {
  123 |       window.localStorage.setItem('ktun_auth_user', JSON.stringify({
  124 |         id: 'usr-student-1',
  125 |         email: 'emre.tunc@ogr.ktun.edu.tr',
  126 |         fullName: 'Emre Tunç',
  127 |         role: 'Student',
  128 |         emailVerified: true
  129 |       }));
  130 |       window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
  131 |     });
  132 | 
  133 |     await page.goto('/#/job-detail');
  134 |     const applyBtn = page.getByRole('button', { name: 'Hemen Başvur', exact: true });
  135 |     await expect(applyBtn).toBeVisible({ timeout: 5000 });
  136 |     await applyBtn.click();
  137 | 
  138 |     await expect(page.getByText(/İş Başvurusu Gönder/i).first()).toBeVisible({ timeout: 5000 });
  139 |     const finishBtn = page.getByRole('button', { name: 'Başvuruyu Tamamla' });
  140 |     await finishBtn.click();
  141 |     await expect(page.getByText(/Başvurunuz Başarıyla İletildi/i).first()).toBeVisible({ timeout: 5000 });
  142 |   });
  143 | 
  144 |   test('Scenario 12: Student CV Builder — Manual Save Action & Feedback', async ({ page }) => {
  145 |     await page.addInitScript(() => {
  146 |       window.localStorage.setItem('ktun_auth_user', JSON.stringify({
  147 |         id: 'usr-student-1',
  148 |         email: 'emre.tunc@ogr.ktun.edu.tr',
  149 |         fullName: 'Emre Tunç',
  150 |         role: 'Student',
  151 |         emailVerified: true
  152 |       }));
  153 |       window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
  154 |     });
  155 | 
  156 |     await page.goto('/');
  157 |     const studentBtn = page.getByRole('button', { name: '🎓 Öğrenci / Mezun', exact: true });
  158 |     await studentBtn.click();
  159 | 
  160 |     const saveCvBtn = page.getByRole('button', { name: 'CV Kaydet', exact: true });
  161 |     await expect(saveCvBtn).toBeVisible({ timeout: 5000 });
  162 |     await saveCvBtn.click();
  163 |     await expect(page.getByText(/CV verileriniz başarıyla veritabanına kaydedildi/i).first()).toBeVisible({ timeout: 5000 });
  164 |   });
  165 | 
  166 |   test('Scenario 13: Student CV Builder — Live CV Preview Modal', async ({ page }) => {
  167 |     await page.addInitScript(() => {
  168 |       window.localStorage.setItem('ktun_auth_user', JSON.stringify({
  169 |         id: 'usr-student-1',
  170 |         email: 'emre.tunc@ogr.ktun.edu.tr',
  171 |         fullName: 'Emre Tunç',
  172 |         role: 'Student',
  173 |         emailVerified: true
  174 |       }));
  175 |       window.localStorage.setItem('ktun_auth_tokens', JSON.stringify({ accessToken: 'mock-token' }));
  176 |     });
  177 | 
  178 |     await page.goto('/');
  179 |     const studentBtn = page.getByRole('button', { name: '🎓 Öğrenci / Mezun', exact: true });
  180 |     await studentBtn.click();
  181 | 
  182 |     const previewCvBtn = page.getByRole('button', { name: 'CV Önizle', exact: true });
  183 |     await expect(previewCvBtn).toBeVisible({ timeout: 5000 });
  184 |     await previewCvBtn.click();
  185 |     await expect(page.getByText(/Özgeçmiş Canlı Önizleme/i).first()).toBeVisible({ timeout: 5000 });
  186 |   });
  187 | 
  188 |   test('Scenario 14: Student Counselor Appointment Booking', async ({ page }) => {
  189 |     await page.addInitScript(() => {
  190 |       window.localStorage.setItem('ktun_auth_user', JSON.stringify({
  191 |         id: 'usr-student-1',
  192 |         email: 'emre.tunc@ogr.ktun.edu.tr',
  193 |         fullName: 'Emre Tunç',
  194 |         role: 'Student',
```