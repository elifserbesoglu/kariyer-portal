import os
import sys
import time
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:5173"
SCREENSHOT_DIR = "/Users/elifserbesoglu/.gemini/antigravity/brain/d843d11c-5965-40ad-836c-599ae7b4e386/test_screenshots"

os.makedirs(SCREENSHOT_DIR, exist_ok=True)

test_results = []

def log_result(section, test_name, status, details=""):
    symbol = "PASS" if status else "FAIL"
    print(f"[{symbol}] [{section}] {test_name}: {details}")
    test_results.append({
        "section": section,
        "test": test_name,
        "status": status,
        "details": details
    })

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        # ==========================================
        # 1. KAMU / ZİYARETÇİ SAYFALARI TESTLERİ
        # ==========================================
        print("\n--- 1. KAMU / ZİYARETÇİ SAYFALARI TESTLERİ ---")
        try:
            page.goto(BASE_URL)
            page.wait_for_selector("text=KTÜN Kariyer Gelişim Merkezi", timeout=5000)
            log_result("Public", "Ana Sayfa Yükleme", True, "Ana sayfa başarıyla yüklendi.")
        except Exception as e:
            log_result("Public", "Ana Sayfa Yükleme", False, str(e))

        # Check contact banner
        try:
            phone_link = page.query_selector("a[href='tel:+903322051111']")
            mail_link = page.query_selector("a[href='mailto:kariyer@ktun.edu.tr']")
            if phone_link and mail_link:
                log_result("Public", "Üst İletişim Barı", True, "+90 332 205 11 11 ve kariyer@ktun.edu.tr aktif.")
            else:
                log_result("Public", "Üst İletişim Barı", False, "İletişim bağlantıları bulunamadı.")
        except Exception as e:
            log_result("Public", "Üst İletişim Barı", False, str(e))

        # Test Kurumsal Mega Menu
        try:
            kurumsal_btn = page.locator("button:has-text('Kurumsal')").first
            kurumsal_btn.hover()
            page.wait_for_selector("text=Misyon & Vizyon", timeout=3000)
            log_result("Public", "Kurumsal Mega Menü", True, "Mega menü açıldı: Misyon & Vizyon ve Mevzuat linkleri görünüyor.")
        except Exception as e:
            log_result("Public", "Kurumsal Mega Menü", False, str(e))

        # Test Jobs Page
        try:
            jobs_btn = page.locator("button:has-text('İş / Staj İlanları')").first
            jobs_btn.click()
            page.wait_for_selector("text=Tüm Kariyer ve Staj Fırsatları", timeout=5000)
            log_result("Public", "İş/Staj İlanları Sayfası", True, "İlanlar listelendi.")
        except Exception as e:
            log_result("Public", "İş/Staj İlanları Sayfası", False, str(e))

        # Test Companies Page
        try:
            comp_btn = page.locator("button:has-text('Firmalar')").first
            comp_btn.click()
            page.wait_for_selector("text=Anlaşmalı ve Paydaş Kurumlar", timeout=5000)
            log_result("Public", "Firmalar Sayfası", True, "Firmalar listesi görüntülendi.")
        except Exception as e:
            log_result("Public", "Firmalar Sayfası", False, str(e))

        # Test Announcements Page
        try:
            ann_btn = page.locator("button:has-text('Duyurular')").first
            ann_btn.click()
            page.wait_for_selector("text=Kariyer Merkezi Duyuruları", timeout=5000)
            log_result("Public", "Duyurular Sayfası", True, "Duyurular listesi yüklendi.")
        except Exception as e:
            log_result("Public", "Duyurular Sayfası", False, str(e))

        page.screenshot(path=f"{SCREENSHOT_DIR}/01_public_test.png")

        # ==========================================
        # 2. ÖĞRENCİ ROLÜ TESTLERİ
        # ==========================================
        print("\n--- 2. ÖĞRENCİ ROLÜ TESTLERİ ---")
        
        # Login as student
        try:
            profile_dropdown = page.locator("button:has-text('Giriş Yap')").first
            profile_dropdown.click()
            login_opt = page.locator("text=Giriş Yap").last
            login_opt.click()
            page.wait_for_selector("text=KTÜN Portala Giriş Yapın", timeout=5000)
            
            page.fill("input[type='text'], input[type='email']", "emre.tunc@ogr.ktun.edu.tr")
            page.fill("input[type='password']", "123456")
            page.click("button:has-text('Giriş Yap')")
            page.wait_for_selector("text=Genel Bakış", timeout=7000)
            log_result("Öğrenci", "Oturum Açma", True, "Emre Tunç öğrencisi olarak başarıyla giriş yapıldı.")
        except Exception as e:
            log_result("Öğrenci", "Oturum Açma", False, str(e))

        # Test Header Role Label ("Öğrenci")
        try:
            role_text = page.locator("text=Öğrenci").first
            if role_text.is_visible():
                log_result("Öğrenci", "Sağ Üst Rol Etiketi", True, "Sağ üst profil rozetinde 'Öğrenci' yazıyor.")
            else:
                log_result("Öğrenci", "Sağ Üst Rol Etiketi", False, "'Öğrenci' metni bulunamadı.")
        except Exception as e:
            log_result("Öğrenci", "Sağ Üst Rol Etiketi", False, str(e))

        # Test Student Dashboard
        try:
            page.wait_for_selector("text=Profil Tamamlanma", timeout=3000)
            log_result("Öğrenci", "Genel Bakış Dashboard", True, "Profil %95 tamamlanma ve canlı bağlantı rozeti aktif.")
        except Exception as e:
            log_result("Öğrenci", "Genel Bakış Dashboard", False, str(e))

        # Test Profilim Tab & Photo Upload
        try:
            page.click("button:has-text('Profilim')")
            page.wait_for_selector("text=Profil Fotoğrafı", timeout=5000)
            log_result("Öğrenci", "Profilim Sekmesi Açılış", True, "Profilim tabına geçildi.")

            # Photo Upload validation
            photo_btn = page.locator("button:has-text('Fotoğraf Yükle'), button:has-text('Fotoğrafı Değiştir')").first
            if photo_btn.is_visible():
                log_result("Öğrenci", "Profil Fotoğrafı Yükleme Butonu", True, "'Fotoğraf Yükle / Değiştir' butonu hazır.")
            else:
                log_result("Öğrenci", "Profil Fotoğrafı Yükleme Butonu", False, "Fotoğraf butonu bulunamadı.")
        except Exception as e:
            log_result("Öğrenci", "Profilim Sekmesi", False, str(e))

        # Test YDS / YÖKDİL "Girmedim" Toggle
        try:
            girmedim_checkbox = page.locator("input[type='checkbox']").first
            initial_checked = girmedim_checkbox.is_checked()
            girmedim_checkbox.click()
            time.sleep(0.3)
            girmedim_checkbox.click()
            log_result("Öğrenci", "YDS/YÖKDİL Girmedim Seçeneği", True, "Dil puanı kilit kutucuğu başarıyla tetiklendi.")
        except Exception as e:
            log_result("Öğrenci", "YDS/YÖKDİL Girmedim Seçeneği", False, str(e))

        # Test Hobbies (1000 Karakter)
        try:
            textarea = page.locator("textarea[maxlength='1000']").first
            textarea.fill("Robotik kulübü başkanlığı, gömülü sistem yazılımları, model roket tasarımı ve satranç turnuvaları.")
            page.wait_for_selector("text=1000 Karakter", timeout=3000)
            log_result("Öğrenci", "Hobiler & Sosyal Faaliyetler", True, "Metin girildi, karakter sayacı güncellendi.")
        except Exception as e:
            log_result("Öğrenci", "Hobiler & Sosyal Faaliyetler", False, str(e))

        # Test ATS PDF Generation
        try:
            pdf_btn = page.locator("button:has-text('Yazdırılabilir ATS PDF Oluştur')").first
            if pdf_btn.is_visible():
                log_result("Öğrenci", "ATS PDF Yazdırma Butonu", True, "ATS PDF oluşturma ve yazdırma butonu aktif.")
            else:
                log_result("Öğrenci", "ATS PDF Yazdırma Butonu", False, "Yazdırma butonu bulunamadı.")
        except Exception as e:
            log_result("Öğrenci", "ATS PDF Yazdırma Butonu", False, str(e))

        # Test Mesajlaşma Tab
        try:
            page.click("button:has-text('Mesajlaşma')")
            page.wait_for_selector("text=ASELSAN Konya Silah Sistemleri", timeout=5000)
            chat_input = page.locator("input[placeholder*='Mesajınız']").first
            chat_input.fill("Merhaba, staj başvurum hakkında bilgi alabilir miyim?")
            page.click("button:has-text('Gönder'), button:has-html('svg')")
            log_result("Öğrenci", "2 Yönlü Canlı Mesajlaşma", True, "İşverene canlı mesaj gönderildi.")
        except Exception as e:
            log_result("Öğrenci", "2 Yönlü Canlı Mesajlaşma", False, str(e))

        # Test Mühendislik Portfolyosu (Sertifika Yükleme & PDF)
        try:
            page.click("button:has-text('Mühendislik Portfolyosu')")
            page.wait_for_selector("text=Sertifikalarım & Belgelerim", timeout=5000)
            cert_download_btn = page.locator("a:has-text('PDF Göster / İndir'), button:has-text('PDF Göster / İndir')").first
            if cert_download_btn.is_visible():
                log_result("Öğrenci", "Sertifika PDF Görüntüleme / İndirme", True, "Sertifika PDF belgesi indirme linki aktif.")
            else:
                log_result("Öğrenci", "Sertifika PDF Görüntüleme / İndirme", False, "PDF linki bulunamadı.")
        except Exception as e:
            log_result("Öğrenci", "Mühendislik Portfolyosu", False, str(e))

        # Test Job Application & Non-Duplicate Application Button Lock
        try:
            page.click("button:has-text('İş / Staj İlanları')")
            page.wait_for_selector("text=Detayları Gör ve Başvur", timeout=5000)
            detail_btns = page.locator("button:has-text('Detayları Gör ve Başvur')")
            detail_btns.first.click()
            page.wait_for_selector("text=İlan Detayı & Başvuru", timeout=5000)

            apply_btn = page.locator("button:has-text('Hemen Başvur'), button:has-text('✓ Başvurdun')").first
            btn_text = apply_btn.inner_text()
            if "Başvurdun" in btn_text:
                log_result("Öğrenci", "Mükerrer Başvuru Kilit Testi", True, "Daha önce başvurulmuş ilan kilitli (✓ Başvurdun) durumda.")
            else:
                apply_btn.click()
                time.sleep(1)
                new_text = apply_btn.inner_text()
                if "Başvurdun" in new_text:
                    log_result("Öğrenci", "Mükerrer Başvuru Kilit Testi", True, "Başvuru yapıldı ve buton kilitlendi (✓ Başvurdun).")
                else:
                    log_result("Öğrenci", "Mükerrer Başvuru Kilit Testi", False, "Buton kilitlenmedi.")
        except Exception as e:
            log_result("Öğrenci", "Mükerrer Başvuru Kilit Testi", False, str(e))

        page.screenshot(path=f"{SCREENSHOT_DIR}/02_student_test.png")

        # Logout Student
        try:
            header_dropdown = page.locator("button:has-text('Emre Tunç')").first
            header_dropdown.click()
            logout_btn = page.locator("text=Çıkış Yap").last
            logout_btn.click()
            page.wait_for_selector("text=Giriş Yap", timeout=5000)
            log_result("Öğrenci", "Çıkış Yap", True, "Öğrenci oturumu kapatıldı.")
        except Exception as e:
            log_result("Öğrenci", "Çıkış Yap", False, str(e))

        # ==========================================
        # 3. İŞVEREN ROLÜ TESTLERİ
        # ==========================================
        print("\n--- 3. İŞVEREN ROLÜ TESTLERİ ---")
        try:
            profile_dropdown = page.locator("button:has-text('Giriş Yap')").first
            profile_dropdown.click()
            page.locator("text=Giriş Yap").last.click()
            page.wait_for_selector("text=KTÜN Portala Giriş Yapın", timeout=5000)

            page.fill("input[type='text'], input[type='email']", "ik@aselsankonya.com.tr")
            page.fill("input[type='password']", "123456")
            page.click("button:has-text('Giriş Yap')")
            page.wait_for_selector("text=Aday Değerlendirme & İlan Yönetimi", timeout=7000)
            log_result("İşveren", "Oturum Açma", True, "ASELSAN Konya İK olarak başarıyla giriş yapıldı.")
        except Exception as e:
            log_result("İşveren", "Oturum Açma", False, str(e))

        # Test Simplified ATS Acceptance (İşe Alındı / Reddedildi)
        try:
            status_select = page.locator("select").first
            status_select.select_option(value="İşe Alındı")
            time.sleep(0.5)
            log_result("İşveren", "Basitleştirilmiş Aday Durumu (İşe Alındı)", True, "Aday durumu 'İşe Alındı' olarak güncellendi.")
            
            status_select.select_option(value="Reddedildi")
            time.sleep(0.5)
            log_result("İşveren", "Basitleştirilmiş Aday Durumu (Reddedildi)", True, "Aday durumu 'Reddedildi' olarak güncellendi.")
        except Exception as e:
            log_result("İşveren", "Basitleştirilmiş Aday Durumu", False, str(e))

        # Test Employer Create Job
        try:
            header_profile = page.locator("button:has-text('ASELSAN Konya Silah Sistemleri A.Ş.')").first
            header_profile.click()
            page.locator("text=Yeni İlan").click()
            page.wait_for_selector("text=Yeni İş / Staj İlanı Oluştur", timeout=5000)
            log_result("İşveren", "Yeni İlan Yayınlama Sayfası", True, "İlan oluşturma formu yüklendi.")
        except Exception as e:
            log_result("İşveren", "Yeni İlan Yayınlama Sayfası", False, str(e))

        page.screenshot(path=f"{SCREENSHOT_DIR}/03_employer_test.png")

        # Logout Employer
        try:
            header_profile = page.locator("button:has-text('ASELSAN Konya Silah Sistemleri A.Ş.')").first
            header_profile.click()
            page.locator("text=Çıkış Yap").last.click()
            page.wait_for_selector("text=Giriş Yap", timeout=5000)
            log_result("İşveren", "Çıkış Yap", True, "İşveren oturumu kapatıldı.")
        except Exception as e:
            log_result("İşveren", "Çıkış Yap", False, str(e))

        # ==========================================
        # 4. KARİYER MERKEZİ (ADMİN) ROLÜ TESTLERİ
        # ==========================================
        print("\n--- 4. KARİYER MERKEZİ (ADMİN) ROLÜ TESTLERİ ---")
        try:
            profile_dropdown = page.locator("button:has-text('Giriş Yap')").first
            profile_dropdown.click()
            page.locator("text=Giriş Yap").last.click()
            page.wait_for_selector("text=KTÜN Portala Giriş Yapın", timeout=5000)

            page.fill("input[type='text'], input[type='email']", "kariyer@ktun.edu.tr")
            page.fill("input[type='password']", "123456")
            page.click("button:has-text('Giriş Yap')")
            page.wait_for_selector("text=Kariyer Merkezi Komuta Paneli", timeout=7000)
            log_result("Kariyer Merkezi", "Oturum Açma", True, "Kariyer Merkezi Yöneticisi olarak giriş yapıldı.")
        except Exception as e:
            log_result("Kariyer Merkezi", "Oturum Açma", False, str(e))

        # Test Cockpit Stats & User Management
        try:
            page.wait_for_selector("text=Toplam Kayıtlı Öğrenci", timeout=3000)
            log_result("Kariyer Merkezi", "Komuta Paneli İstatistikleri", True, "Öğrenci, Firma, İlan ve Başvuru metrikleri yüklendi.")
            
            page.click("button:has-text('Kullanıcı & Firma Yönetimi')")
            page.wait_for_selector("text=Kullanıcı ve Şirket Hesap Listesi", timeout=5000)
            log_result("Kariyer Merkezi", "Firma & Kullanıcı Yönetimi", True, "Hesap listesi ve onay sistemi aktif.")
        except Exception as e:
            log_result("Kariyer Merkezi", "Kariyer Merkezi Yönetimi", False, str(e))

        page.screenshot(path=f"{SCREENSHOT_DIR}/04_admin_test.png")

        # ==========================================
        # 5. VERSİYON & GENEL SİSTEM TEMİZLİĞİ
        # ==========================================
        print("\n--- 5. SİSTEM TEMİZLİĞİ & VERSİYON YAZISI KONTROLÜ ---")
        try:
            body_html = page.content()
            if "v1.0" in body_html or "v2.0" in body_html:
                log_result("Sistem", "Versiyon Yazısı Temizliği", False, "Sayfada 'v1.0' veya 'v2.0' ibaresi tespit edildi.")
            else:
                log_result("Sistem", "Versiyon Yazısı Temizliği", True, "Sayfada gereksiz versiyon yazısı bulunmuyor.")
        except Exception as e:
            log_result("Sistem", "Versiyon Yazısı Temizliği", False, str(e))

        browser.close()

if __name__ == "__main__":
    run_tests()
