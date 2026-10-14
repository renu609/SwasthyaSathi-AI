import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Mic,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Languages,
  PhoneCall,
  RotateCcw,
  AlertOctagon,
  Info
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { useLanguage, Language } from '../../context/LanguageContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isUrgent?: boolean;
  recommendations?: string[];
  isError?: boolean;
}

interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🇮🇳' }
];

const INITIAL_MESSAGES_BY_LANG: Record<Language, ChatMessage> = {
  en: {
    id: 'msg-welcome',
    sender: 'assistant',
    text: "Namaste! I am your SwasthyaSathi AI clinical companion. I can assist frontline health workers with maternal ANC checkups, infant danger signs, immunization schedules, and rural triage guidance. How can I assist you today?",
    timestamp: 'Just now',
    recommendations: [
      'Assess 3rd trimester pregnancy complications',
      'Check severe infant dehydration warning signs',
      'Catch-up schedule for missed vaccines'
    ]
  },
  te: {
    id: 'msg-welcome',
    sender: 'assistant',
    text: "నమస్కారం! నేను మీ స్వాస్థ్యసాథి AI ఆరోగ్య సహాయకుడిని. గర్భిణీ స్త్రీల సంరక్షణ, చిన్నపిల్లల అత్యవసర లక్షణాలు, టీకాల సమయపట్టిక మరియు గ్రామాల్లో ఆరోగ్య సలహాల కోసం నేను మీకు సహాయం చేయగలను. మీకు ఏ విషయంపై సహాయం కావాలి?",
    timestamp: 'ఇప్పుడే',
    recommendations: [
      'గర్భిణీ స్త్రీలలో అధిక రక్తపోటు (BP) జాగ్రత్తలు',
      'చిన్నపిల్లలలో తీవ్ర డీహైడ్రేషన్ లక్షణాలు',
      'మిస్ అయిన పిల్లల టీకాల రీషెడ్యూల్'
    ]
  }
};

const PROMPT_SUGGESTIONS: Record<Language, string[]> = {
  en: [
    '👶 Severe infant dehydration & vomiting signs',
    '🤰 Blood pressure 150/98 in 3rd trimester danger signs',
    '💉 Catch-up schedule for missed Pentavalent-3 booster'
  ],
  te: [
    '👶 పసిపిల్లలలో తీవ్ర నీళ్ల విరేచనాలు & డీహైడ్రేషన్ సంకేతాలు',
    '🤰 గర్భధారణ 8వ నెలలో 150/98 BP ఉంటే అత్యవసర జాగ్రత్తలు',
    '💉 పెంటావాలెంట్-3 వ్యాక్సిన్ మిస్ అయితే ఏమి చేయాలి?'
  ]
};

