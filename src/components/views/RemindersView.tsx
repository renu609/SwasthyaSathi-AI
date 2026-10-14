import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Filter,
  Plus,
  Syringe,
  Heart,
  Pill,
  Activity
} from 'lucide-react';
import { SAMPLE_REMINDERS } from '../../data/syntheticData';
import { ReminderItem } from '../../types';
import { Badge } from '../common/Badge';

export const RemindersView: React.FC = () => {
  const [reminders, setReminders] = useState<ReminderItem[]>(SAMPLE_REMINDERS);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextStatus = r.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  };

  const filteredReminders = reminders.filter((r) => {
    if (categoryFilter === 'All') return true;
    return r.category === categoryFilter;
  });

  const getCategoryIcon = (cat: ReminderItem['category']) => {
    switch (cat) {
      case 'Vaccination':
        return <Syringe className="w-4 h-4 text-sky-600" />;
      case 'Maternal Care':
        return <Heart className="w-4 h-4 text-rose-500" />;
      case 'Medication':
        return <Pill className="w-4 h-4 text-teal-600" />;
      case 'Vitals Check':
      default:
        return <Activity className="w-4 h-4 text-amber-600" />;
    }
  };

  const pendingCount = reminders.filter((r) => r.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Care Reminders & Due Lists (स्मरण पत्र)</h2>
            <p className="text-xs text-slate-500">
              Timetable for child vaccinations, high-risk ANC checkups, and TB DOTS refills
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            {pendingCount} Pending Due
          </span>
          <button
            onClick={() => alert("Creating a new reminder...")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Reminder</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs overflow-x-auto">
        {(['All', 'Vaccination', 'Maternal Care', 'Medication', 'Vitals Check'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              categoryFilter === cat
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {filteredReminders.map((reminder) => {
          const isDone = reminder.status === 'Completed';

          return (
            <div
              key={reminder.id}
              className={`bg-white rounded-xl border p-4 sm:p-5 transition-all ${
                isDone ? 'border-slate-200 bg-slate-50/50' : 'border-slate-200/90 shadow-sm hover:border-amber-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`mt-0.5 p-1 rounded-lg transition-colors ${
                      isDone
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-slate-400 hover:text-amber-600 bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`font-bold text-base ${
                          isDone ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {reminder.title}
                      </h3>
                      <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-700">
                        {getCategoryIcon(reminder.category)}
                        <span>{reminder.category}</span>
                      </div>
                      <Badge
                        variant={reminder.priority === 'High' ? 'rose' : reminder.priority === 'Medium' ? 'amber' : 'slate'}
                        size="sm"
                      >
                        {reminder.priority} Priority
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="font-semibold text-slate-800">
                        👤 {reminder.beneficiaryName}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-700 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        Due: {reminder.dueDate} {reminder.dueTime ? `(${reminder.dueTime})` : ''}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <strong>Field Instructions:</strong> {reminder.actionNote}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    isDone
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  {isDone ? 'Undo' : 'Mark Done'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
