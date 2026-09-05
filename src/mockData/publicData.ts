export interface JobItem {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  location: string;
  workType: 'Tam Zamanlı' | 'Yarı Zamanlı' | 'Uzaktan' | 'Hibrit';
  jobType: 'İş İlanı' | 'Staj İlanı';
  experience: string;
  department: string;
  publishedDate: string;
  deadline: string;
  isFeatured?: boolean;
  viewCount: number;
  sector: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  perks: string[];
}

export interface CompanyItem {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  sector: string;
  location: string;
  activeJobCount: number;
  about: string;
  partnershipDetails: string;
  website: string;
  email: string;
  phone: string;
  featured?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  day: string;
  month: string;
  fullDate: string;
  time: string;
  location: string;
  category: string;
  poster: string;
  capacity: number;
  registeredCount: number;
  description: string;
  speakers: { name: string; title: string; company: string; avatar: string }[];
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  isImportant?: boolean;
  attachments?: { name: string; size: string; type: string }[];
}

export interface CounselorItem {
  id: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  email: string;
  phone: string;
  specialties: string[];
  biography: string;
}

export interface ManagementItem {
  id: string;
  name: string;
  role: string;
  title: string;
  avatar: string;
  email: string;
  phone: string;
}

export const MOCK_COMPANIES: CompanyItem[] = [
  {
    id: 'aselsan',
    name: 'ASELSAN Konya',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    sector: 'Savunma Sanayii & Silah Sistemleri',
    location: 'Konya Teknoloji Endüstri Bölgesi, Selçuklu / KONYA',
    activeJobCount: 4,
    about:
      'ASELSAN Konya Silah Sistemleri A.Ş., Türk Silahlı Kuvvetleri ve dost ülke ordularının ihtiyaç duyduğu özgün silah sistemlerinin tasarımı, üretimi ve entegrasyonu alanında Konya Sanayisi ile stratejik ortaklık geliştiren öncü bir savunma teknolojisi kuruluşudur.',
    partnershipDetails:
      'Konya Teknik Üniversitesi ile yapılan Kurumsal İş Birliği Protokolü kapsamında; Mühendislik ve Doğa Bilimleri Fakültesi son sınıf öğrencilerine Aday Mühendislik Programı ve A-Gelecek Staj İmkânları sunulmaktadır.',
    website: 'https://www.aselsankonya.com.tr',
    email: 'ik@aselsankonya.com.tr',
    phone: '+90 332 220 50 00',
    featured: true,
  },
  {
    id: 'roketsan',
    name: 'ROKETSAN',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80',
    sector: 'Roket & Füze Sistemleri Sanayii',
    location: 'Elmadağ Yerleşkesi, Ankara',
    activeJobCount: 3,
    about:
      'ROKETSAN A.Ş., deniz seviyesinden uzayın derinliklerine kadar milli roket, füze ve mühimmat sistemlerinin tasarımından seri üretimine kadar uçtan uca savunma çözümleri geliştiren Türkiye’nin lider teknoloji kurumudur.',
    partnershipDetails:
      'KTÜN Makine, Havacılık ve Bilgisayar Mühendisliği mezunlarına yönelik yürütülen Talent-ROKETSAN staj ve bursiyerlik programları her yıl düzenli olarak açılmaktadır.',
    website: 'https://www.roketsan.com.tr',
    email: 'ik@roketsan.com.tr',
    phone: '+90 312 860 55 55',
    featured: true,
  },
  {
    id: 'havelsan',
    name: 'HAVELSAN',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    sector: 'Yazılım, Otonom Sistemler & Siber Güvenlik',
    location: 'Mustafa Kemal Mah., Çankaya / Ankara',
    activeJobCount: 2,
    about:
      'HAVELSAN; komuta kontrol, savunma teknolojileri, simülatör sistemleri ve dijital dönüşüm alanlarında karmaşık yazılım çözümleri üreten Türkiye’nin lider yazılım evidir.',
    partnershipDetails:
      'HAVELSAN EKO-SİSTEM programı ile KTÜN Bilgisayar ve Elektrik-Elektronik Mühendisliği öğrencilerine ortak bitirme projesi ve mentörlük desteği sağlanmaktadır.',
    website: 'https://www.havelsan.com.tr',
    email: 'insankaynaklari@havelsan.com.tr',
    phone: '+90 312 219 57 00',
    featured: true,
  },
  {
    id: 'tubitak-bilgem',
    name: 'TÜBİTAK BİLGEM',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&q=80',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    sector: 'Bilişim & Bilgi Güvenliği İleri Teknolojileri',
    location: 'Gebze Yerleşkesi, Kocaeli',
    activeJobCount: 2,
    about:
      'TÜBİTAK Bilişim ve Bilgi Güvenliği İleri Teknolojiler Araştırma Merkezi (BİLGEM), milli siber güvenlik ve kritik bilişim altyapıları üreten Türkiye’nin önde gelen bilim merkezidir.',
    partnershipDetails:
      'STAR Stajyer Araştırmacı Programı ve Lisans Son Sınıf Bitirme Projeleri desteği ile araştırmacı öğrenciler yetiştirilmektedir.',
    website: 'https://bilgem.tubitak.gov.tr',
    email: 'bilgem.ik@tubitak.gov.tr',
    phone: '+90 262 648 10 00',
    featured: true,
  },
  {
    id: 'akinsoft',
    name: 'AKINSOFT',
    logo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    sector: 'Kurumsal Yazılım & İnsansı Robotik',
    location: 'AKINROBOTICS Fabrikası, Selçuklu / KONYA',
    activeJobCount: 3,
    about:
      'Yerli ve milli imkânlarla insansı robot üretimi gerçekleştiren AKINSOFT ve AKINROBOTICS; yüksek teknoloji, yapay zeka ve ERP yazılımlarında Konya sanayisine yön vermektedir.',
    partnershipDetails:
      'AKINROBOTICS staj imkanları ve yerleşke teknik gezileri ile öğrencilere pratik robotik deneyimi sunulmaktadır.',
    website: 'https://www.akinsoft.com.tr',
    email: 'ik@akinsoft.com.tr',
    phone: '+90 444 40 80',
    featured: false,
  },
];

