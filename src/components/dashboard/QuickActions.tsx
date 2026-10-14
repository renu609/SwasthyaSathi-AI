import React from 'react';
import {
  UserPlus,
  CalendarPlus,
  Stethoscope,
  BellRing,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { NavItemId } from '../../types';

interface QuickActionsProps {
  onNavigate: (tab: NavItemId) => void;
  onOpenQuickLogModal?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onNavigate,
  onOpenQuickLogModal
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Frontline Quick Actions</h3>
          <p className="text-xs text-slate-500">Fast tasks for village doorstep visits</p>
        </div>
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider hidden sm:inline">
          Doorstep Toolkit
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Action 1: AI Symptom Checker */}
        <button
          onClick={() => onNavigate('assistant')}
          className="flex flex-col items-start p-3.5 rounded-xl border border-teal-200/80 bg-gradient-to-br from-teal-50/70 to-white hover:border-teal-400 hover:shadow-sm transition-all text-left group"
        >
          <div className="p-2 rounded-lg bg-teal-600 text-white shadow-xs group-hover:scale-105 transition-transform mb-2">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800 text-xs sm:text-sm">AI Health Assistant</span>
          <span className="text-[11px] text-teal-700 font-medium mt-0.5">Symptom check & triage</span>
        </button>

        {/* Action 2: Log Field Visit */}
        <button
          onClick={() => {
            if (onOpenQuickLogModal) onOpenQuickLogModal();
            else onNavigate('field-visits');
          }}
          className="flex flex-col items-start p-3.5 rounded-xl border border-sky-200/80 bg-gradient-to-br from-sky-50/70 to-white hover:border-sky-400 hover:shadow-sm transition-all text-left group"
        >
          <div className="p-2 rounded-lg bg-sky-600 text-white shadow-xs group-hover:scale-105 transition-transform mb-2">
            <CalendarPlus className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800 text-xs sm:text-sm">Log Field Visit</span>
          <span className="text-[11px] text-sky-700 font-medium mt-0.5">Record vitals & outcomes</span>
        </button>

        {/* Action 3: Register Household */}
        <button
          onClick={() => onNavigate('households')}
          className="flex flex-col items-start p-3.5 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50/70 to-white hover:border-slate-400 hover:shadow-sm transition-all text-left group"
        >
          <div className="p-2 rounded-lg bg-slate-700 text-white shadow-xs group-hover:scale-105 transition-transform mb-2">
            <UserPlus className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800 text-xs sm:text-sm">New Household</span>
          <span className="text-[11px] text-slate-600 font-medium mt-0.5">Map family & ABHA IDs</span>
        </button>

        {/* Action 4: Add Reminder */}
        <button
          onClick={() => onNavigate('reminders')}
          className="flex flex-col items-start p-3.5 rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 to-white hover:border-amber-400 hover:shadow-sm transition-all text-left group"
        >
          <div className="p-2 rounded-lg bg-amber-600 text-white shadow-xs group-hover:scale-105 transition-transform mb-2">
            <BellRing className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800 text-xs sm:text-sm">Add Reminder</span>
          <span className="text-[11px] text-amber-700 font-medium mt-0.5">Vaccines & medication</span>
        </button>
      </div>
    </div>
  );
};
