import React, { useState } from 'react';
import {
  Settings,
  Languages,
  Database,
  Volume2,
  PhoneCall,
  Save,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { DEMO_METADATA } from '../../data/syntheticData';
import { Badge } from '../common/Badge';

export const SettingsView: React.FC = () => {
  const [language, setLanguage] = useState('Hindi & English (Bilingual)');
  const [offlineSyncInterval, setOfflineSyncInterval] = useState('15 mins');
  const [audioSpeed, setAudioSpeed] = useState('1.0x (Normal)');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Application Settings & Offline Cache (सेटिंग्स)</h2>
            <p className="text-xs text-slate-500">
              Configure language dialect, offline local storage, and rural frontline emergency contacts
            </p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {/* Worker Profile Summary */}
        <div className="p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-3">Frontline Worker Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Name & Role</span>
              <span className="font-semibold text-slate-800">{DEMO_METADATA.healthWorkerName} ({DEMO_METADATA.role})</span>
            </div>
            <div>
              <span className="text-slate-500 block">Assigned Health Facility</span>
              <span className="font-semibold text-slate-800">{DEMO_METADATA.center}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Coverage Area</span>
              <span className="font-semibold text-slate-800">{DEMO_METADATA.coverageArea}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Beneficiaries Under Care</span>
              <span className="font-semibold text-teal-700 font-mono">{DEMO_METADATA.totalBeneficiaries} Individuals</span>
            </div>
          </div>
        </div>

        {/* Offline Cache Settings */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="w-4 h-4 text-sky-600" />
            <h3 className="font-bold text-slate-800 text-sm">Offline Local Storage Status</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            SwasthyaSathi AI caches household profiles, visit logs, and triage rules locally so frontline workers can operate without cellular coverage.
          </p>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-center">
            <div>
              <span className="text-slate-500 block">Local IndexedDB</span>
              <span className="font-bold text-teal-700 text-sm">4.2 MB Cached</span>
            </div>
            <div className="border-y sm:border-y-0 sm:border-x border-slate-200 py-2 sm:py-0">
              <span className="text-slate-500 block">Pending Offline Sync</span>
              <span className="font-bold text-slate-800 text-sm">0 Pending</span>
            </div>
            <div>
              <span className="text-slate-500 block">Auto-Sync Frequency</span>
              <select
                value={offlineSyncInterval}
                onChange={(e) => setOfflineSyncInterval(e.target.value)}
                className="mt-1 bg-white border border-slate-300 rounded px-2 py-1 text-xs font-semibold text-slate-800"
              >
                <option>Every 5 mins</option>
                <option>15 mins</option>
                <option>Only on Wi-Fi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Language & Voice Settings */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Languages className="w-4 h-4 text-teal-600" />
            <h3 className="font-bold text-slate-800 text-sm">Language & Dialect Preferences</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Primary Display Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option>Hindi & English (Bilingual)</option>
                <option>हिन्दी (Hindi Only)</option>
                <option>English Only</option>
                <option>भोजपुरी (Bhojpuri Dialect Guide)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">AI Voice Prompt Speed</label>
              <select
                value={audioSpeed}
                onChange={(e) => setAudioSpeed(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option>0.8x (Slow & Clear for Village Audio)</option>
                <option>1.0x (Normal)</option>
                <option>1.2x (Fast)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Escalation Contacts */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <PhoneCall className="w-4 h-4 text-rose-600" />
            <h3 className="font-bold text-slate-800 text-sm">Emergency Escalation Directory</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-medium text-slate-800">Rampur CHC Medical Officer (Dr. R. Sharma)</span>
              <span className="font-mono text-sky-700 font-semibold">+91 94150-12345</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-medium text-slate-800">Emergency Ambulance Helpline</span>
              <span className="font-mono text-rose-700 font-bold text-sm">108</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-medium text-slate-800">Childline Helpline</span>
              <span className="font-mono text-teal-700 font-bold text-sm">1098</span>
            </div>
          </div>
        </div>

        {/* Save button row */}
        <div className="p-5 flex items-center justify-between">
          {saved ? (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Settings updated successfully!
            </span>
          ) : (
            <span className="text-xs text-slate-400">Settings are persisted to local storage</span>
          )}

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 text-white font-semibold text-xs sm:text-sm shadow-sm hover:brightness-105 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
