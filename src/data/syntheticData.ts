import {
  StatItem,
  Household,
  FieldVisit,
  ReminderItem,
  RecentActivityItem,
  HighPriorityAlert,
  DayVisitStats
} from '../types';

export const DEMO_METADATA = {
  isSynthetic: true,
  disclaimer: "Synthetic demonstration data for hackathon evaluation. No real patient data.",
  healthWorkerName: "Sunita Devi",
  role: "Lead ASHA Facilitator & Community Health Companion",
  center: "Rampur Primary Health Centre (PHC) • Sector 4",
  lastSync: "Today, 2:25 PM (Offline Cache Ready)",
  totalBeneficiaries: 1142,
  coverageArea: "Wards 1 to 5, Rampur Gram Panchayat"
};

export const SAMPLE_STAT_CARDS: StatItem[] = [
  {
    id: 'households',
    title: 'Registered Households',
    value: '248',
    subtitle: '1,142 total family members mapped',
    change: '+14 this month',
    isPositive: true,
    iconName: 'households',
    badgeText: '100% Geo-tagged',
    color: 'blue'
  },
  {
    id: 'visits',
    title: "Today's Field Visits",
    value: '5 / 8',
    subtitle: '62.5% of planned daily circuit',
    change: '3 visits remaining',
    isPositive: true,
    iconName: 'visits',
    badgeText: 'On Track',
    color: 'teal'
  },
  {
    id: 'followups',
    title: 'Pending Follow-ups',
    value: '14',
    subtitle: 'High-risk ANC & infant growth monitoring',
    change: '4 flagged high-risk',
    isPositive: false,
    iconName: 'followups',
    badgeText: 'Urgent Care',
    color: 'rose'
  },
  {
    id: 'reminders',
    title: 'Upcoming Reminders',
    value: '19',
    subtitle: '6 due today (Vaccines & Chronic meds)',
    change: '2 overdue from yesterday',
    isPositive: false,
    iconName: 'reminders',
    badgeText: 'Action Required',
    color: 'amber'
  }
];

export const WEEKLY_VISITS_DATA: DayVisitStats[] = [
  { day: 'Mon', date: 'Oct 09', completed: 8, target: 8, maternal: 3, immunization: 3, ncd: 2 },
  { day: 'Tue', date: 'Oct 10', completed: 7, target: 8, maternal: 2, immunization: 4, ncd: 1 },
  { day: 'Wed', date: 'Oct 11', completed: 9, target: 8, maternal: 4, immunization: 3, ncd: 2 },
  { day: 'Thu', date: 'Oct 12', completed: 6, target: 7, maternal: 2, immunization: 2, ncd: 2 },
  { day: 'Fri', date: 'Oct 13', completed: 8, target: 8, maternal: 3, immunization: 4, ncd: 1 },
  { day: 'Sat', date: 'Oct 14', completed: 5, target: 8, maternal: 2, immunization: 2, ncd: 1 },
  { day: 'Sun', date: 'Oct 15', completed: 0, target: 4, maternal: 0, immunization: 0, ncd: 0 }
];

export const HIGH_PRIORITY_ALERTS: HighPriorityAlert[] = [
  {
    id: 'alert-1',
    beneficiary: 'Meera Bai (23 yrs)',
    ward: 'Ward 2 - East Tola',
    condition: '3rd Trimester Gestational Hypertension (BP 150/98 mmHg)',
    recommendedAction: 'Immediate referral to Rampur Community Health Center (CHC) & obstetrician review.',
    urgency: 'Immediate',
    abhaId: 'ABHA-9821-4432-1092'
  },
  {
    id: 'alert-2',
    beneficiary: 'Aarav Kumar (9 mos)',
    ward: 'Ward 4 - Harijan Basti',
    condition: 'Severe Acute Malnutrition (MUAC: 11.2 cm, Red Zone)',
    recommendedAction: 'Coordinate Poshan tracker supplementary ration & Nutrition Rehabilitation Center (NRC) intake.',
    urgency: 'Today',
    abhaId: 'ABHA-3312-7811-9041'
  },
  {
    id: 'alert-3',
    beneficiary: 'Ram Charan (61 yrs)',
    ward: 'Ward 1 - Old Village',
    condition: 'Type 2 Diabetes with foot ulceration & missed Metformin doses',
    recommendedAction: 'Deliver 1-month refill, dressing kit, and schedule Medical Officer telemedicine visit.',
    urgency: 'Within 48h',
    abhaId: 'ABHA-6612-4401-2290'
  }
];

