import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Home,
  Heart,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  FileBadge
} from 'lucide-react';
import { SAMPLE_HOUSEHOLDS } from '../../data/syntheticData';
import { Household } from '../../types';
import { Badge } from '../common/Badge';

export const HouseholdsView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [vulnerabilityFilter, setVulnerabilityFilter] = useState<'All' | 'High' | 'Moderate' | 'Low'>('All');
  const [expandedId, setExpandedId] = useState<string | null>('HH-02');
  const [households, setHouseholds] = useState<Household[]>(SAMPLE_HOUSEHOLDS);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter logic
  const filtered = households.filter((h) => {
    const matchesSearch =
      h.householdHead.toLowerCase().includes(search.toLowerCase()) ||
      h.villageWard.toLowerCase().includes(search.toLowerCase()) ||
      h.abhaId.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      vulnerabilityFilter === 'All' || h.vulnerabilityStatus === vulnerabilityFilter;

    return matchesSearch && matchesFilter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-50 text-sky-700 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Household Health Registry (परिवार पंजी)</h2>
              <p className="text-xs text-slate-500">
                248 Geo-mapped households in Rampur Gram Panchayat • Linked with ABHA ID cards
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Household</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Family Head name, ABHA ID, or Ward..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-400 px-2 font-medium">Vulnerability:</span>
          {(['All', 'High', 'Moderate', 'Low'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setVulnerabilityFilter(lvl)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                vulnerabilityFilter === lvl
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Household Cards List */}
      <div className="space-y-3.5">
        {filtered.map((household) => {
          const isExpanded = expandedId === household.id;
          return (
            <div
              key={household.id}
              className={`bg-white rounded-xl border transition-all ${
                isExpanded ? 'border-sky-300 shadow-md ring-1 ring-sky-100' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Summary Header */}
              <div
                onClick={() => toggleExpand(household.id)}
                className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${
                      household.vulnerabilityStatus === 'High'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : household.vulnerabilityStatus === 'Moderate'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-teal-50 text-teal-700 border border-teal-200'
                    }`}
                  >
                    <Home className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800 text-base">{household.householdHead}</h3>
                      <span className="text-xs text-slate-400 font-mono">({household.id})</span>
                      <Badge
                        variant={
                          household.vulnerabilityStatus === 'High'
                            ? 'rose'
                            : household.vulnerabilityStatus === 'Moderate'
                            ? 'amber'
                            : 'teal'
                        }
                        size="sm"
                      >
                        {household.vulnerabilityStatus} Vulnerability
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {household.villageWard}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {household.contactNumber}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        <FileBadge className="w-3 h-3 text-sky-600" />
                        {household.abhaId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-semibold text-slate-700 block">
                      {household.membersCount} Family Members
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Visited: {household.lastVisited}
                    </span>
                  </div>

                  <button className="p-1 text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Family Members Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Registered Family Members ({household.members.length})
                    </span>
                    <span className="text-xs text-slate-500">
                      Sanitation: <strong>{household.sanitationStatus}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {household.members.map((mem, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{mem.name}</span>
                          <span className="text-slate-500">
                            {mem.age} yrs • {mem.gender}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">Relation: {mem.relation}</p>

                        {mem.healthTags.length > 0 ? (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {mem.healthTags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  tag.toLowerCase().includes('pregnant') || tag.toLowerCase().includes('alert') || tag.toLowerCase().includes('sam')
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-teal-50 text-teal-800 border border-teal-200'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">No active risks noted</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-end gap-2 text-xs">
                    <button
                      onClick={() => alert(`Opening Doorstep Visit Log for ${household.householdHead}'s family`)}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium"
                    >
                      Schedule Doorstep Visit
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Household Modal Simulation */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Register New Household (नई परिवार पंजी)</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter household details to generate local offline record and auto-queue for ABHA synchronization.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Synthetic Household registered successfully into offline cache!");
                setShowAddModal(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Head of Household Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramprasad Yadav"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Village Ward</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none">
                    <option>Ward 1 - West Village</option>
                    <option>Ward 2 - East Tola</option>
                    <option>Ward 3 - School Para</option>
                    <option>Ward 4 - Harijan Basti</option>
                    <option>Ward 5 - Riverbank</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98XXX-XXXXX"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ABHA Health ID</label>
                  <input
                    type="text"
                    placeholder="ABHA-XXXX-XXXX-XXXX"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vulnerability Category</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none">
                    <option>Low</option>
                    <option>Moderate</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg font-medium shadow-sm hover:brightness-105"
                >
                  Save to Offline Cache
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
