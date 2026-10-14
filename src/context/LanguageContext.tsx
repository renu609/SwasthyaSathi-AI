import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'te';

export interface Translations {
  // Brand & General
  appName: string;
  appSubtitle: string;
  demoBadge: string;
  demoSubtitle: string;
  demoBanner: string;
  offlineReady: string;
  syncing: string;
  sosTriage: string;
  call108: string;
  callDoctor: string;
  emergencyNotice: string;
  close: string;
  cancel: string;
  save: string;
  retry: string;
  viewDetails: string;
  searchPlaceholder: string;
  all: string;
  urgent: string;
  routine: string;
  highPriority: string;
  
  // Navigation
  navDashboard: string;
  navAssistant: string;
  navHouseholds: string;
  navFieldVisits: string;
  navReminders: string;
  navInsights: string;
  navReports: string;
  navSettings: string;
  coreWorkflows: string;
  readyForVisits: string;

  // Header & Profile
  greeting: string;
  portalSubtitle: string;
  currentDate: string;
  notificationsTitle: string;
  markAllRead: string;

  // Dashboard Stats
  registeredHouseholds: string;
  householdsSub: string;
  todaysVisits: string;
  visitsSub: string;
  pendingFollowups: string;
  followupsSub: string;
  upcomingReminders: string;
  remindersSub: string;
  onTrack: string;
  actionRequired: string;
  urgentCare: string;
  geoTagged: string;

  // Dashboard Sections
  weeklyVisitsTitle: string;
  weeklyVisitsSub: string;
  recentActivitiesTitle: string;
  recentActivitiesSub: string;
  quickActionsTitle: string;
  quickActionsSub: string;
  highPriorityTitle: string;
  highPrioritySub: string;
  doorstepCircuitTitle: string;
  doorstepCircuitSub: string;
  circuitFinished: string;
  markCompleted: string;
  markPending: string;
  vitalsLog: string;
  recordVitals: string;

  // Categories & Filters
  maternalCare: string;
  immunization: string;
  ncdScreening: string;
  childGrowth: string;
  postnatalCare: string;

  // AI Assistant
  assistantTitle: string;
  assistantSub: string;
  assistantDisclaimer: string;
  aiThinking: string;
  typePlaceholder: string;
  promptIdeas: string;
  connectionFailed: string;
}