export const MOCK_JOBS: JobItem[] = [
  {
    id: 'job-1',
    companyId: 'aselsan',
    companyName: 'ASELSAN Konya',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80',
    title: 'Gömülü Yazılım Mühendisi (Aday Mühendislik)',
    location: 'Konya',
    workType: 'Tam Zamanlı',
    jobType: 'İş İlanı',
    experience: 'Yeni Mezun / Lisans 4. Sınıf',
    department: 'Bilgisayar veya Elektrik-Elektronik Mühendisliği',
    publishedDate: '10.05.2024',
    deadline: '15.06.2024',
    isFeatured: true,
    viewCount: 1420,
    sector: 'Savunma Sanayii',
    description:
      'ASELSAN Konya bünyesinde Silah ve Kule Sistemleri Direktörlüğünde görevlendirilmek üzere C/C++ ile gerçek zamanlı gömülü işletim sistemleri (FreeRTOS, VxWorks) geliştirecek yeni mezun veya aday mühendis çalışma arkadaşları arıyoruz.',
    responsibilities: [
      'Silah kule sistemleri denetim birimleri için C/C++ dilinde gömülü yazılım geliştirmek.',
      'CANBus, RS422, Ethernet haberleşme protokolleri mimarisini tasarlamak ve doğrulamak.',
      'Gerçek zamanlı sensör verilerini işleyerek algoritma optimizasyonu sağlamak.',
      'Yazılım birim testlerini (GoogleTest) oluşturmak ve dokümante etmek.',
    ],
    qualifications: [
      'KTÜN Bilgisayar Mühendisliği veya Elektrik-Elektronik Mühendisliği 4. Sınıf veya Yeni Mezun olmak.',
      'C ve C++ dillerinde en az orta/ileri seviye hakimiyet.',
      'Gömülü sistemler mimarisi (ARM Cortex-M/R/A) ve donanım şemalarını okuyabilme becerisi.',
      'İleri düzeyde İngilizce okuma ve teknik dokümantasyon yazma becerisi.',
    ],
    perks: ['Servis ve Geniş Ulaşım Ağı', 'Özel Sağlık Sigortası', 'Yüksek Lisans İzni', 'Yemekhane & Sosyal Tesisler'],
  },
  {
    id: 'job-2',
    companyId: 'roketsan',
    companyName: 'ROKETSAN',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
    title: 'Otonom Aviyonik Sistemler Stajyeri (Yaz Stajı)',
    location: 'Ankara / Elmadağ',
    workType: 'Tam Zamanlı',
    jobType: 'Staj İlanı',
    experience: 'Öğrenci (3. veya 4. Sınıf)',
    department: 'Havacılık ve Uzay, Makine, Elektrik-Elektronik Mühendisliği',
    publishedDate: '12.05.2024',
    deadline: '20.06.2024',
    isFeatured: true,
    viewCount: 980,
    sector: 'Roket & Füze Sanayii',
    description:
      'ROKETSAN 2024 Yaz Dönemi Staj Programı kapsamında fırlatma ve aviyonik denetim sistemlerinde görev alacak lisans öğrencilerine yönelik zorunlu veya isteğe bağlı staj imkanı sunulmaktadır.',
    responsibilities: [
      'Aviyonik kartların donanım ve yazılım test süreçlerine destek vermek.',
      'MATLAB/Simulink ortamında uçuş dinamiği simülasyonlarına katılmak.',
      'Staj süresince verilen bitirme projesini sunum halinde hazırlamak.',
    ],
    qualifications: [
      'KTÜN Mühendislik ve Doğa Bilimleri Fakültesi 3. veya 4. sınıf öğrencisi olmak.',
      'Genel Not Ortalamasının (GANO) 4.00 üzerinden en az 3.00 olması.',
      'Takım çalışmasına yatkın ve araştırmacı kişiliğe sahip olmak.',
    ],
    perks: ['Stajyer Ücreti', 'Konaklama ve Servis Desteği', 'Şirket İçi Eğitimler'],
  },
  {
    id: 'job-3',
    companyId: 'havelsan',
    companyName: 'HAVELSAN',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=120&q=80',
    title: 'Yapay Zeka & Görüntü İşleme Mühendisi',
    location: 'Ankara',
    workType: 'Tam Zamanlı',
    jobType: 'İş İlanı',
    experience: '0-2 Yıl Deneyim',
    department: 'Bilgisayar Mühendisliği / Yazılım Mühendisliği',
    publishedDate: '08.05.2024',
    deadline: '10.06.2024',
    isFeatured: false,
    viewCount: 840,
    sector: 'Otonom Sistemler',
    description:
      'Otonom kara ve hava araçları için Derin Öğrenme temelli nesne tespiti, takip algoritmaları ve görüntü işleme kütüphaneleri (PyTorch, OpenCV, TensorRT) geliştirecek ekip arkadaşı aranmaktadır.',
    responsibilities: [
      'Yapay zeka modellerini kenar cihazlarda (NVIDIA Jetson) optimizasyon ile çalıştırmak.',
      'Kamera ve Lidar verilerini sentezleyerek haritalama (SLAM) algoritmalarına katkı sağlamak.',
    ],
    qualifications: [
      'Python ve C++ dillerinde deneyimli olmak.',
      'PyTorch veya TensorFlow ile proje geliştirmiş olmak (GitHub veya Kaggle portfolyosu sunulmalıdır).',
    ],
    perks: ['Esnek Çalışma Saatleri', 'Spor Salonu Üyeliği', 'Doktora Teşvik Primi'],
  },
  {
    id: 'job-4',
    companyId: 'akinsoft',
    companyName: 'AKINSOFT',
    companyLogo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    title: 'Mobil Uygulama Geliştirici (Flutter / React Native)',
    location: 'Konya',
    workType: 'Tam Zamanlı',
    jobType: 'İş İlanı',
    experience: 'Yeni Mezun',
    department: 'Bilgisayar Mühendisliği / YBS',
    publishedDate: '14.05.2024',
    deadline: '30.06.2024',
    isFeatured: false,
    viewCount: 620,
    sector: 'Yazılım',
    description:
      'AKINSOFT kurumsal ERP çözümlerinin iOS ve Android mobil uygulamalarını geliştirmek üzere Flutter teknolojisine hakim yazılımcılar aranmaktadır.',
    responsibilities: ['Cross-platform mobil uygulamalar geliştirmek', 'RESTful API entegrasyonlarını tamamlamak.'],
    qualifications: ['Flutter veya React Native ile en az 1 yayınlanmış proje sahibi olmak.'],
    perks: ['Yemek Kartı', 'Servis', 'Kariyer Yükselme İmkânı'],
  },
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    title: 'KTÜN Kariyer ve İstihdam Günleri 2024',
    day: '15',
    month: 'MAY',
    fullDate: '15-16 Mayıs 2024 | 09:30 - 17:00',
    time: '09:30 - 17:00',
    location: 'Gelişim Yerleşkesi Mavi Salon & Fuaye Alanı',
    category: 'Kariyer Fuarı',
    poster: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    capacity: 1200,
    registeredCount: 890,
    description:
      '50’den fazla ulusal ve uluslararası firmanın katılımıyla gerçekleşecek olan geleneksel KTÜN Kariyer Günleri etkinliğinde; stant ziyaretleri, birebir CV mülakatları ve mülakat simülasyonları gerçekleştirilecektir.',
    speakers: [
      {
        name: 'Mustafa Yılmaz',
        title: 'İnsan Kaynakları Direktörü',
        company: 'ASELSAN Konya',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Dr. Zeynep Arslan',
        title: 'Ar-Ge Bölüm Başkanı',
        company: 'HAVELSAN',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      },
    ],
  },
  {
    id: 'event-2',
    title: 'Savunma Sanayiinde Kariyer ve Aday Mühendislik',
    day: '22',
    month: 'MAY',
    fullDate: '22 Mayıs 2024 | 14:00 - 16:00',
    time: '14:00 - 16:00',
    location: 'Mühendislik Fakültesi Amfi-2',
    category: 'Seminer',
    poster: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    capacity: 250,
    registeredCount: 210,
    description:
      'Savunma sanayiinde yerli ve milli projelerin geliştirilme süreçleri, aday mühendislik başvurularında dikkat edilen hususlar ve mülakat teknikleri üzerine uzman konuşmacılar bilgi paylaşımında bulunacaktır.',
    speakers: [
      {
        name: 'Ahmet Şahin',
        title: 'Sistem Tasarım Müdürü',
        company: 'ROKETSAN',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      },
    ],
  },
];

