import React, { useState } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  HeartPulse,
  Activity,
  Plus,
  AlertCircle
} from 'lucide-react';
import { SAMPLE_FIELD_VISITS } from '../../data/syntheticData';
import { FieldVisit } from '../../types';
import { Badge } from '../common/Badge';

export const FieldVisitsView: React.FC = () => {
  const [visits, setVisits] = useState<FieldVisit[]>(SAMPLE_FIELD_VISITS);
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Pending' | 'Urgent'>('All');
  const [search, setSearch] = useState('');
  const [selectedVisitForVitals, setSelectedVisitForVitals] = useState<FieldVisit | null>(null);

  const filteredVisits = visits.filter((v) => {
    const matchesSearch =
      v.beneficiaryName.toLowerCase().includes(search.toLowerCase()) ||
      v.villageWard.toLowerCase().includes(search.toLowerCase()) ||
      v.visitType.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'All') return true;
    if (filter === 'Completed') return v.status === 'Completed';
    if (filter === 'Pending') return v.status === 'Pending';
    if (filter === 'Urgent') return v.priority === 'Urgent';
    return true;
  });

  const toggleStatus = (id: string) => {
    setVisits((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            status: v.status === 'Completed' ? 'Pending' : 'Completed'
          };
        }
        return v;
      })
    );
  };

  const completedCount = visits.filter((v) => v.status === 'Completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Field Visits & Doorstep Roster (क्षेत्रीय भ्रमण)</h2>
            <p className="text-xs text-slate-500">
              Daily circuit for maternal ANC/PNC checkups, child immunization, and chronic disease vitals
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right sm:border-r border-slate-200 sm:pr-4">
            <span className="text-xs font-semibold text-slate-500 block">Progress Today</span>
            <span className="text-sm font-bold text-teal-700">
              {completedCount} of {visits.length} Done ({Math.round((completedCount / visits.length) * 100)}%)
            </span>
          </div>
          <button
            onClick={() => alert("Creating a new scheduled doorstep visit")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Visit</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by beneficiary, village ward, or visit type..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
          {(['All', 'Pending', 'Completed', 'Urgent'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filter === tab
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Visits List */}
      <div className="space-y-3">
        {filteredVisits.map((visit) => {
          const isDone = visit.status === 'Completed';

          return (
            <div
              key={visit.id}
              className={`bg-white rounded-xl border p-4 sm:p-5 transition-all ${
                isDone ? 'border-slate-200 bg-slate-50/40' : 'border-slate-200/90 shadow-sm hover:border-teal-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleStatus(visit.id)}
                    className={`mt-1 p-1 rounded-lg transition-colors ${
                      isDone
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-slate-400 hover:text-teal-600 bg-slate-100'
                    }`}
                    title="Click to toggle completion status"
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
                        {visit.beneficiaryName}
                      </h3>
                      <Badge
                        variant={
                          visit.visitType.includes('ANC')
                            ? 'teal'
                            : visit.visitType.includes('Immunization')
                            ? 'blue'
                            : 'purple'
                        }
                        size="sm"
                      >
                        {visit.visitType}
                      </Badge>
                      {visit.priority === 'Urgent' && (
                        <Badge variant="rose" size="sm" dot>
                          High Priority
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        {visit.scheduledTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {visit.villageWard}
                      </span>
                      <span>•</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {visit.householdId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => setSelectedVisitForVitals(visit)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold transition-colors"
                  >
                    <Activity className="w-3.5 h-3.5 text-teal-600" />
                    <span>{visit.vitalSigns ? 'View / Update Vitals' : 'Record Vitals'}</span>
                  </button>
                  <button
                    onClick={() => toggleStatus(visit.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isDone
                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                    }`}
                  >
                    {isDone ? 'Mark Pending' : 'Mark Completed'}
                  </button>
                </div>
              </div>

              {/* Vitals & Field Notes Row */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <p className="text-slate-600 flex-1 min-w-[240px]">
                  <strong>Clinical Notes:</strong> {visit.notes}
                </p>

                {visit.vitalSigns && (
                  <div className="flex items-center gap-2 bg-slate-100/80 px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-700">
                    <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                    {visit.vitalSigns.bp && <span>BP: <strong>{visit.vitalSigns.bp}</strong></span>}
                    {visit.vitalSigns.hemoglobin && <span>Hb: <strong>{visit.vitalSigns.hemoglobin}</strong></span>}
                    {visit.vitalSigns.weight && <span>Wt: <strong>{visit.vitalSigns.weight}</strong></span>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Vitals Dialog Modal */}
      {selectedVisitForVitals && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Field Vitals Log: {selectedVisitForVitals.beneficiaryName}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter bedside measurements taken with frontline medical kit.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Vitals saved to offline database!");
                setSelectedVisitForVitals(null);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Blood Pressure (mmHg)</label>
                <input
                  type="text"
                  defaultValue={selectedVisitForVitals.vitalSigns?.bp || "120/80"}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hemoglobin (g/dL)</label>
                  <input
                    type="text"
                    defaultValue={selectedVisitForVitals.vitalSigns?.hemoglobin || "11.0"}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Body Weight (kg)</label>
                  <input
                    type="text"
                    defaultValue={selectedVisitForVitals.vitalSigns?.weight || "55 kg"}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Observation & Counseling Notes</label>
                <textarea
                  rows={3}
                  defaultValue={selectedVisitForVitals.notes}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedVisitForVitals(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium shadow-sm"
                >
                  Save Vitals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
