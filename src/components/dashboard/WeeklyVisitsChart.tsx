import React, { useState } from 'react';
import { BarChart3, TrendingUp, CheckCircle, Target, Filter } from 'lucide-react';
import { WEEKLY_VISITS_DATA } from '../../data/syntheticData';
import { DayVisitStats } from '../../types';

type CategoryFilter = 'all' | 'maternal' | 'immunization' | 'ncd';

export const WeeklyVisitsChart: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>('all');
  const [hoveredDay, setHoveredDay] = useState<DayVisitStats | null>(null);

  const maxVisits = 10;

  // Calculate totals
  const totalCompleted = WEEKLY_VISITS_DATA.reduce((acc, d) => acc + d.completed, 0);
  const totalTarget = WEEKLY_VISITS_DATA.reduce((acc, d) => acc + d.target, 0);
  const completionPercentage = Math.round((totalCompleted / totalTarget) * 100);

  const getValue = (day: DayVisitStats) => {
    switch (selectedFilter) {
      case 'maternal':
        return day.maternal;
      case 'immunization':
        return day.immunization;
      case 'ncd':
        return day.ncd;
      case 'all':
      default:
        return day.completed;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 hover:shadow-md transition-shadow">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-50 text-sky-700 rounded-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-base">Weekly Field Visits Activity</h3>
              <p className="text-xs text-slate-500">Track planned vs. executed doorstep health visits (Oct 09 - Oct 15)</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl text-xs font-medium self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'all'
                ? 'bg-white text-sky-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Visits
          </button>
          <button
            onClick={() => setSelectedFilter('maternal')}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'maternal'
                ? 'bg-white text-teal-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Maternal
          </button>
          <button
            onClick={() => setSelectedFilter('immunization')}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'immunization'
                ? 'bg-white text-teal-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vaccines
          </button>
          <button
            onClick={() => setSelectedFilter('ncd')}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              selectedFilter === 'ncd'
                ? 'bg-white text-sky-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            NCDs
          </button>
        </div>
      </div>

      {/* Metric summary banner */}
      <div className="grid grid-cols-3 gap-3 my-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
        <div>
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Completed</span>
          <p className="text-lg font-bold text-teal-700">{totalCompleted} visits</p>
        </div>
        <div className="border-x border-slate-200">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Target Plan</span>
          <p className="text-lg font-bold text-slate-700">{totalTarget} planned</p>
        </div>
        <div>
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Completion</span>
          <p className="text-lg font-bold text-sky-700 flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4 text-sky-600" />
            {completionPercentage}%
          </p>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="relative pt-6 pb-2">
        {/* Y Axis Grid lines */}
        <div className="absolute inset-x-0 top-6 bottom-8 flex flex-col justify-between pointer-events-none opacity-40">
          <div className="border-b border-dashed border-slate-200 w-full" />
          <div className="border-b border-dashed border-slate-200 w-full" />
          <div className="border-b border-dashed border-slate-200 w-full" />
          <div className="border-b border-dashed border-slate-200 w-full" />
        </div>

        {/* Chart Bars */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 h-48 items-end relative z-10 px-2">
          {WEEKLY_VISITS_DATA.map((item) => {
            const val = getValue(item);
            const heightPercent = Math.min(100, Math.round((val / maxVisits) * 100));
            const targetHeightPercent = Math.min(100, Math.round((item.target / maxVisits) * 100));
            const isToday = item.day === 'Sat'; // Oct 14 in demo

            return (
              <div
                key={item.day}
                onMouseEnter={() => setHoveredDay(item)}
                onMouseLeave={() => setHoveredDay(null)}
                className="flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                {/* Bar Value Tooltip on hover */}
                <div
                  className={`text-[10px] font-bold py-0.5 px-1.5 rounded transition-opacity mb-1 ${
                    hoveredDay?.day === item.day
                      ? 'opacity-100 bg-slate-800 text-white shadow'
                      : 'opacity-0 group-hover:opacity-100 bg-slate-700 text-white'
                  }`}
                >
                  {val} / {item.target}
                </div>

                {/* Bars Container */}
                <div className="w-full max-w-[36px] sm:max-w-[48px] bg-slate-100 rounded-t-lg relative flex items-end justify-center h-full overflow-hidden">
                  {/* Target reference outline */}
                  <div
                    className="absolute w-full border-t-2 border-dashed border-slate-400 z-10"
                    style={{ bottom: `${targetHeightPercent}%` }}
                    title={`Target: ${item.target}`}
                  />

                  {/* Completed Fill Bar */}
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isToday
                        ? 'bg-gradient-to-t from-teal-600 to-sky-500 shadow-md'
                        : val >= item.target
                        ? 'bg-gradient-to-t from-teal-500 to-teal-400 group-hover:brightness-105'
                        : val === 0
                        ? 'bg-slate-200'
                        : 'bg-gradient-to-t from-sky-500 to-sky-400 group-hover:brightness-105'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Day Label */}
                <div className="mt-2 text-center">
                  <span
                    className={`text-xs block font-semibold ${
                      isToday ? 'text-sky-700 font-bold underline underline-offset-2' : 'text-slate-600'
                    }`}
                  >
                    {item.day}
                  </span>
                  <span className="text-[10px] text-slate-400 block">{item.date.split(' ')[1]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend & Hover Details */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-teal-500 inline-block"></span>
            <span>Target Achieved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-sky-500 inline-block"></span>
            <span>In-Progress Visits</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 border-t-2 border-dashed border-slate-400 inline-block"></span>
            <span>Planned Goal</span>
          </div>
        </div>

        {hoveredDay ? (
          <div className="bg-sky-50 text-sky-800 px-2.5 py-1 rounded-md text-xs font-medium">
            {hoveredDay.day}: Maternal ({hoveredDay.maternal}), Vaccines ({hoveredDay.immunization}), NCD ({hoveredDay.ncd})
          </div>
        ) : (
          <span className="text-[11px] text-slate-400 italic">Hover any day for breakdown</span>
        )}
      </div>
    </div>
  );
};
