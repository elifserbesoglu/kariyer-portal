import React from 'react';
import { cn } from '../utils/cn';
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  Heart,
  Bell,
  MessageSquare,
  Settings,
  Search,
} from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  active?: boolean;
}

export interface SidebarProps {
  activeItem?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem = 'dashboard',
  onSelect,
  className,
}) => {
  const menuItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'Profilim', icon: <User className="w-4 h-4" /> },
    { id: 'cv', label: 'CV Yönetimi', icon: <FileText className="w-4 h-4" /> },
    { id: 'applications', label: 'Başvurularım', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'favorites', label: 'Favori İlanlarım', icon: <Heart className="w-4 h-4" /> },
    { id: 'announcements', label: 'Duyurular', icon: <Bell className="w-4 h-4" /> },
    { id: 'messages', label: 'Mesajlarım', icon: <MessageSquare className="w-4 h-4" />, badge: 2 },
    { id: 'settings', label: 'Ayarlar', icon: <Settings className="w-4 h-4" /> },
  ];

  const quickActions = [
    { id: 'cv-create', label: 'CV Oluştur / Güncelle', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'job-search', label: 'İlan Ara', icon: <Search className="w-3.5 h-3.5" /> },
  ];

  return (
    <aside className={cn('w-64 shrink-0 space-y-6', className)}>
      {/* Navigation Menu Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-sm space-y-1">
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect && onSelect(item.id)}
              className={cn(
                'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150',
                isActive
                  ? 'bg-burgundy-50 dark:bg-burgundy-950/60 text-burgundy-700 dark:text-burgundy-400 font-extrabold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(isActive ? 'text-burgundy-700 dark:text-burgundy-400' : 'text-slate-400')}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="w-4 h-4 rounded-full bg-burgundy-700 text-white text-[10px] font-extrabold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Actions Card matching reference image */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Hızlı İşlemler</h4>
        <div className="space-y-1.5">
          {quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <span className="text-slate-400">{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
