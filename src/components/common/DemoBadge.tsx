import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface DemoBadgeProps {
  className?: string;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({ className = '' }) => {
  const { t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-teal-50 border border-teal-200 text-teal-800 shadow-sm ${className}`}
    >
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
      </span>
      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
      <span className="font-semibold">{t.demoBadge}</span>
      <span className="text-teal-600 hidden sm:inline">•</span>
      <span className="text-teal-700 hidden sm:inline">{t.demoSubtitle}</span>
    </div>
  );
};

export const DemoNoticeBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-sky-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-inner">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-teal-300 flex-shrink-0" />
        <span className="font-medium">
          <strong>Demo:</strong> {t.demoBanner}
        </span>
      </div>
      <div className="flex items-center gap-3 text-teal-100">
        <span className="bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono">ASHA Assistant UI v1.0</span>
        <span className="hidden md:inline text-teal-200 font-medium">Rural & Frontline Offline-First</span>
      </div>
    </div>
  );
};
