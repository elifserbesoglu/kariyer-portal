import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Shield,
  Code,
  Globe,
} from 'lucide-react';
import { usePublicRouter, type PublicPageRoute } from '../router/PublicRouter';
import { useAuth } from '../context/AuthContext';
import { KtunLogo } from '../components/ui/KtunLogo';

export const Footer: React.FC = () => {
  const { user } = useAuth();
  let navigate: (route: PublicPageRoute, params?: Record<string, string>) => void = () => {};
  try {
    const router = usePublicRouter();
    navigate = router.navigate;
  } catch (e) {
    // Fallback if not inside router
  }

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 transition-colors">
      <div className="max-w-1440 mx-auto px-4 md:px-8 space-y-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Institutional Info & Logo */}
          <div className="space-y-4">
            <KtunLogo size="lg" showSubtitle={true} className="[&_h1]:text-white [&_p]:text-burgundy-400" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Konya Teknik Üniversitesi Kariyer Gelişim ve Mezun İzleme Uygulama ve Araştırma Merkezi, öğrencilerimizin ve mezunlarımızın kariyer yolculuklarına profesyonel rehberlik sunar.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Shield className="w-4 h-4" />
              <span>Resmi Kurumsal Üniversite Portalı</span>
            </div>
          </div>

          {/* Col 2: Hızlı Bağlantılar */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-l-2 border-burgundy-700 pl-2">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('mission')} className="hover:text-white transition-colors">
                  Misyon & Vizyon
                </button>
              </li>
              <li>
                <button onClick={() => navigate('career-center')} className="hover:text-white transition-colors">
                  Kariyer Merkezi Hizmetleri
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-white transition-colors">
                  İletişim & Konum
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Fırsatlar & İlanlar */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-l-2 border-burgundy-700 pl-2">
              Fırsatlar & Portallar
            </h4>
            <ul className="space-y-2 text-xs">
              {user?.role !== 'Employer' && (
                <li>
                  <button onClick={() => navigate('jobs')} className="hover:text-white transition-colors">
                    İş & Staj İlanları
                  </button>
                </li>
              )}
              {user?.role !== 'Employer' && (
                <li>
                  <button onClick={() => navigate('companies')} className="hover:text-white transition-colors">
                    Anlaşmalı Kurumlar & Şirketler
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => navigate('announcements')} className="hover:text-white transition-colors">
                  Duyurular & Haberler
                </button>
              </li>
              <li>
                <button onClick={() => navigate('kvkk')} className="hover:text-white transition-colors">
                  KVKK Aydınlatma Metni
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: İletişim Bilgileri */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-l-2 border-burgundy-700 pl-2">
              İletişim & Konum
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-burgundy-400 shrink-0 mt-0.5" />
                <span>Akademi Mah. Yeni İstanbul Cad. No:235/1 Selçuklu / KONYA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-burgundy-400 shrink-0" />
                <span>+90 332 205 11 11</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-burgundy-400 shrink-0" />
                <span>kariyer@ktun.edu.tr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Line & Version Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 <strong>Konya Teknik Üniversitesi</strong> Kariyer Gelişim ve Mezun İzleme Uygulama ve Araştırma Merkezi. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700">
              Portal Version: v1.0.0
            </span>
          </div>
        </div>

        {/* Bottom Developer Credits Section */}
        <div className="pt-4 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-burgundy-400" />
            <span>
              <strong>Portal Design & Development:</strong> Mohammad Taha Mohammad Yar & Elif Serbesoğlu (Computer Engineer)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 hover:text-slate-300 transition-colors">
              <Globe className="w-3.5 h-3.5" />
              <span>KTÜN Computer Engineering</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