export const RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: 'act-1',
    title: 'Completed 3rd Trimester ANC Checkup',
    timestamp: 'Today at 01:15 PM',
    timeAgo: '1 hour ago',
    type: 'visit',
    description: 'Recorded BP (118/76), Fundal height normal, distributed Iron Folic Acid (IFA) 60-day supply.',
    beneficiary: 'Pooja Verma',
    ward: 'Ward 3',
    status: 'success'
  },
  {
    id: 'act-2',
    title: 'Severe High-Risk Alert Escalated to MO',
    timestamp: 'Today at 11:30 AM',
    timeAgo: '3 hours ago',
    type: 'alert',
    description: 'AI Triage flagged Meera Bai for acute pre-eclampsia indicators. SMS dispatch sent to Dr. R. Sharma at CHC.',
    beneficiary: 'Meera Bai',
    ward: 'Ward 2',
    status: 'urgent'
  },
  {
    id: 'act-3',
    title: 'Child Immunization Administered',
    timestamp: 'Today at 10:10 AM',
    timeAgo: '4 hours ago',
    type: 'record',
    description: 'Pentavalent-3 and Rotavirus-3 vaccine doses confirmed with mother. Updated U-WIN card.',
    beneficiary: 'Golu (Son of Rekha)',
    ward: 'Ward 1',
    status: 'success'
  },
  {
    id: 'act-4',
    title: 'TB DOTS Medication Adherence Verified',
    timestamp: 'Today at 09:00 AM',
    timeAgo: '5 hours ago',
    type: 'reminder',
    description: 'Day 42 blister pack verified. Sputum collection scheduled for next Tuesday.',
    beneficiary: 'Kanhaiya Lal',
    ward: 'Ward 5',
    status: 'info'
  },
  {
    id: 'act-5',
    title: 'New Household Registered',
    timestamp: 'Yesterday at 04:30 PM',
    timeAgo: '1 day ago',
    type: 'record',
    description: 'Registered 5 family members under Mukhiya Suresh Yadav with linked ABHA health accounts.',
    beneficiary: 'Suresh Yadav Family',
    ward: 'Ward 4',
    status: 'info'
  }
];