const translations: Record<Language, Translations> = {
  en: {
    appName: "SwasthyaSathi AI",
    appSubtitle: "Rural Healthcare Companion",
    demoBadge: "Synthetic Demo Data",
    demoSubtitle: "Rampur PHC Sector 4 Field Pilot",
    demoBanner: "Hackathon Demonstration Mode: Synthetic healthcare data for frontline health workers.",
    offlineReady: "Offline-Ready",
    syncing: "Syncing...",
    sosTriage: "SOS Triage",
    call108: "Call 108 Emergency Ambulance",
    callDoctor: "Call PHC Doctor",
    emergencyNotice: "Use this protocol when detecting obstetric hemorrhage, pre-eclampsia, newborn respiratory distress, or severe trauma.",
    close: "Close",
    cancel: "Cancel",
    save: "Save",
    retry: "Retry Request",
    viewDetails: "View Details",
    searchPlaceholder: "Search beneficiary name, ABHA ID (e.g. 9821), or Ward...",
    all: "All",
    urgent: "Urgent",
    routine: "Routine",
    highPriority: "High Priority",

    navDashboard: "Dashboard",
    navAssistant: "AI Health Assistant",
    navHouseholds: "Households",
    navFieldVisits: "Field Visits",
    navReminders: "Reminders",
    navInsights: "Community Insights",
    navReports: "Reports",
    navSettings: "Settings",
    coreWorkflows: "Core Workflows",
    readyForVisits: "Ready for field visits",

    greeting: "Namaste, Sunita Devi",
    portalSubtitle: "Rampur PHC • Wards 1-5 • Gram Panchayat Field Portal",
    currentDate: "Wednesday, 14 Oct 2026",
    notificationsTitle: "Priority Notifications",
    markAllRead: "Mark all read",

    registeredHouseholds: "Registered Households",
    householdsSub: "1,142 total family members mapped",
    todaysVisits: "Today's Field Visits",
    visitsSub: "62.5% of planned daily circuit",
    pendingFollowups: "Pending Follow-ups",
    followupsSub: "High-risk ANC & infant growth monitoring",
    upcomingReminders: "Upcoming Reminders",
    remindersSub: "6 due today (Vaccines & Chronic meds)",
    onTrack: "On Track",
    actionRequired: "Action Required",
    urgentCare: "Urgent Care",
    geoTagged: "100% Geo-tagged",

    weeklyVisitsTitle: "Weekly Field Visits Activity",
    weeklyVisitsSub: "Track planned vs. executed doorstep health visits (Oct 09 - Oct 15)",
    recentActivitiesTitle: "Recent Field Activities",
    recentActivitiesSub: "Live operational feed from ASHA doorstep health checkups",
    quickActionsTitle: "Frontline Quick Actions",
    quickActionsSub: "Fast tasks for village doorstep visits",
    highPriorityTitle: "High-Priority Rural Health Alerts",
    highPrioritySub: "Critical maternal & infant cases requiring frontline medical officer escalation",
    doorstepCircuitTitle: "Today's Village Visit Circuit",
    doorstepCircuitSub: "Tap to toggle visit completion status",
    circuitFinished: "Finished",
    markCompleted: "Mark Completed",
    markPending: "Mark Pending",
    vitalsLog: "View / Update Vitals",
    recordVitals: "Record Vitals",

    maternalCare: "Maternal Care",
    immunization: "Vaccines",
    ncdScreening: "NCDs",
    childGrowth: "Child Growth",
    postnatalCare: "PNC",

    assistantTitle: "SwasthyaSathi AI Clinical Companion",
    assistantSub: "AI-powered doorstep triage, maternal ANC safety, and infant growth monitoring",
    assistantDisclaimer: "Clinical Safety Notice: SwasthyaSathi AI provides triage educational guidance for frontline health workers, not definitive medical diagnosis or autonomous prescriptions. Always consult a qualified physician or call 108 in emergencies. AI can make mistakes.",
    aiThinking: "SwasthyaSathi AI is analyzing clinical triage protocols...",
    typePlaceholder: "Type symptoms, vitals, or clinical query (e.g. Infant fever 102F with rapid breathing)...",
    promptIdeas: "Prompt Ideas:",
    connectionFailed: "Could not connect to SwasthyaSathi backend server. Ensure the Flask backend is running on http://127.0.0.1:5000."
  },
  te: {
    appName: "స్వాస్థ్యసాథి AI",
    appSubtitle: "గ్రామీణ ఆరోగ్య సహాయకుడు",
    demoBadge: "డెమో డేటా",
    demoSubtitle: "రాంపూర్ PHC సెక్టార్ 4 ఫీల్డ్ పైలట్",
    demoBanner: "హ్యాకథాన్ డెమో మోడ్: ఆశా కార్యకర్తలు మరియు గ్రామీణ ఆరోగ్య రక్షణ కోసం రూపొందించబడింది.",
    offlineReady: "ఆఫ్‌లైన్ సిద్ధం",
    syncing: "సింక్ అవుతోంది...",
    sosTriage: "SOS అత్యవసరం",
    call108: "108 అంబులెన్స్ అత్యవసర కాల్",
    callDoctor: "PHC వైద్యుడికి కాల్ చేయండి",
    emergencyNotice: "తీవ్ర రక్తస్రావం, గర్భిణీలలో తీవ్ర బీపీ, శిశువుకు శ్వాసలో ఇబ్బంది ఉన్నప్పుడు వెంటనే ఈ అత్యవసర కాల్ ఉపయోగించండి.",
    close: "మూసివేయి",
    cancel: "రద్దు",
    save: "భద్రపరచండి",
    retry: "మళ్ళీ ప్రయత్నించండి",
    viewDetails: "వివరాలు చూడండి",
    searchPlaceholder: "లబ్ధిదారుని పేరు, ABHA ID (ఉదా: 9821), లేదా వార్డును వెతకండి...",
    all: "అన్నీ",
    urgent: "అత్యవసరం",
    routine: "సాధారణం",
    highPriority: "అధిక ప్రాధాన్యత",

    navDashboard: "డ్యాష్‌బోర్డ్",
    navAssistant: "AI ఆరోగ్య సహాయకుడు",
    navHouseholds: "కుటుంబాలు",
    navFieldVisits: "క్షేత్ర పర్యటనలు",
    navReminders: "రిమైండర్లు",
    navInsights: "కమ్యూనిటీ విశ్లేషణ",
    navReports: "నివేదికలు",
    navSettings: "సెట్టింగ్‌లు",
    coreWorkflows: "ముఖ్య కార్యకలాపాలు",
    readyForVisits: "పర్యటనలకు సిద్ధంగా ఉన్నారు",

    greeting: "నమస్కారం, సునీతా దేవి",
    portalSubtitle: "రాంపూర్ PHC • వార్డులు 1-5 • గ్రామ పంచాయతీ ఫీల్డ్ పోర్టల్",
    currentDate: "బుధవారం, 14 అక్టోబర్ 2026",
    notificationsTitle: "ప్రాధాన్యతా నోటిఫికేషన్లు",
    markAllRead: "అన్నీ చదివినట్లు గుర్తించు",

    registeredHouseholds: "నమోదైన కుటుంబాలు",
    householdsSub: "మొత్తం 1,142 మంది కుటుంబ సభ్యులు",
    todaysVisits: "నేటి క్షేత్ర పర్యటనలు",
    visitsSub: "నేటి పర్యటనలలో 62.5% పూర్తయింది",
    pendingFollowups: "పెండింగ్ ఫాలో-అప్‌లు",
    followupsSub: "తీవ్ర సమస్య గల గర్భిణీలు & శిశువుల పర్యవేక్షణ",
    upcomingReminders: "రాబోయే రిమైండర్లు",
    remindersSub: "నేడు 6 గడువులు (టీకాలు & ఔషధాలు)",
    onTrack: "సవ్యంగా ఉంది",
    actionRequired: "చర్య అవసరం",
    urgentCare: "అత్యవసర సంరక్షణ",
    geoTagged: "100% జియో-ట్యాగ్ చేయబడింది",

    weeklyVisitsTitle: "వారపు క్షేత్ర పర్యటనల సమీక్ష",
    weeklyVisitsSub: "ప్రణాళిక vs పూర్తయిన ఇంటింటి ఆరోగ్య పర్యటనలు (అక్టో 09 - అక్టో 15)",
    recentActivitiesTitle: "ఇటీవలి క్షేత్ర కార్యకలాపాలు",
    recentActivitiesSub: "ఆశా కార్యకర్తల ప్రత్యక్ష సేవా వివరాలు",
    quickActionsTitle: "త్వరిత సేవా చర్యలు",
    quickActionsSub: "గ్రామ పర్యటనలో సులభమైన విధులు",
    highPriorityTitle: "అత్యవసర గ్రామీణ ఆరోగ్య హెచ్చరికలు",
    highPrioritySub: "వెంటనే PHC మెడికల్ ఆఫీసర్‌కు తెలియజేయవలసిన అత్యవసర కేసులు",
    doorstepCircuitTitle: "నేటి గ్రామ పర్యటనల జాబితా",
    doorstepCircuitSub: "పర్యటన పూర్తి స్థితిని మార్చడానికి నొక్కండి",
    circuitFinished: "పూర్తయినవి",
    markCompleted: "పూర్తయినట్లు మార్చండి",
    markPending: "పెండింగ్‌గా మార్చండి",
    vitalsLog: "వైటల్స్ చూడండి / సవరించండి",
    recordVitals: "వైటల్స్ నమోదు",

    maternalCare: "గర్భిణీ సంరక్షణ",
    immunization: "టీకాలు",
    ncdScreening: "దీర్ఘకాలిక వ్యాధులు",
    childGrowth: "పిల్లల ఎదుగుదల",
    postnatalCare: "ప్రసవానంతర సంరక్షణ",

    assistantTitle: "స్వాస్థ్యసాథి AI ఆరోగ్య సహాయకుడు",
    assistantSub: "గ్రామాల్లో తక్షణ ఆరోగ్య సలహాలు, గర్భిణీ రక్షణ & శిశు సంరక్షణ సహాయం",
    assistantDisclaimer: "క్లినికల్ భద్రతా గమనిక: స్వాస్థ్యసాథి AI అనేది ఆశా/ANM కార్యకర్తల కోసం రూపొందించిన ప్రాథమిక విద్యా సహాయక సాధనం మాత్రమే. ఇది వైద్యుని నిర్ధారణ లేదా ప్రిస్క్రిప్షన్‌కు ప్రత్యామ్నాయం కాదు. అత్యవసర సమయాల్లో అర్హత కలిగిన వైద్యుడిని సంప్రదించండి లేదా వెంటనే 108 కి కాల్ చేయండి.",
    aiThinking: "స్వాస్థ్యసాథి AI క్లినికల్ గైడ్‌లైన్స్‌ను విశ్లేషిస్తోంది...",
    typePlaceholder: "లక్షణాలు, BP లేదా ప్రశ్నను టైప్ చేయండి (ఉదా: పసిపిల్లలలో తీవ్ర జ్వరం, వాంతులు)...",
    promptIdeas: "ప్రశ్న సూచనలు:",
    connectionFailed: "స్వాస్థ్యసాథి బ్యాకెండ్ సర్వర్‌కు కనెక్ట్ కాలేదు. దయచేసి http://127.0.0.1:5000 లో ఫ్లాస్క్ సర్వర్ నడుస్తోందో లేదో చూడండి."
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('swasthya_lang');
    return (saved === 'te' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('swasthya_lang', lang);
  };

  useEffect(() => {
    // Set document lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
