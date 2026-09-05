import React from 'react';
import { cn } from '../../utils/cn';
import { Avatar } from '../ui/Avatar';
import { Mail, Phone, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ProfileCardProps {
  name: string;
  title: string;
  avatar?: string;
  email?: string;
  phone?: string;
  department?: string;
  onAppointmentClick?: () => void;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  avatar,
  email,
  phone,
  department,
  onAppointmentClick,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-card-hover transition-all duration-200 flex flex-col sm:flex-row items-center justify-between gap-4',
        className
      )}
    >
      <div className="flex items-center gap-4 text-center sm:text-left">
        <Avatar src={avatar} name={name} size="lg" />
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">{name}</h4>
          <p className="text-xs font-semibold text-burgundy-700 dark:text-burgundy-400">{title}</p>
          {department && <p className="text-xs text-slate-500 dark:text-slate-400">{department}</p>}

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
            {email && (
              <a href={`mailto:${email}`} className="hover:text-burgundy-700 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="hover:text-burgundy-700 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {onAppointmentClick && (
        <Button variant="outline" size="sm" leftIcon={<Calendar className="w-3.5 h-3.5" />} onClick={onAppointmentClick}>
          Randevu Al
        </Button>
      )}
    </div>
  );
};

export const NotificationCard: React.FC<{
  title: string;
  time: string;
  read?: boolean;
  onMarkRead?: () => void;
  className?: string;
}> = ({ title, time, read = false, onMarkRead, className }) => {
  return (
    <div
      className={cn(
        'p-3.5 rounded-xl border transition-all duration-150 flex items-start justify-between gap-3',
        read
          ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 opacity-75'
          : 'bg-burgundy-50/40 dark:bg-burgundy-950/30 border-burgundy-200 dark:border-burgundy-900',
        className
      )}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={cn(
            'w-2 h-2 rounded-full mt-1.5 shrink-0',
            read ? 'bg-slate-300 dark:bg-slate-700' : 'bg-burgundy-700 animate-pulse'
          )}
        />
        <div>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">{title}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">{time}</span>
        </div>
      </div>
      {!read && onMarkRead && (
        <button
          onClick={onMarkRead}
          className="text-[10px] font-bold text-burgundy-700 hover:underline shrink-0"
        >
          Okundu İşaretle
        </button>
      )}
    </div>
  );
};
