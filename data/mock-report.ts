import { ActionTask, SystemAlert } from '../lib/types';

export const SYSTEM_ALERTS: SystemAlert[] = [
  {
    id: 'alt-001',
    type: 'warning',
    title: '3 Contacts Failed Email Verification',
    description: 'MX record lookup timed out for @apexsafety.sa and @stratosbuild.in domains.',
    time: '25 mins ago',
  },
  {
    id: 'alt-002',
    type: 'error',
    title: '1 Sequence Stopped — Opt-Out Received',
    description: 'AquaShield Corp contact requested email removal. Sequence automatically terminated.',
    time: '1 hour ago',
  },
  {
    id: 'alt-003',
    type: 'info',
    title: 'Decision Maker Missing for 2 Leads',
    description: 'NordCoat Systems & BlueRidge Coatings require manual LinkedIn officer verification.',
    time: '3 hours ago',
  }
];

export const INITIAL_ACTION_TASKS: ActionTask[] = [
  {
    id: 'task-101',
    title: 'Send formal BOQ quotation for Riyadh Metro Workshop PFP',
    company: 'CrownCivil Contractors',
    assignee: 'Rania Ahmed',
    dueDate: 'Today, 5:00 PM',
    completed: false,
  },
  {
    id: 'task-102',
    title: 'Confirm Teams meeting link for ADNOC Offshore presentation',
    company: 'ZenithEnergy Co',
    assignee: 'Siddharth V.',
    dueDate: 'Today, 3:00 PM',
    completed: false,
  },
  {
    id: 'task-103',
    title: 'Update contact info for Tariq Al-Mansoor (Subcontracts Lead)',
    company: 'StellarEPC Ltd',
    assignee: 'Rania Ahmed',
    dueDate: 'Tomorrow, 11:00 AM',
    completed: false,
  },
  {
    id: 'task-104',
    title: 'Transmit UL-listed product data sheet package to Sultan Al-Damer',
    company: 'ApexSafety Works',
    assignee: 'Manish Kumar',
    dueDate: 'Aug 23, 2026',
    completed: true,
  },
  {
    id: 'task-105',
    title: 'Schedule Q4 follow-up reminder in CRM for smelting plant tender',
    company: 'AlphaSteel Industries',
    assignee: 'Siddharth V.',
    dueDate: 'Aug 24, 2026',
    completed: false,
  }
];