export const SAMPLE_HOUSEHOLDS: Household[] = [
  {
    id: 'HH-01',
    householdHead: 'Rameshwar Singh',
    villageWard: 'Ward 1 - West Village',
    contactNumber: '+91 98765-43210',
    abhaId: 'ABHA-1234-5678-9012',
    membersCount: 6,
    vulnerabilityStatus: 'Moderate',
    sanitationStatus: 'Pucca Toilet',
    lastVisited: '12 Oct 2026',
    members: [
      { name: 'Rameshwar Singh', age: 58, gender: 'M', relation: 'Head', healthTags: ['Hypertension'] },
      { name: 'Kanti Devi', age: 54, gender: 'F', relation: 'Spouse', healthTags: ['Joint Pain'] },
      { name: 'Manoj Singh', age: 30, gender: 'M', relation: 'Son', healthTags: [] },
      { name: 'Sunita Singh', age: 26, gender: 'F', relation: 'Daughter-in-law', healthTags: ['Lactating Mother'] },
      { name: 'Ayush', age: 1, gender: 'M', relation: 'Grandson', healthTags: ['Vaccines Up to Date'] },
      { name: 'Priya', age: 6, gender: 'F', relation: 'Granddaughter', healthTags: ['School Health Check Done'] }
    ]
  },
  {
    id: 'HH-02',
    householdHead: 'Meera Bai',
    villageWard: 'Ward 2 - East Tola',
    contactNumber: '+91 98231-11234',
    abhaId: 'ABHA-9821-4432-1092',
    membersCount: 3,
    vulnerabilityStatus: 'High',
    sanitationStatus: 'Community Facility',
    lastVisited: 'Today, 11:30 AM',
    members: [
      { name: 'Meera Bai', age: 23, gender: 'F', relation: 'Head', healthTags: ['Pregnant 32 Weeks', 'High BP Alert'] },
      { name: 'Deepak Kumar', age: 25, gender: 'M', relation: 'Husband', healthTags: ['Migrant Worker'] },
      { name: 'Shanti Devi', age: 62, gender: 'F', relation: 'Mother-in-law', healthTags: ['Asthma'] }
    ]
  },
  {
    id: 'HH-03',
    householdHead: 'Devendra Patel',
    villageWard: 'Ward 3 - School Para',
    contactNumber: '+91 94112-99081',
    abhaId: 'ABHA-7761-0021-4411',
    membersCount: 4,
    vulnerabilityStatus: 'Low',
    sanitationStatus: 'Tap Water',
    lastVisited: '08 Oct 2026',
    members: [
      { name: 'Devendra Patel', age: 42, gender: 'M', relation: 'Head', healthTags: [] },
      { name: 'Manju Patel', age: 38, gender: 'F', relation: 'Spouse', healthTags: ['Anemia Mild'] },
      { name: 'Vikas Patel', age: 16, gender: 'M', relation: 'Son', healthTags: [] },
      { name: 'Kavita Patel', age: 14, gender: 'F', relation: 'Daughter', healthTags: ['Adolescent IFA Program'] }
    ]
  },
  {
    id: 'HH-04',
    householdHead: 'Bablu Manjhi',
    villageWard: 'Ward 4 - Harijan Basti',
    contactNumber: '+91 93341-88712',
    abhaId: 'ABHA-3312-7811-9041',
    membersCount: 5,
    vulnerabilityStatus: 'High',
    sanitationStatus: 'Open',
    lastVisited: 'Today, 10:00 AM',
    members: [
      { name: 'Bablu Manjhi', age: 34, gender: 'M', relation: 'Head', healthTags: ['Daily Wage'] },
      { name: 'Rekha Devi', age: 29, gender: 'F', relation: 'Spouse', healthTags: ['Severe Anemia'] },
      { name: 'Aarav Kumar', age: 1, gender: 'M', relation: 'Son', healthTags: ['SAM Red Zone', 'Growth Lag'] },
      { name: 'Chanda', age: 4, gender: 'F', relation: 'Daughter', healthTags: ['Vitamin A Due'] },
      { name: 'Basanti Devi', age: 68, gender: 'F', relation: 'Mother', healthTags: ['Cataract Screening Needed'] }
    ]
  },
  {
    id: 'HH-05',
    householdHead: 'Kanhaiya Lal',
    villageWard: 'Ward 5 - Riverbank',
    contactNumber: '+91 97120-44911',
    abhaId: 'ABHA-6612-4401-2290',
    membersCount: 4,
    vulnerabilityStatus: 'Moderate',
    sanitationStatus: 'Community Facility',
    lastVisited: 'Today, 09:00 AM',
    members: [
      { name: 'Kanhaiya Lal', age: 48, gender: 'M', relation: 'Head', healthTags: ['TB DOTS Day 42', 'Recovering'] },
      { name: 'Parvati Devi', age: 45, gender: 'F', relation: 'Spouse', healthTags: [] },
      { name: 'Rohit Lal', age: 18, gender: 'M', relation: 'Son', healthTags: [] },
      { name: 'Anjali Lal', age: 12, gender: 'F', relation: 'Daughter', healthTags: [] }
    ]
  }
];