export const MOCK_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: '2023-2024 Yaz Dönemi Zorunlu Staj Başvuru Kılavuzu Yayınlandı',
    date: '10.05.2024',
    category: 'Staj Duyurusu',
    summary: 'Mühendislik ve Doğa Bilimleri Fakültesi öğrencilerinin yaz stajı onay süreçleri ve teslim edilecek evraklar açıklanmıştır.',
    content:
      'Konya Teknik Üniversitesi 2023-2024 Eğitim-Öğretim Yılı Yaz Dönemi Staj Başvuruları başlamıştır.\n\nStaj yapacak öğrencilerimizin Staj Başvuru Formu ve SGK Beyannamesini doldurarak ilgili Bölüm Staj Komisyonuna onaylatmaları gerekmektedir. İmzalı belgelerin en geç 07 Haziran 2024 tarihine kadar Kariyer Portalı üzerinden sisteme yüklenmesi gerekmektedir.',
    isImportant: true,
    attachments: [
      { name: 'Staj_Basvuru_Formu_2024.pdf', size: '1.2 MB', type: 'application/pdf' },
      { name: 'SGK_Beyanname_Formu.pdf', size: '450 KB', type: 'application/pdf' },
    ],
  },
  {
    id: 'ann-2',
    title: 'Yetenek Kapısı & Cumhurbaşkanlığı İnsan Kaynakları Ofisi Duyurusu',
    date: '05.05.2024',
    category: 'Genel Duyuru',
    summary: 'Ulusal Staj Programı kura sonuçları açıklanmıştır. Adayların teklifleri 5 iş günü içerisinde yanıtlaması gerekmektedir.',
    content:
      'Cumhurbaşkanlığı İnsan Kaynakları Ofisi tarafından yürütülen Ulusal Staj Programı kapsamında işverenler tarafından gönderilen staj teklifleri Yetenek Kapısı sistemi üzerinden yayınlanmıştır.\n\nTeklif alan öğrencilerimizin sistem üzerinden onay veya ret işlemlerini zamanında yapmaları rica olunur.',
    isImportant: false,
    attachments: [{ name: 'Ulusal_Staj_Programi_Kılavuz.pdf', size: '2.1 MB', type: 'application/pdf' }],
  },
];

