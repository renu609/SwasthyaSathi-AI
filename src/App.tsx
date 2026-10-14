import React, { useState } from 'react';
import { NavItemId } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DemoNoticeBanner } from './components/common/DemoBadge';
import { DashboardView } from './components/views/DashboardView';
import { AssistantView } from './components/views/AssistantView';
import { HouseholdsView } from './components/views/HouseholdsView';
import { FieldVisitsView } from './components/views/FieldVisitsView';
import { RemindersView } from './components/views/RemindersView';
import { InsightsView } from './components/views/InsightsView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';
import { AlertOctagon, PhoneCall, X, ShieldAlert, HeartPulse } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavItemId>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [quickSearchTerm, setQuickSearchTerm] = useState('');

  const { language, t } = useLanguage();

  const handleOpenAssistantForCase = (caseDetails: string) => {
    setActiveTab('assistant');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenAssistantForCase={handleOpenAssistantForCase}
          />
        );
      case 'assistant':
        return <AssistantView />;
      case 'households':
        return <HouseholdsView />;
      case 'field-visits':
        return <FieldVisitsView />;
      case 'reminders':
        return <RemindersView />;
      case 'insights':
        return <InsightsView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <DashboardView
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenAssistantForCase={handleOpenAssistantForCase}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Demo Notice Banner */}
      <DemoNoticeBanner />

      {/* Main Layout Container */}
      <div className="flex flex-1 relative">
        {/* Sidebar Component */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Content Area (offset by sidebar width on large screens) */}
        <div className="flex-1 flex flex-col lg:pl-72 min-w-0 transition-all">
          {/* Top Sticky Header */}
          <Header
            onToggleMobileMenu={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            onEmergencyClick={() => setEmergencyModalOpen(true)}
            onSearchChange={(query) => setQuickSearchTerm(query)}
          />

          {/* Main View Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderActiveView()}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200/80 bg-white py-4 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">
                {language === 'te' ? 'స్వాస్థ్యసాథి AI (SwasthyaSathi)' : 'SwasthyaSathi AI'}
              </span>
              <span>•</span>
              <span>
                {language === 'te' ? 'గ్రామీణ ఆశా కార్యకర్తల సాధికారత' : 'Empowering Rural Frontline Health Workers'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span>{language === 'te' ? 'ఆఫ్‌లైన్-ఫస్ట్ ఆర్కిటెక్చర్' : 'Offline-First Architecture'}</span>
              <span>•</span>
              <span className="text-teal-700 font-medium">{language === 'te' ? 'తెలుగు & English' : 'English & Telugu'}</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Emergency SOS Modal */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-rose-300 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-rose-100">
              <div className="flex items-center gap-2 text-rose-700">
                <div className="p-2 bg-rose-100 rounded-xl">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {language === 'te' ? 'SOS అత్యవసర ప్రథమ చికిత్స & రెఫరల్' : 'SOS Emergency Triage Escalation'}
                  </h3>
                  <p className="text-xs text-rose-600 font-semibold">
                    {language === 'te' ? 'వెంటనే తీసుకోవాల్సిన అత్యవసర చర్య' : 'Immediate Frontline Clinical Action'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <p className="text-slate-600 leading-relaxed">
                {t.emergencyNotice}
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href="tel:108"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-5 h-5" />
                    <span>{t.call108}</span>
                  </div>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs">{language === 'te' ? 'ఉచితం' : 'Toll-Free'}</span>
                </a>

                <button
                  onClick={() => {
                    alert(language === 'te' ? "రాంపూర్ PHC మెడికల్ ఆఫీసర్ డాక్టర్ శర్మకు కాల్ కనెక్ట్ అవుతోంది (+91 94150-12345)" : "Calling Rampur PHC Medical Officer Dr. R. Sharma at +91 94150-12345");
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-semibold text-xs hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-sky-600" />
                    <span>{t.callDoctor}</span>
                  </div>
                  <span className="text-sky-700 font-mono text-[11px]">+91 94150-12345</span>
                </button>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] mt-3">
                <strong>{language === 'te' ? 'అత్యవసర చెక్‌లిస్ట్:' : 'Emergency Checklist:'}</strong>{' '}
                {language === 'te' 
                  ? 'శ్వాసనాళాన్ని శుభ్రంగా ఉంచండి, పల్స్ మరియు బీపీ తనిఖీ చేయండి, గర్భిణీలను ఎడమవైపునకు తిప్పి పడుకోబెట్టండి, వెంటనే ఆశా డైరీలో సమయం నమోదు చేయండి.'
                  : 'Keep airway clear, monitor pulse and BP, position in left lateral tilt, record time of onset in ASHA register.'
                }
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