export const AssistantView: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGES_BY_LANG[language]]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [backendConfigured, setBackendConfigured] = useState<boolean | null>(null);
  const [configuredModel, setConfiguredModel] = useState<string>('gemini-2.5-flash');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth();
  }, []);

  // Update initial message when language changes if conversation hasn't started
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'msg-welcome') {
      setMessages([INITIAL_MESSAGES_BY_LANG[language]]);
    }
  }, [language]);

  const checkBackendHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setBackendConfigured(data.api_key_configured);
        if (data.model) setConfiguredModel(data.model);
      } else {
        setBackendConfigured(false);
      }
    } catch {
      setBackendConfigured(false);
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (messages.length === 1 && messages[0].id === 'msg-welcome') {
      setMessages([INITIAL_MESSAGES_BY_LANG[newLang]]);
    }
  };

  const handleSend = async (messageToSend?: string) => {
    const text = (messageToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setErrorMessage(null);
    setLastFailedMessage(null);
    setIsLoading(true);

    // Build multi-turn history for backend
    const conversationHistory = messages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: conversationHistory,
          language
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUrgent: data.is_emergency || false,
          recommendations: data.is_emergency
            ? (language === 'te' 
                ? ['వెంటనే 108 అంబులెన్స్ కాల్', 'రాంపూర్ PHC మెడికల్ ఆఫీసర్‌ను సంప్రదించండి', 'ABHA లో అత్యవసర రిఫరల్ నమోదు చేయండి']
                : ['Immediate 108 Ambulance Call', 'Alert Rampur PHC Medical Officer', 'Log Urgent Referral to ABHA'])
            : (language === 'te'
                ? ['వైటల్స్‌ను ఫీల్డ్ రిజిస్టర్‌లో నమోదు చేయండి', '48 గంటల్లో మళ్ళీ పర్యటించండి']
                : ['Log Vitals to Field Register', 'Schedule 48-Hour Follow-up Visit'])
        };
        setMessages((prev) => [...prev, aiMessage]);
        setBackendConfigured(true);
      } else {
        const errText = data.error || (language === 'te' ? 'Gemini AI నుండి సమాధానం పొందలేకపోయాము.' : 'Failed to generate response from Gemini API.');
        setErrorMessage(errText);
        setLastFailedMessage(text);

        const errorAiMessage: ChatMessage = {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: `⚠️ ${errText}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true
        };
        setMessages((prev) => [...prev, errorAiMessage]);
      }
    } catch {
      const connectionError = t.connectionFailed;
      setErrorMessage(connectionError);
      setLastFailedMessage(text);

      const errorAiMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ ${connectionError}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages((prev) => [...prev, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSend(lastFailedMessage);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGES_BY_LANG[language]]);
    setErrorMessage(null);
    setLastFailedMessage(null);
  };

  const toggleMic = () => {
    setIsListening(!isListening);
    if (!isListening) {
      if (language === 'te') {
        setInputText('చిన్నారికి 2 రోజులుగా జ్వరం మరియు వాంతులు అవుతున్నాయి (Child has fever and vomiting for 2 days)');
      } else {
        setInputText('8-month-old infant with high fever 102F and vomiting for 2 days');
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Disclaimer Header with Safety Guidelines and Language Picker */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-teal-600 to-sky-600 text-white rounded-xl shadow-xs flex-shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  {t.assistantTitle}
                </h3>
                <Badge variant={backendConfigured ? 'teal' : 'amber'} size="sm" dot>
                  {backendConfigured ? `Gemini Live (${configuredModel})` : (language === 'te' ? 'బ్యాకెండ్ కనెక్ట్ అయింది' : 'Backend Connected')}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.assistantSub}
              </p>
            </div>
          </div>

          {/* Language Selector: English and Telugu only */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-teal-600" />
              {language === 'te' ? 'భాష:' : 'Language:'}
            </span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                    language === lang.code
                      ? 'bg-white text-teal-800 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.nativeLabel}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleResetChat}
              title={language === 'te' ? 'సంభాషణను రీసెట్ చేయండి' : 'Reset conversation'}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="bg-sky-50/70 border border-sky-100 rounded-lg p-2.5 text-xs text-slate-600 flex items-start gap-2">
          <Info className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t.assistantDisclaimer}
          </p>
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[620px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 shadow-xs text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : msg.isError
                    ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-tl-none'
                    : msg.isUrgent
                    ? 'bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 text-slate-900 rounded-tl-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between gap-4 mb-2 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold">
                    {msg.sender === 'user' ? (
                      <span className="text-sky-100">
                        {language === 'te' ? 'సునీతా దేవి (ఆశా కార్యకర్త)' : 'Sunita Devi (Frontline Worker)'}
                      </span>
                    ) : (
                      <>
                        <span className={msg.isUrgent ? 'text-rose-700' : 'text-teal-700'}>
                          {language === 'te' ? 'స్వాస్థ్యసాథి AI' : 'SwasthyaSathi AI'}
                        </span>
                        {msg.isUrgent && (
                          <span className="bg-rose-100 text-rose-800 text-[10px] px-1.5 py-0.2 rounded font-bold">
                            {language === 'te' ? 'అత్యవసర హెచ్చరిక' : 'Emergency Warning'}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <span
                    className={`text-[11px] ${
                      msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {/* Message Body (Telugu and English Unicode) */}
                <div className="whitespace-pre-line leading-relaxed font-normal">
                  {msg.text}
                </div>

                {/* Emergency Action Shortcut */}
                {msg.isUrgent && (
                  <div className="mt-3 pt-3 border-t border-rose-200/80 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-rose-800 flex items-center gap-1">
                      <AlertOctagon className="w-4 h-4 text-rose-600" />
                      {language === 'te' ? 'తక్షణ చర్య అవసరం:' : 'Immediate Action Required:'}
                    </span>
                    <a
                      href="tel:108"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{t.call108}</span>
                    </a>
                  </div>
                )}

                {/* Recommendations chips */}
                {msg.recommendations && msg.recommendations.length > 0 && !msg.isError && (
                  <div className="mt-3 pt-3 border-t border-slate-200/70 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      {language === 'te' ? 'సిఫార్సు చేయబడిన తదుపరి చర్యలు:' : 'Recommended Protocol Steps:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.recommendations.map((rec, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(language === 'te' ? `ఈ చర్యను ఎలా అమలు చేయాలి: ${rec}?` : `How do I execute this step: ${rec}?`)}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors"
                        >
                          <CheckCircle2 className="w-3 h-3 text-teal-600" />
                          <span>{rec}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 text-slate-600 text-xs bg-white px-4 py-3 rounded-xl border border-slate-200 w-fit shadow-xs animate-pulse">
              <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
              <span>
                {language === 'te' 
                  ? 'స్వాస్థ్యసాథి AI క్లినికల్ గైడ్‌లైన్స్‌ను విశ్లేషిస్తోంది...' 
                  : 'SwasthyaSathi AI is analyzing clinical triage protocols in English...'
                }
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error and Retry Bar */}
        {errorMessage && (
          <div className="px-4 py-2.5 bg-rose-50 border-t border-rose-200 text-xs flex flex-wrap items-center justify-between gap-2 text-rose-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            {lastFailedMessage && (
              <button
                onClick={handleRetry}
                disabled={isLoading}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.retry}</span>
              </button>
            )}
          </div>
        )}

        {/* Prompt Suggestions Row */}
        <div className="px-4 py-2.5 bg-slate-100/90 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 font-semibold text-[11px] whitespace-nowrap">
            {t.promptIdeas}
          </span>
          {PROMPT_SUGGESTIONS[language].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-teal-400 hover:text-teal-700 transition-colors disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={toggleMic}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-600 text-white border-rose-600 animate-bounce'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
            }`}
            title="Speech-to-text simulation"
          >
            <Mic className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            disabled={isLoading}
            placeholder={t.typePlaceholder}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-800 placeholder-slate-400 disabled:opacity-50 font-sans"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed shadow transition-all active:scale-95"
            title="Send query"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
