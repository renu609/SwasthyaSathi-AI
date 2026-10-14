import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  FileCheck,
  Send,
  Printer
} from 'lucide-react';
import { DEMO_METADATA } from '../../data/syntheticData';
import { Badge } from '../common/Badge';

export const ReportsView: React.FC = () => {
  const [reportMonth, setReportMonth] = useState('October 2026');
  const [submitted, setSubmitted] = useState(false);

  const handleExport = (format: 'PDF' | 'CSV') => {
    alert(`Generating synthetic ${format} monthly health report for Rampur PHC Sector 4...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-50 text-sky-700 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Monthly Health Reporting & Diary (मासिक रिपोर्ट)</h2>
            <p className="text-xs text-slate-500">
              Compliant with National Health Mission (NHM) HMIS Monthly Progress Format
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('PDF')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print PDF</span>
          </button>
          <button
            onClick={() => handleExport('CSV')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Report Form Preview */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
              NHM Form 4 - ASHA Monthly Performance
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">
              Village Health Register Summary: {reportMonth}
            </h3>
            <p className="text-xs text-slate-500">
              Worker: {DEMO_METADATA.healthWorkerName} • Sector: Rampur PHC Sector 4 • District: Varanasi
            </p>
          </div>

          <Badge variant={submitted ? 'emerald' : 'blue'} size="md" dot>
            {submitted ? 'Submitted to Medical Officer' : 'Draft - Ready for Verification'}
          </Badge>
        </div>

        {/* Reporting KPI Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Indicator Name</th>
                <th className="py-3 px-4">Target</th>
                <th className="py-3 px-4">Achieved</th>
                <th className="py-3 px-4">Performance %</th>
                <th className="py-3 px-4">Incentive Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-4 font-medium text-slate-800">
                  Antenatal Care (ANC) 4+ Visits Registered
                </td>
                <td className="py-3 px-4 text-slate-600">22</td>
                <td className="py-3 px-4 font-bold text-teal-700">24</td>
                <td className="py-3 px-4 text-teal-700 font-semibold">109%</td>
                <td className="py-3 px-4">
                  <Badge variant="emerald" size="sm">Eligible (₹300)</Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-4 font-medium text-slate-800">
                  Institutional Delivery Mobilization
                </td>
                <td className="py-3 px-4 text-slate-600">8</td>
                <td className="py-3 px-4 font-bold text-teal-700">8</td>
                <td className="py-3 px-4 text-teal-700 font-semibold">100%</td>
                <td className="py-3 px-4">
                  <Badge variant="emerald" size="sm">Eligible (₹600)</Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-4 font-medium text-slate-800">
                  Complete Child Immunization (at 1 year)
                </td>
                <td className="py-3 px-4 text-slate-600">15</td>
                <td className="py-3 px-4 font-bold text-teal-700">14</td>
                <td className="py-3 px-4 text-sky-700 font-semibold">93.3%</td>
                <td className="py-3 px-4">
                  <Badge variant="emerald" size="sm">Eligible (₹150)</Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-4 font-medium text-slate-800">
                  Home-Based Newborn Care (HBNC) 6-Visit Circuit
                </td>
                <td className="py-3 px-4 text-slate-600">6</td>
                <td className="py-3 px-4 font-bold text-teal-700">6</td>
                <td className="py-3 px-4 text-teal-700 font-semibold">100%</td>
                <td className="py-3 px-4">
                  <Badge variant="emerald" size="sm">Eligible (₹250)</Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-4 font-medium text-slate-800">
                  NCD Population Enumeration & CBAC Forms
                </td>
                <td className="py-3 px-4 text-slate-600">50</td>
                <td className="py-3 px-4 font-bold text-teal-700">46</td>
                <td className="py-3 px-4 text-sky-700 font-semibold">92.0%</td>
                <td className="py-3 px-4">
                  <Badge variant="emerald" size="sm">Eligible (₹460)</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Submission Action */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Estimated ASHA Performance Incentive: <strong className="text-teal-700 font-bold text-sm">₹1,760</strong>
          </p>

          <button
            onClick={() => setSubmitted(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
          >
            <Send className="w-4 h-4" />
            <span>{submitted ? 'Resubmit to PHC' : 'Submit Monthly Report to PHC'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
