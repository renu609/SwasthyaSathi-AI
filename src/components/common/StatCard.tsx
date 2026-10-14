import React from 'react';
import { Home, CalendarCheck, AlertTriangle, Bell, ArrowUpRight, TrendingUp } from 'lucide-react';
import { StatItem } from '../../types';

interface StatCardProps {
  stat: StatItem;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, onClick }) => {
  const getIcon = () => {
    switch (stat.iconName) {
      case 'households':
        return <Home className="w-6 h-6 text-sky-600" />;
      case 'visits':
        return <CalendarCheck className="w-6 h-6 text-teal-600" />;
      case 'followups':
        return <AlertTriangle className="w-6 h-6 text-rose-600" />;
      case 'reminders':
        return <Bell className="w-6 h-6 text-amber-600" />;
    }
  };

  const getColorStyles = () => {
    switch (stat.color) {
      case 'blue':
        return {
          iconBg: 'bg-sky-50 border-sky-100 text-sky-700',
          accentBorder: 'hover:border-sky-300',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200'
        };
      case 'teal':
        return {
          iconBg: 'bg-teal-50 border-teal-100 text-teal-700',
          accentBorder: 'hover:border-teal-300',
          badgeBg: 'bg-teal-50 text-teal-700 border-teal-200'
        };
      case 'rose':
        return {
          iconBg: 'bg-rose-50 border-rose-100 text-rose-700',
          accentBorder: 'hover:border-rose-300',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200'
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-50 border-amber-100 text-amber-700',
          accentBorder: 'hover:border-amber-300',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200'
        };
    }
  };

  const colors = getColorStyles();

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group ${colors.accentBorder}`}
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl border ${colors.iconBg} transition-transform group-hover:scale-105`}>
          {getIcon()}
        </div>
        {stat.badgeText && (
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${colors.badgeBg}`}>
            {stat.badgeText}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {stat.title}
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {stat.value}
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
          {stat.subtitle}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium">
          {stat.isPositive ? (
            <span className="text-teal-700 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              {stat.change}
            </span>
          ) : (
            <span className="text-slate-600 flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {stat.change}
            </span>
          )}
        </div>
        <span className="text-slate-400 group-hover:text-sky-600 flex items-center text-[11px] font-medium transition-colors">
          View Details
          <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
        </span>
      </div>
    </div>
  );
};
