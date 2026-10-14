import React from 'react';
import { AlertCircle, ArrowRight, PhoneCall, ShieldAlert, Check } from 'lucide-react';
import { HIGH_PRIORITY_ALERTS } from '../../data/syntheticData';
import { Badge } from '../common/Badge';

interface HighPriorityAlertsProps {
  onResolveAlert?: (id: string) => void;
  onOpenAssistantForCase?: (caseDetails: string) => void;
}

export const HighPriorityAlerts: React.FC<HighPriorityAlertsProps> = ({
  onResolveAlert,
  onOpenAssistantForCase
}) => {
  return (
    <div className="bg-gradient-to-br from-rose-50/60 via-white to-amber-50/40 rounded-xl border border-rose-200/90 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between pb-3 border-b border-rose-100/80">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-100 text-rose-700 rounded-lg animate-pulse">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-base">High-Priority Rural Health Alerts</h3>
              <Badge variant="rose" size="sm" dot>
                {HIGH_PRIORITY_ALERTS.length} Flagged
              </Badge>
            </div>
            <p className="text-xs text-slate-500">Critical maternal & infant cases requiring frontline medical officer escalation</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {HIGH_PRIORITY_ALERTS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-3.5 border border-rose-100 shadow-xs hover:border-rose-300 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{item.beneficiary}</span>
                <span className="text-xs text-slate-400 font-mono">({item.abhaId})</span>
                <span className="text-xs text-slate-500">📍 {item.ward}</span>
              </div>
              <Badge
                variant={item.urgency === 'Immediate' ? 'rose' : item.urgency === 'Today' ? 'amber' : 'blue'}
                size="sm"
              >
                {item.urgency} Escalation
              </Badge>
            </div>

            <p className="text-xs font-semibold text-rose-800 mt-2 bg-rose-50/80 px-2.5 py-1 rounded border border-rose-100">
              ⚠️ {item.condition}
            </p>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              <strong>Protocol Action:</strong> {item.recommendedAction}
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Initiating direct call to Rampur PHC Medical Officer for ${item.beneficiary}`)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Call PHC Doctor
                </button>
                <button
                  onClick={() => onOpenAssistantForCase && onOpenAssistantForCase(item.condition)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors"
                >
                  <span>🤖 Ask AI Assistant</span>
                </button>
              </div>

              <button
                onClick={() => onResolveAlert && onResolveAlert(item.id)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Mark Followed Up
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
