import React from 'react';
import {
  LineChart,
  ShieldCheck,
  Droplets,
  AlertTriangle,
  TrendingUp,
  Heart,
  Baby,
  Users
} from 'lucide-react';
import { COMMUNITY_METRICS } from '../../data/syntheticData';
import { Badge } from '../common/Badge';

export const InsightsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl">
            <LineChart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Community Health Insights & Surveillance (सामुदायिक विश्लेषण)</h2>
            <p className="text-xs text-slate-500">
              Epidemiological metrics and progress indicators for Rampur Gram Panchayat (ASHA Sector 4)
            </p>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Immunization Rate</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
              <Baby className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900">{COMMUNITY_METRICS.immunizationCoverage}%</h3>
            <span className="text-xs font-semibold text-teal-600 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              +3.2%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Children fully immunized at 12 mos</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
            <div
              className="bg-sky-500 h-2 rounded-full"
              style={{ width: `${COMMUNITY_METRICS.immunizationCoverage}%` }}
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Institutional Delivery</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900">{COMMUNITY_METRICS.institutionalDeliveryRate}%</h3>
            <span className="text-xs font-semibold text-teal-600">Goal: 95%</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Hospital/PHC deliveries this year</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
            <div
              className="bg-teal-500 h-2 rounded-full"
              style={{ width: `${COMMUNITY_METRICS.institutionalDeliveryRate}%` }}
            />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Maternal Anemia</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-rose-700">{COMMUNITY_METRICS.anemiaPrevalence}%</h3>
            <span className="text-xs font-semibold text-rose-600">High Risk</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Pregnant women with Hb &lt; 11 g/dL</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
            <div
              className="bg-rose-500 h-2 rounded-full"
              style={{ width: `${COMMUNITY_METRICS.anemiaPrevalence}%` }}
            />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Clean Water Access</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900">{COMMUNITY_METRICS.safeDrinkingWaterHouseholds}%</h3>
            <span className="text-xs font-semibold text-teal-600">Jal Jeevan</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Households with treated piped water</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
            <div
              className="bg-sky-500 h-2 rounded-full"
              style={{ width: `${COMMUNITY_METRICS.safeDrinkingWaterHouseholds}%` }}
            />
          </div>
        </div>
      </div>

      {/* Disease Surveillance & Environmental Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <h3 className="font-bold text-slate-800 text-sm mb-3">Disease Surveillance Watchlist</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-900">Seasonal Waterborne Diarrhea Spike in Ward 4 & 5</p>
                <p className="text-xs text-amber-800 mt-0.5">
                  8 cases detected this week near riverbank settlements. Halogen chlorine tablets distributed to 32 households.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-teal-900">Zero Malaria Cases Reported in Past 90 Days</p>
                <p className="text-xs text-teal-800 mt-0.5">
                  Aedes mosquito larva inspection completed in all 5 wards with Gram Panchayat sanitation committee.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <h3 className="font-bold text-slate-800 text-sm mb-3">Vulnerable Groups Distribution</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-600">Active Pregnancies Tracked (ANC)</span>
              <span className="font-bold text-slate-900">24 Mothers</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-600">Infants Under 1 Year (0-12m)</span>
              <span className="font-bold text-slate-900">42 Children</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-600">Severe Acute Malnutrition (SAM / MAM)</span>
              <span className="font-bold text-rose-600">3 Cases Under Treatment</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-600">Elderly with Hypertension / Diabetes</span>
              <span className="font-bold text-slate-900">89 Individuals</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">TB Patients on Direct Observed Therapy</span>
              <span className="font-bold text-teal-700">3 Active Patients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
