import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Users,
  CalendarCheck,
  Bell,
  LineChart,
  FileText,
  Settings,
  HeartPulse,
  Wifi,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { NavItemId } from '../../types';
import { DEMO_METADATA } from '../../data/syntheticData';
import { useLanguage } from '../../context/LanguageContext';

interface SidebarProps {
  activeTab: NavItemId;
  onSelectTab: (tab: NavItemId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItemConfig {
  id: NavItemId;
  label: string;
  teluguLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  teluguBadge?: string;
  badgeVariant?: 'blue' | 'teal' | 'amber' | 'rose';
  isAi?: boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    teluguLabel: 'డ్యాష్‌బోర్డ్',
    icon: LayoutDashboard
  },
  {
    id: 'assistant',
    label: 'AI Health Assistant',
    teluguLabel: 'AI ఆరోగ్య సహాయకుడు',
    icon: Bot,
    badge: 'Smart Triage',
    teluguBadge: 'స్మార్ట్ సలహా',
    badgeVariant: 'teal',
    isAi: true
  },
  {
    id: 'households',
    label: 'Households',
    teluguLabel: 'కుటుంబాలు',
    icon: Users,
    badge: '248',
    teluguBadge: '248',
    badgeVariant: 'blue'
  },
  {
    id: 'field-visits',
    label: 'Field Visits',
    teluguLabel: 'క్షేత్ర పర్యటనలు',
    icon: CalendarCheck,
    badge: '3 Due',
    teluguBadge: '3 పెండింగ్',
    badgeVariant: 'amber'
  },
  {
    id: 'reminders',
    label: 'Reminders',
    teluguLabel: 'రిమైండర్లు',
    icon: Bell,
    badge: '6 Today',
    teluguBadge: 'నేడు 6',
    badgeVariant: 'rose'
  },
  {
    id: 'insights',
    label: 'Community Insights',
    teluguLabel: 'కమ్యూనిటీ విశ్లేషణ',
    icon: LineChart
  },
  {
    id: 'reports',
    label: 'Reports',
    teluguLabel: 'నివేదికలు',
    icon: FileText
  },
  {
    id: 'settings',
    label: 'Settings',
    teluguLabel: 'సెట్టింగ్‌లు',
    icon: Settings
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  mobileOpen,
  onCloseMobile
}) => {
  const { language, t } = useLanguage();

  const handleNavClick = (tabId: NavItemId) => {
    onSelectTab(tabId);
    if (mobileOpen) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 shadow-sm w-72">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-teal-600 to-sky-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-slate-900">
                {language === 'te' ? 'స్వాస్థ్యసాథి' : 'SwasthyaSathi'}
              </span>
              <span className="text-[10px] uppercase font-extrabold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded tracking-wider">AI</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'te' ? 'గ్రామీణ ఆరోగ్య రక్షణ • Rural Care' : 'Rural Healthcare Companion'}
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Frontline Worker Area Tag */}
      <div className="px-5 py-3 bg-gradient-to-r from-sky-50 to-teal-50 border-b border-sky-100/60">
        <div className="flex items-center justify-between text-xs">
          <span className="text-sky-900 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>
            {language === 'te' ? 'ఆశా సెక్టార్ 4' : 'ASHA Sector 4'}
          </span>
          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
            <Wifi className="w-3 h-3 text-teal-600" />
            {language === 'te' ? 'ఆఫ్‌లైన్ సింక్' : 'Offline Synced'}
          </span>
        </div>
        <p className="text-[11px] text-slate-600 mt-0.5 truncate">
          {language === 'te' ? 'రాంపూర్ PHC • వార్డులు 1-5' : 'Rampur PHC • Wards 1-5'}
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {t.coreWorkflows}
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const primaryLabel = language === 'te' ? item.teluguLabel : item.label;
          const secondaryLabel = language === 'te' ? item.label : item.teluguLabel;
          const badgeText = language === 'te' ? (item.teluguBadge || item.badge) : item.badge;

          let badgeColorClass = 'bg-slate-100 text-slate-600';
          if (item.badgeVariant === 'teal') badgeColorClass = 'bg-teal-50 text-teal-700 border border-teal-200';
          if (item.badgeVariant === 'blue') badgeColorClass = 'bg-sky-50 text-sky-700 border border-sky-200';
          if (item.badgeVariant === 'amber') badgeColorClass = 'bg-amber-50 text-amber-700 border border-amber-200';
          if (item.badgeVariant === 'rose') badgeColorClass = 'bg-rose-50 text-rose-700 border border-rose-200';

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-sm shadow-sky-600/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-1 rounded-lg transition-colors ${
                    isActive
                      ? 'text-white'
                      : item.isAi
                      ? 'text-teal-600'
                      : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold">{primaryLabel}</span>
                    {item.isAi && !isActive && (
                      <Sparkles className="w-3 h-3 text-teal-500" />
                    )}
                  </div>
                  <span
                    className={`block text-[10px] ${
                      isActive ? 'text-teal-100' : 'text-slate-400'
                    }`}
                  >
                    {secondaryLabel}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {badgeText && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-white/20 text-white' : badgeColorClass
                    }`}
                  >
                    {badgeText}
                  </span>
                )}
                {isActive && <ChevronRight className="w-4 h-4 text-white/80" />}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Frontline Health Worker Card */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-teal-400 text-white flex items-center justify-center font-bold text-sm shadow">
            SD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">
              {DEMO_METADATA.healthWorkerName}
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              {language === 'te' ? 'ఆశా ఐడీ: ASH-UP-4029' : 'ASHA ID: ASH-UP-4029'}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {t.readyForVisits}
          </span>
          <span className="font-mono text-[10px] text-slate-400">v0.2</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop and Sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