export const SAMPLE_FIELD_VISITS: FieldVisit[] = [
  {
    id: 'FV-101',
    beneficiaryName: 'Kanhaiya Lal',
    householdId: 'HH-05',
    villageWard: 'Ward 5 - Riverbank',
    visitType: 'NCD Screening',
    scheduledTime: '09:00 AM',
    status: 'Completed',
    vitalSigns: { bp: '124/82', temperature: '98.4 F', weight: '54 kg' },
    notes: 'TB DOTS adherence confirmed. Patient reports improved appetite and reduced coughing episodes.',
    priority: 'Follow-up'
  },
  {
    id: 'FV-102',
    beneficiaryName: 'Aarav Kumar (Bablu Manjhi Family)',
    householdId: 'HH-04',
    villageWard: 'Ward 4 - Harijan Basti',
    visitType: 'Child Growth Monitoring',
    scheduledTime: '10:00 AM',
    status: 'Completed',
    vitalSigns: { weight: '6.8 kg', temperature: '98.6 F' },
    notes: 'MUAC measurement remains in Red Zone (11.2 cm). Provided energy dense nutritional packet. Need NRC visit.',
    priority: 'Urgent'
  },
  {
    id: 'FV-103',
    beneficiaryName: 'Meera Bai',
    householdId: 'HH-02',
    villageWard: 'Ward 2 - East Tola',
    visitType: 'Antenatal Care (ANC)',
    scheduledTime: '11:15 AM',
    status: 'Completed',
    vitalSigns: { bp: '150/98', hemoglobin: '8.4 g/dL', weight: '52 kg' },
    notes: 'High blood pressure recorded. Mild pedal edema observed. Urgently escalated to PHC Medical Officer.',
    priority: 'Urgent'
  },
  {
    id: 'FV-104',
    beneficiaryName: 'Pooja Verma',
    householdId: 'HH-06',
    villageWard: 'Ward 3 - School Para',
    visitType: 'Antenatal Care (ANC)',
    scheduledTime: '01:00 PM',
    status: 'Completed',
    vitalSigns: { bp: '118/76', hemoglobin: '11.2 g/dL', weight: '58 kg' },
    notes: '32-week ANC check. Fetal heart sound audible (142 bpm). Distributed Calcium and IFA tablets.',
    priority: 'Routine'
  },
  {
    id: 'FV-105',
    beneficiaryName: 'Golu (Son of Rekha)',
    householdId: 'HH-04',
    villageWard: 'Ward 1 - West Village',
    visitType: 'Immunization',
    scheduledTime: '02:00 PM',
    status: 'Completed',
    vitalSigns: { weight: '7.9 kg', temperature: '98.2 F' },
    notes: 'Administered Pentavalent-3, OPV-3, and Rotavirus-3. Mother advised on post-vaccine fever protocol.',
    priority: 'Routine'
  },
  {
    id: 'FV-106',
    beneficiaryName: 'Suman Devi (7 months pregnant)',
    householdId: 'HH-07',
    villageWard: 'Ward 2 - Near Panchayat Bhavan',
    visitType: 'Antenatal Care (ANC)',
    scheduledTime: '03:30 PM',
    status: 'Pending',
    notes: 'Routine 2nd trimester follow-up, check Tetanus Toxoid 2 status and ultrasound report.',
    priority: 'Routine'
  },
  {
    id: 'FV-107',
    beneficiaryName: 'Dhanpat Sah (68 yrs)',
    householdId: 'HH-08',
    villageWard: 'Ward 3 - Old Well',
    visitType: 'NCD Screening',
    scheduledTime: '04:15 PM',
    status: 'Pending',
    notes: 'Follow-up blood glucose check and blood pressure review after changing medication.',
    priority: 'Follow-up'
  },
  {
    id: 'FV-108',
    beneficiaryName: 'Radha Kumari (Infant 45 days)',
    householdId: 'HH-09',
    villageWard: 'Ward 5 - Riverbank',
    visitType: 'Postnatal Care (PNC)',
    scheduledTime: '05:00 PM',
    status: 'Pending',
    notes: 'PNC 42-day home visit. Assess umbilical cord healing, maternal mental well-being, exclusive breastfeeding.',
    priority: 'Routine'
  }
];

export const SAMPLE_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-1',
    beneficiaryName: 'Aarav Kumar (9 mos)',
    category: 'Vaccination',
    title: 'Measles-Rubella (MR) 1st Dose Due',
    dueDate: 'Today, 14 Oct',
    dueTime: 'Before 05:00 PM',
    status: 'Pending',
    priority: 'High',
    actionNote: 'Bring child to Anganwadi center session; check with mother Rekha Devi.'
  },
  {
    id: 'rem-2',
    beneficiaryName: 'Meera Bai',
    category: 'Maternal Care',
    title: 'CHC Referral Transport Confirmation',
    dueDate: 'Today, 14 Oct',
    dueTime: '04:00 PM',
    status: 'Pending',
    priority: 'High',
    actionNote: 'Confirm 108 ambulance booking with ANM sister for hospital admission.'
  },
  {
    id: 'rem-3',
    beneficiaryName: 'Kanhaiya Lal',
    category: 'Medication',
    title: 'TB Sputum Re-Examination Kit Submission',
    dueDate: 'Tomorrow, 15 Oct',
    status: 'Pending',
    priority: 'Medium',
    actionNote: 'Hand over sample container for PHC lab technician pickup.'
  },
  {
    id: 'rem-4',
    beneficiaryName: 'Ram Charan (61 yrs)',
    category: 'Vitals Check',
    title: 'Random Blood Sugar (RBS) Fasting Test',
    dueDate: '16 Oct 2026',
    status: 'Pending',
    priority: 'Medium',
    actionNote: 'Visit before 8:00 AM with portable glucometer and lancets.'
  },
  {
    id: 'rem-5',
    beneficiaryName: 'Priya Patel (6 yrs)',
    category: 'Vaccination',
    title: 'DPT Booster 2 Due',
    dueDate: '18 Oct 2026',
    status: 'Pending',
    priority: 'Low',
    actionNote: 'Inform primary school teacher and parents during Saturday community camp.'
  }
];

export const COMMUNITY_METRICS = {
  immunizationCoverage: 89.4,
  institutionalDeliveryRate: 94.2,
  malnutritionRate: 6.8,
  anemiaPrevalence: 41.2,
  activeTbCases: 3,
  safeDrinkingWaterHouseholds: 82.5,
  reportedWaterborneDiarrheaCasesThisMonth: 8,
  poshanNutritionBeneficiaries: 184
};
