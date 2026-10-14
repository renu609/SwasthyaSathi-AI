import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  CalendarCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import { RECENT_ACTIVITIES } from '../../data/syntheticData';
import { RecentActivityItem } from '../../types';
import { Badge } from '../common/Badge';

interface RecentActivityProps {
  onViewBeneficiary?: (name: string) => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ onViewBeneficiary }) => {
  const [filter, setFilter] = useState<'all' | 'visit' | 'alert' | 'record'>('all');

  const filteredActivities = RECENT_ACTIVITIES.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getActivityIcon = (type: RecentActivityItem['type'], status: RecentActivityItem['status']) => {
    if (status === 'urgent') {
      return (
        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-4 h-4" />
        </div>
      );
    }
    switch (type) {
      case 'visit':
        return (
          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0">
            <CalendarCheck className="w-4 h-4" />
          </div>
        );
      case 'record':
        return (
          <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
            <FileCheck2 className="w-4 h-4" />
          </div>
        );
      case 'reminder':
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
    }
  };

  const getStatusBadge = (status: RecentActivityItem['status']) => {
    switch (status) {
      case 'urgent':
        return <Badge variant="rose" size="sm" dot>Urgent Escalation</Badge>;
      case 'success':
        return <Badge variant="emerald" size="sm" dot>Completed</Badge>;
      case 'info':
        return <Badge variant="blue" size="sm" dot>Logged to Portal</Badge>;
      case 'pending':
        return <Badge variant="amber" size="sm" dot>Pending Review</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 hover:shadow-md transition-shadow">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-teal-50 text-teal-700 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-base">Recent Field Activities</h3>
            <p className="text-xs text-slate-500">Live operational feed from ASHA doorstep health checkups</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('visit')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              filter === 'visit'
                ? 'bg-teal-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Visits
          </button>
          <button
            onClick={() => setFilter('alert')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              filter === 'alert'
                ? 'bg-rose-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Alerts
          </button>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="mt-4 divide-y divide-slate-100">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3.5 group hover:bg-slate-50/80 -mx-2 px-2 rounded-lg transition-colors"
          >
            {getActivityIcon(act.type, act.status)}

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                <span className="font-semibold text-sm text-slate-800 group-hover:text-sky-700 transition-colors">
                  {act.title}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {act.timeAgo}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {act.description}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                {getStatusBadge(act.status)}
                <span className="text-slate-400">•</span>
                <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                  👤 {act.beneficiary}
                </span>
                <span className="text-slate-500 text-[11px]">
                  📍 {act.ward}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Displaying {filteredActivities.length} recent audit logs</span>
        <button
          onClick={() => alert("Full field audit log is available in the Reports section.")}
          className="text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-0.5"
        >
          View Full Activity Log
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