export const MOCK_COUNSELORS: CounselorItem[] = [
  {
    id: 'c-1',
    name: 'Dr. Öğr. Üyesi Aylin Yılmaz',
    title: 'Kariyer Danışmanı & Akademik Koordinatör',
    department: 'Mühendislik ve Doğa Bilimleri Fakültesi',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    email: 'ayilmaz@ktun.edu.tr',
    phone: '+90 332 205 11 20',
    specialties: ['Mühendislik Kariyer Planlama', 'ATS Uyumlu CV Hazırlama', 'Yurt Dışı Yüksek Lisans & Burslar'],
    biography:
      'Konya Teknik Üniversitesi Kariyer Merkezinde 5 yılı aşkın süredir öğrencilerin özgeçmiş hazırlama, yetkinlik analizi ve teknoloji mülakatlarına hazırlık süreçlerini yürütmektedir.',
  },
  {
    id: 'c-2',
    name: 'Öğr. Gör. Mehmet Demir',
    title: 'Sanayi İş Birliği & Staj Danışmanı',
    department: 'Teknik Bilimler Meslek Yüksekokulu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    email: 'mdemir@ktun.edu.tr',
    phone: '+90 332 205 11 22',
    specialties: ['Sanayi & Üniversite Protokolleri', 'Aday Mühendislik Süreçleri', 'Mülakat Simülasyonu'],
    biography:
      'Savunma sanayii ve Konya sanayisi ile yürütülen ortak aday mühendislik projelerinin koordinasyonundan sorumludur.',
  },
];

