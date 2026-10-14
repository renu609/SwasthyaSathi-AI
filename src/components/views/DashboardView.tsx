import React, { useState } from 'react';
import { SAMPLE_STAT_CARDS, SAMPLE_FIELD_VISITS } from '../../data/syntheticData';
import { NavItemId } from '../../types';
import { StatCard } from '../common/StatCard';
import { WeeklyVisitsChart } from '../dashboard/WeeklyVisitsChart';
import { RecentActivity } from '../dashboard/RecentActivity';
import { HighPriorityAlerts } from '../dashboard/HighPriorityAlerts';
import { QuickActions } from '../dashboard/QuickActions';
import { CheckCircle2, Clock, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

interface DashboardViewProps {
  onNavigate: (tab: NavItemId) => void;
  onOpenAssistantForCase?: (caseDetails: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenAssistantForCase
}) => {
  const [visitsList, setVisitsList] = useState(SAMPLE_FIELD_VISITS);

  const toggleVisitStatus = (id: string) => {
    setVisitsList((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const nextStatus = v.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...v, status: nextStatus };
        }
        return v;
      })
    );
  };

  const completedCount = visitsList.filter((v) => v.status === 'Completed').length;
  const totalVisits = visitsList.length;

  return (
    <div className="space-y-6">
      {/* 4 Sample Stat Cards */}
      <section aria-label="Key Health Worker Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {SAMPLE_STAT_CARDS.map((stat) => (
            <StatCard
              key={stat.id}
              stat={
                stat.id === 'visits'
                  ? { ...stat, value: `${completedCount} / ${totalVisits}` }
                  : stat
              }
              onClick={() => {
                if (stat.id === 'households') onNavigate('households');
                if (stat.id === 'visits') onNavigate('field-visits');
                if (stat.id === 'followups') onNavigate('field-visits');
                if (stat.id === 'reminders') onNavigate('reminders');
              }}
            />
          ))}
        </div>
      </section>

      {/* Quick Action Buttons */}
      <QuickActions onNavigate={onNavigate} />

      {/* High Priority Alerts */}
      <HighPriorityAlerts onOpenAssistantForCase={onOpenAssistantForCase} />

      {/* Main Grid: Weekly Chart & Today's Remaining Circuit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Chart: 7 cols */}
        <div className="lg:col-span-7 space-y-6">
          <WeeklyVisitsChart />

          {/* Doorstep Visit Checklist */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-semibold text-slate-800 text-base">Today's Village Visit Circuit</h3>
                <p className="text-xs text-slate-500">Tap to toggle visit completion status</p>
              </div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                {completedCount} of {totalVisits} Finished
              </span>
            </div>

            <div className="mt-3 divide-y divide-slate-100">
              {visitsList.slice(0, 4).map((visit) => {
                const isDone = visit.status === 'Completed';
                return (
                  <div
                    key={visit.id}
                    onClick={() => toggleVisitStatus(visit.id)}
                    className="py-3 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        className={`mt-0.5 p-1 rounded-full transition-colors ${
                          isDone ? 'text-teal-600 bg-teal-50' : 'text-slate-300 hover:text-slate-500'
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold text-sm ${
                              isDone ? 'line-through text-slate-400' : 'text-slate-800'
                            }`}
                          >
                            {visit.beneficiaryName}
                          </span>
                          <Badge
                            variant={visit.priority === 'Urgent' ? 'rose' : 'blue'}
                            size="sm"
                          >
                            {visit.visitType}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{visit.scheduledTime}</span>
                          <span>•</span>
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{visit.villageWard}</span>
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        isDone ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {visit.status}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => onNavigate('field-visits')}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
              >
                Manage all {totalVisits} visits in Field Visits schedule
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Recent Activity & AI Advisory Teaser: 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          <RecentActivity />

          {/* AI Clinical Companion Prompt Box */}
          <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-sky-900 rounded-xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>AI Triage Ready</span>
            </div>
            <h4 className="font-bold text-base text-white">Need Clinical Guidance in the Field?</h4>
            <p className="text-xs text-teal-100 mt-1 leading-relaxed">
              SwasthyaSathi AI can assist with high-risk pregnancy protocols, newborn danger signs, and voice-guided triage in Hindi and regional dialects.
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-teal-200">ICMR & NHM Protocol Grounded</span>
              <button
                onClick={() => onNavigate('assistant')}
                className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-xs transition-colors shadow"
              >
                Launch Assistant →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
