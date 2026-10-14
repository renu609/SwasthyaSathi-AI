export type NavItemId =
  | 'dashboard'
  | 'assistant'
  | 'households'
  | 'field-visits'
  | 'reminders'
  | 'insights'
  | 'reports'
  | 'settings';

export interface StatItem {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  change?: string;
  isPositive?: boolean;
  iconName: 'households' | 'visits' | 'followups' | 'reminders';
  badgeText?: string;
  color: 'blue' | 'teal' | 'amber' | 'rose';
}

export interface HouseholdMember {
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  relation: string;
  healthTags: string[];
}

export interface Household {
  id: string;
  householdHead: string;
  villageWard: string;
  contactNumber: string;
  abhaId: string;
  membersCount: number;
  vulnerabilityStatus: 'High' | 'Moderate' | 'Low';
  sanitationStatus: 'Pucca Toilet' | 'Community Facility' | 'Open' | 'Tap Water';
  members: HouseholdMember[];
  lastVisited: string;
}

export interface FieldVisit {
  id: string;
  beneficiaryName: string;
  householdId: string;
  villageWard: string;
  visitType: 'Antenatal Care (ANC)' | 'Immunization' | 'Child Growth Monitoring' | 'NCD Screening' | 'Postnatal Care (PNC)';
  scheduledTime: string;
  status: 'Completed' | 'Pending' | 'In-Progress' | 'Rescheduled';
  vitalSigns?: {
    bp?: string;
    hemoglobin?: string;
    temperature?: string;
    weight?: string;
  };
  notes: string;
  priority: 'Urgent' | 'Routine' | 'Follow-up';
}

export interface ReminderItem {
  id: string;
  beneficiaryName: string;
  category: 'Vaccination' | 'Maternal Care' | 'Medication' | 'Vitals Check';
  title: string;
  dueDate: string;
  dueTime?: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
  actionNote: string;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  timestamp: string;
  timeAgo: string;
  type: 'visit' | 'alert' | 'reminder' | 'record';
  description: string;
  beneficiary: string;
  ward: string;
  status: 'success' | 'urgent' | 'info' | 'pending';
}

export interface HighPriorityAlert {
  id: string;
  beneficiary: string;
  ward: string;
  condition: string;
  recommendedAction: string;
  urgency: 'Immediate' | 'Today' | 'Within 48h';
  abhaId: string;
}

export interface DayVisitStats {
  day: string;
  date: string;
  completed: number;
  target: number;
  maternal: number;
  immunization: number;
  ncd: number;
}