export const MOCK_MANAGEMENT: ManagementItem[] = [
  {
    id: 'm-1',
    name: 'Prof. Dr. Ali Kahraman',
    role: 'Kariyer Merkezi Müdürü',
    title: 'Makine Mühendisliği Bölüm Başkanı',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    email: 'akahraman@ktun.edu.tr',
    phone: '+90 332 205 11 00',
  },
  {
    id: 'm-2',
    name: 'Doç. Dr. Selin Öztürk',
    role: 'Kariyer Merkezi Müdür Yardımcısı',
    title: 'Bilgisayar Mühendisliği Öğretim Üyesi',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    email: 'sozturk@ktun.edu.tr',
    phone: '+90 332 205 11 02',
  },
  {
    id: 'm-3',
    name: 'Dr. Öğr. Üyesi Burak Şahin',
    role: 'Mezun İzleme Koordinatörü',
    title: 'Elektrik-Elektronik Mühendisliği Öğretim Üyesi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    email: 'bsahin@ktun.edu.tr',
    phone: '+90 332 205 11 04',
  },
];

export const MOCK_FAQ = [
  {
    id: 'faq-1',
    title: 'Kariyer Portalı sistemine kimler giriş yapabilir?',
    content:
      'Konya Teknik Üniversitesi’nde aktif olarak öğrenim gören tüm ön lisans, lisans ve lisansüstü öğrencilerimiz ile KTÜN mezunlarımız e-Devlet veya OBS şifreleri ile giriş yapabilirler.',
  },
  {
    id: 'faq-2',
    title: 'İş veya staj başvurularımı nasıl takip edebilirim?',
    content:
      'Öğrenci profilinize giriş yaptıktan sonra "Başvurularım" sekmesinden başvuru durumunuzu (Ön Eleme, Mülakat Aşamasında, Onaylandı vb.) anlık olarak takip edebilirsiniz.',
  },
  {
    id: 'faq-3',
    title: 'Kariyer danışmanından nasıl randevu alabilirim?',
    content:
      'Portalımızda bulunan "Kariyer Danışmanları" sayfasından veya Öğrenci Paneli üzerinden uygun tarih ve saati seçerek birebir CV inceleme ve kariyer danışmanlığı randevusu oluşturabilirsiniz.',
  },
  {
    id: 'faq-4',
    title: 'İşveren olarak portalda nasıl ilan yayınlayabiliriz?',
    content:
      'İşveren kayıt formu üzerinden kurumsal vergi kimlik numaranız ile başvuru yapabilirsiniz. Kurumsal onayınız Kariyer Merkezimizce tamamlandıktan sonra ücretsiz olarak ilan yayınlayabilirsiniz.',
  },
];
