// =============================================================================
// Admin Panel — TypeScript Types
// =============================================================================
// TODO: When Supabase is connected, these types should match the database schema.
// TODO: Before production, /admin must be protected with Supabase Auth + RLS,
//       or temporarily hidden behind Cloudflare Access / password protection.

// --- Roles & Users ---

export type AdminRole = 'owner' | 'manager' | 'sales' | 'consultant' | 'viewer';

export interface AdminUser {
  id: string;
  name: string;
  role: AdminRole;
  email: string;
  avatar: string;
  status: 'active' | 'inactive';
  permissions: string[];
  notificationPrefs?: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
  };
}

// --- Contact Messages ---

export type MessageStatus = 'new' | 'assigned' | 'answered' | 'archived';
export type MessagePriority = 'high' | 'medium' | 'low';

export interface ContactMessage {
  id: string;
  senderName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  sourcePage: string;
  status: MessageStatus;
  assignedAdmin: string | null;
  priority: MessagePriority;
  createdAt: string;
}

// --- Leads ---

export type LeadSource = 'contact' | 'simulator' | 'appointment' | 'resources';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'converted' | 'lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: LeadSource;
  status: LeadStatus;
  assignedAdmin: string | null;
  lastInteraction: string;
  score: number; // 0-100 placeholder — TODO: implement scoring logic with Supabase
  createdAt: string;
}

// --- Meetings ---

export type MeetingStatus = 'pending' | 'confirmed' | 'done' | 'cancelled' | 'no-show';
export type MeetingType = 'consultant' | 'enterprise' | 'simulator' | 'contact';

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number; // minutes
  status: MeetingStatus;
  assignedMember: string;
  type: MeetingType;
  notes: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeeCompany: string;
}

// --- Calendar ---

export interface CalendarEvent {
  id: string;
  meetingId?: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'availability' | 'blocked';
  color: string;
  member: string;
}

// --- Calculator ---

export interface FormulaSettings {
  managementFeePercent: number;
  socialChargesPercent: number;
  defaultWorkedDays: number;
  version: string;
  lastUpdated: string;
}

export type FollowUpStatus = 'pending' | 'contacted' | 'converted' | 'not-interested';

export interface CalculatorSubmission {
  id: string;
  tjm: number;
  daysWorked: number;
  expenses: number;
  estimatedNetSalary: number;
  email: string | null;
  phone: string | null;
  formulaVersion: string;
  followUpStatus: FollowUpStatus;
  createdAt: string;
}

// --- Analytics ---
// TODO: Add privacy-friendly analytics integration (e.g., Plausible, Umami, or custom Supabase events)
// TODO: Implement GDPR consent handling before tracking any visitor data
// TODO: Store analytics events in Supabase for custom dashboards

export interface AnalyticsData {
  visitors: number;
  uniqueVisitors: number;
  topPages: { page: string; views: number; uniqueViews: number }[];
  countries: { country: string; visitors: number }[];
  cities: { city: string; visitors: number }[];
  devices: { device: string; percentage: number }[];
  browsers: { browser: string; percentage: number }[];
  sources: { source: string; visitors: number; percentage: number }[];
  funnelSteps: { step: string; count: number; rate: number }[];
  simulatorStarts: number;
  simulatorCompletions: number;
  contactConversions: number;
  appointmentClicks: number;
}

// --- Notifications ---

export type NotificationType = 'message' | 'meeting' | 'lead' | 'calculator' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

// --- Dashboard ---

export interface DashboardMetrics {
  newLeadsToday: number;
  newMessagesToday: number;
  simSubmissionsToday: number;
  upcomingMeetings: number;
}

export interface ActivityItem {
  id: string;
  type: 'message' | 'lead' | 'meeting' | 'calculator' | 'team';
  description: string;
  date: string;
  user: string;
}

// --- Navigation ---

export interface AdminNavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  group: 'main' | 'communication' | 'tools' | 'management';
}
