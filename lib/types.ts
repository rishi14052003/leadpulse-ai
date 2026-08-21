export type Country = 'UAE' | 'Saudi Arabia' | 'India' | 'Poland';

export type CountryFlag = '🇦🇪' | '🇸🇦' | '🇮🇳' | '🇵🇱';

export type TriggerType = 
  | 'EPC Award'
  | 'Market Entry'
  | 'Exhibition'
  | 'Shutdown'
  | 'Tender'
  | 'Hiring';

export type LeadTier = 'Hot' | 'Warm' | 'Nurture' | 'Rejected';

export interface Signal {
  id: string;
  company: string;
  country: Country;
  flag: CountryFlag;
  triggerType: TriggerType;
  confidence: number; // 0 - 100
  source: string;
  sourceUrl: string;
  signalDate: string;
  snippet: string;
  sector: string;
  isNew?: boolean;
}

export interface ScoreFactor {
  name: string;
  score: number; // 0 - 100
  explanation: string;
}

export interface Lead {
  id: string;
  company: string;
  country: Country;
  flag: CountryFlag;
  serviceMatch: string;
  score: number; // Signal Strength
  tier: LeadTier;
  triggerSnippet: string;
  triggerType: TriggerType;
  decisionMakerRole: string;
  status: 'Qualified' | 'In Progress' | 'Contacted' | 'Disqualified';
  scoreFactors: ScoreFactor[];
  timeline: { date: string; title: string; detail: string }[];
  budgetEst?: string;
  industry: string;
}

export interface DecisionMaker {
  id: string;
  companyId: string;
  company: string;
  name: string;
  title: string;
  confidence: 'Verified' | 'Likely' | 'Uncertain';
  email: string;
  emailStatus: 'Verified' | 'Unverified' | 'Bounced';
  phone: string;
  linkedIn: string;
  lastAction: string;
}

export type Channel = 'Email' | 'WhatsApp' | 'LinkedIn';
export type Tone = 'Professional' | 'Direct' | 'Warm';

export interface OutreachQueueItem {
  id: string;
  leadCompany: string;
  contactName: string;
  contactTitle: string;
  channel: Channel;
  tone: Tone;
  subject?: string;
  message: string;
  tokens: string[];
  rationale: string;
  createdAt: string;
  status: 'Draft' | 'Queued' | 'Sent';
}

export type PipelineStage = 
  | 'New Signal'
  | 'Qualified Lead'
  | 'Outreach Sent'
  | 'Replied'
  | 'Meeting Booked'
  | 'Opportunity'
  | 'Proposal Sent'
  | 'Won'
  | 'Lost';

export interface PipelineCard {
  id: string;
  company: string;
  country: Country;
  flag: CountryFlag;
  serviceTag: string;
  score: number;
  stage: PipelineStage;
  ownerInitials: string;
  ownerName: string;
  daysInStage: number;
  value: number; // in USD
}

export type ReplyClassification = 
  | 'Meeting Request'
  | 'Positive Reply'
  | 'Not Now'
  | 'Wrong Person'
  | 'Opt-Out';

export interface ReplyItem {
  id: string;
  company: string;
  contactName: string;
  contactTitle: string;
  email: string;
  channel: Channel;
  preview: string;
  fullBody: string;
  classification: ReplyClassification;
  receivedDate: string;
  assignedOwner?: string;
  sequenceStopped?: boolean;
  notes?: string;
}

export interface SystemAlert {
  id: string;
  type: 'warning' | 'info' | 'error';
  title: string;
  description: string;
  time: string;
}

export interface AppNotification {
  id: string;
  type: 'signal' | 'lead' | 'meeting' | 'alert';
  title: string;
  description: string;
  time: string;
  read: boolean;
  link?: string;
}

export interface ActionTask {
  id: string;
  title: string;
  company: string;
  assignee: string;
  dueDate: string;
  completed: boolean;
}
