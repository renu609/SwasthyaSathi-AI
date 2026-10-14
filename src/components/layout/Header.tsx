import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Languages,
  AlertOctagon,
  RefreshCw,
  Calendar,
  X
} from 'lucide-react';
import { DEMO_METADATA } from '../../data/syntheticData';
import { DemoBadge } from '../common/DemoBadge';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  onEmergencyClick: () => void;
  onSearchChange?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileMenu,
  onEmergencyClick,
  onSearchChange
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 1200);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Page Breadcrumb / Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {t.greeting}
              </h1>
              <span className="hidden sm:inline-block text-xs text-slate-400">|</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {t.currentDate}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              {t.portalSubtitle}
            </p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  if (onSearchChange) onSearchChange('');
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Synthetic Demo pill */}
          <div className="hidden xl:block">
            <DemoBadge />
          </div>

          {/* Offline Sync Status Button */}
          <button
            onClick={handleSync}
            title="Click to trigger manual offline cache sync"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-teal-600 ${syncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">
              {syncing ? t.syncing : t.offlineReady}
            </span>
          </button>

          {/* Language Toggle: EN / తెలుగు */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                language === 'en'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                language === 'te'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              తెలుగు
            </button>
          </div>

          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative focus:outline-none"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Notification Menu Flyout */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 text-xs">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-slate-800 text-sm">{t.notificationsTitle}</span>
                  <span className="text-[11px] text-sky-600 font-medium cursor-pointer">{t.markAllRead}</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  <div className="p-3 hover:bg-slate-50 transition-colors">
                    <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-700 rounded mb-1">
                      {language === 'te' ? 'అత్యవసర రిఫరల్' : 'Urgent Referral'}
                    </span>
                    <p className="font-medium text-slate-800">
                      {language === 'te' ? 'మీరా బాయి BP 150/98 mmHg' : 'Meera Bai BP 150/98 mmHg'}
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      {language === 'te' ? 'రాంపూర్ CHC లో డాక్టర్ అపాయింట్‌మెంట్ ఖరారైంది (సాయంత్రం 4:00).' : 'Doctor appointment confirmed at Rampur CHC for 4:00 PM.'}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {language === 'te' ? '15 నిమిషాల క్రితం' : '15 minutes ago'}
                    </span>
                  </div>
                  <div className="p-3 hover:bg-slate-50 transition-colors">
                    <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded mb-1">
                      {language === 'te' ? 'టీకా రిమైండర్' : 'Vaccine Reminder'}
                    </span>
                    <p className="font-medium text-slate-800">
                      {language === 'te' ? 'ఆరవ్ కుమార్ కోసం MR-1 బూస్టర్' : 'MR-1 Booster for Aarav Kumar'}
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      {language === 'te' ? 'ఈ రోజు అంగన్‌వాడీ సెషన్‌లో ఏర్పాటు చేయబడింది.' : 'Scheduled during Anganwadi session today.'}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {language === 'te' ? '1 గంట క్రితం' : '1 hour ago'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SOS Escalation Button */}
          <button
            onClick={onEmergencyClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/30 transition-all active:scale-95"
            title="Immediate emergency escalation to Medical Officer or 108 Ambulance"
          >
            <AlertOctagon className="w-4 h-4" />
            <span className="hidden sm:inline">{t.sosTriage}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
